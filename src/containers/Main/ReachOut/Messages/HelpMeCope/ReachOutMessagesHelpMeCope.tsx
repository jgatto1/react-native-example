import { Button, Card, Divider, Text, TextInput } from 'components';
import { Space } from 'components/Space/Space';
import { useReachOutMessageContext } from 'containers/Main/ReachOut/Messages/ReachOutMessages.context';
import { F, Res, validateResponse } from 'model/backend';
import { ChannelMessageRes } from 'model/backend/channel';
import { HelpCope, HelpCopeRes, HelpCopesRes } from 'model/backend/help-cope';
import { User } from 'model/backend/login';
import moment from 'moment';
import { showAlertIfNetworkError } from 'providers/error.alert';
import { useSession } from 'providers/session/SessionProvider';
import { useTheme } from 'providers/theme/ThemeProvider';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Pressable, ScrollView, View } from 'react-native';
import { BackendClient } from 'service/backend-client.service';
import { useReachOutMessagesHelpMeCopeStyles } from './ReachOutMessagesHelpMeCope.styles';
import { SVG } from './assets';

export const ReachOutMessagesHelpMeCope: React.VFC = () => {
  const styles = useReachOutMessagesHelpMeCopeStyles();
  const session = useSession();
  const messages = useReachOutMessageContext();
  const theme = useTheme();

  const [helpCopes, setHelpCopes] = useState<HelpCope[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [text, setText] = useState<string>();
  const [creating, setCreating] = useState(false);

  const [showCopeForm, setShowCopeForm] = useState<number>();
  const [copeRes, setCopeRes] = useState<string>();
  const [sendingRes, setSendingRes] = useState<boolean>(false);

  React.useEffect(() => {
    const user_uuid = session.userUUID;
    BackendClient.get<HelpCopesRes>('/help_copes', { params: { user_uuid } })
      .then(validateResponse)
      .then((res) => setHelpCopes(res.help_copes))
      .catch((err) => {
        console.warn('Cannot fetch help copes', err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const CardSVG = showForm ? SVG.Less : SVG.More;

  const deleteHelpCope = (id: string | number) => {
    BackendClient.delete<Res>(`/help_cope/${id}/delete`)
      .then(validateResponse)
      .then(() => {
        setHelpCopes([...helpCopes.filter((hc) => hc.id !== id)]);
      })
      .catch((err) => {
        console.warn(`Cannot delete help cope with id ${id}`, err);
      });
  };

  const createHelpCope = () => {
    setCreating(true);
    BackendClient.post<HelpCopeRes>('/help_cope/create', { text })
      .then(validateResponse)
      .then((res) => {
        setHelpCopes([...helpCopes, res.help_cope]);
        setText(undefined);
        setShowForm(false);
        // show message sent modal
        Alert.alert('Message', 'The message was sent properly');
      })
      .catch((err) => {
        showAlertIfNetworkError(err);
        console.warn('Cannot create help cope', err);
      })
      .finally(() => setCreating(false));
  };

  const responseHelpCope = (cope: HelpCope) => {
    console.debug(cope);
    setSendingRes(true);

    BackendClient.get<Res<F<'user', User>>>(`/user/${cope.user_uuid}`)
      .then(validateResponse)
      .then((res) => {
        return messages.openChatWithUser(res.user);
      })
      .then((chatUUID) => {
        if (!chatUUID) {
          throw new Error('No chat uuid to respond help cope ' + cope.id);
        }
        const data = { message: 'Responding to Help Me Cope message:\n<b>' + cope.text + '</b>\n\n' + copeRes };
        return BackendClient.post<ChannelMessageRes>(`/channel/${chatUUID}/message/create`, data).then(
          validateResponse
        );
      })
      .catch((err) => {
        console.warn('Cannot fetch user to respond cope message', err);
      })
      .finally(() => setSendingRes(false));
  };

  function readCope(index: number, helpCope: HelpCope) {
    if (!helpCope.is_read_by_me) {
      messages.markHelpCopeAsRead(helpCope.id);
    }
    setShowCopeForm(showCopeForm === index ? undefined : index);
  }

  return (
    <ScrollView style={styles.root}>
      <Space margin={10} />
      <Text bold>Request help from my group</Text>
      <Space margin={10} />
      <Card>
        <View style={styles.cardHeader}>
          <Text size={15} style={styles.cardHeaderText}>
            Help me Cope from <Text bold>{session.data?.user.settings.display_name}</Text>
            {'\n'}on {moment(new Date()).format('MM/DD/YYYY')}
          </Text>
          <Pressable onPress={() => setShowForm(!showForm)}>
            <CardSVG width={30} height={30} fill={styles.moreIcon.color} />
          </Pressable>
        </View>
        {showForm && (
          <View style={styles.cardForm}>
            <Divider margin={10} style={{ borderWidth: 0.6 }} />
            <TextInput
              placeholderTextColor={theme.main.palette.other.login.placeholder}
              onChangeText={(t) => setText(t)}
              placeholder="Hi everyone. I'd like help with.."
            />
            <Space margin={10} />
            <View style={styles.sendButtonContainer}>
              <Button loading={creating} disabled={!text || text.length < 3} onPress={() => createHelpCope()}>
                SEND
              </Button>
            </View>
            <Space margin={10} />
            <Text size={13} style={{ lineHeight: 20 }}>
              Your group members will receive notification that a high priority help Me Cope message is waiting for
              them. Please note that your group members may or may not reply and if they do, the timeframe is up to
              them, Be sure to use other parts of the app for help as well.
            </Text>
          </View>
        )}
      </Card>
      <Space />
      {helpCopes.map((hc) => (
        <View key={hc.id}>
          <Card style={styles.helpCopeCard}>
            <Text style={styles.helpCopeText}>
              {moment(hc.created).format('MM/DD/YYYY')}
              {'\n'}
              <Text bold>{hc.text}</Text>
            </Text>
            <Pressable onPress={() => deleteHelpCope(hc.id)}>
              <SVG.Close width={30} height={30} fill={styles.helpCopeDelete.color} />
            </Pressable>
          </Card>
          <Space />
        </View>
      ))}
      <Divider margin={10} style={{ borderWidth: 0.6 }} />
      <Text bold>Answer help requests from my group</Text>
      {messages.helpCopes.loading && <ActivityIndicator color='grey' />}
      {!messages.helpCopes.loading &&
        messages.helpCopes.helpCopes
          .filter((helpCope) => helpCope.user_uuid !== session.userUUID)
          .map((cope, index) => (
            <View key={index}>
              <Space />
              <Card style={styles.helpMeCopeCard}>
                {!cope.is_read_by_me && (
                  <SVG.Important
                    width={25}
                    height={25}
                    fill={styles.helpMeCopeUnreadSVG.color}
                    style={styles.helpMeCopeUnreadSVG}
                  />
                )}
                <View style={styles.cardHeader}>
                  <Text size={15} style={styles.cardHeaderText}>
                    Help me Cope from <Text bold>{cope.user?.settings.display_name}</Text>
                    {'\n'}on {moment(cope.created).format('MM/DD/YYYY')}
                  </Text>
                  <Pressable onPress={() => readCope(index, cope)}>
                    {showCopeForm === index && <SVG.Less width={30} height={30} fill={styles.moreIcon.color} />}
                    {showCopeForm !== index && <SVG.More width={30} height={30} fill={styles.moreIcon.color} />}
                  </Pressable>
                </View>
                {showCopeForm === index && (
                  <View style={styles.cardForm}>
                    <Divider margin={10} />
                    <Space />
                    <Text size={15} bold>
                      {cope.text}
                    </Text>
                    <Space />
                    <TextInput
                      multiline={true}
                      style={{ minHeight: 80 }}
                      placeholderTextColor={theme.main.palette.other.login.placeholder}
                      value={copeRes}
                      onChangeText={(t) => setCopeRes(t)}
                      placeholder='Say something...'
                    />
                    <Space />
                    <View style={styles.sendButtonContainer}>
                      <Button
                        loading={sendingRes}
                        disabled={!copeRes || copeRes.length < 3}
                        onPress={() => responseHelpCope(cope)}>
                        MESSAGE
                      </Button>
                    </View>
                  </View>
                )}
              </Card>
            </View>
          ))}
    </ScrollView>
  );
};
