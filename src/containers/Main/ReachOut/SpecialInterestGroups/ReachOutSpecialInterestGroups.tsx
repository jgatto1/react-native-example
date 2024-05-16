import { ActivityIndicator, KeyboardAvoidingView, ScrollView, View } from 'react-native';
import React, { useState } from 'react';
import { useReachOutSpecialInterestGroupsStyles } from './ReachOutSpecialInterestGroups.styles';
import { Button, Card, Divider, Text, TextInput } from 'components';
import { useReachOutSpecialInterestGroups } from 'containers/Main/ReachOut/SpecialInterestGroups/ReachOutSpecialInterestGroup.context';
import { Space } from 'components/Space/Space';
import { Res, validateResponse } from 'model/backend';
import { BackendClient } from 'service/backend-client.service';
import { useTheme } from 'providers/theme/ThemeProvider';
import { showAlertIfNetworkError } from 'providers/error.alert';

export const ReachOutSpecialInterestGroups: React.VFC = () => {
  const styles = useReachOutSpecialInterestGroupsStyles();
  const context = useReachOutSpecialInterestGroups();
  const theme = useTheme();
  const [suggestGroup, setSuggestGroup] = useState<string>();
  const [doingSuggestion, setDoingSuggestion] = useState(false);

  const doSuggestion = () => {
    setDoingSuggestion(true);
    const data = { type: 'interest_group', text: suggestGroup };
    BackendClient.post<Res>('/suggestion/create', data)
      .then(validateResponse)
      .catch((err) => {
        showAlertIfNetworkError(err);
        console.warn('Cannot create suggestion', err);
      })
      .finally(() => {
        setDoingSuggestion(false);
        setSuggestGroup(undefined);
      });
  };

  return (
    <ScrollView style={styles.root}>
      <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={40}>
        <>
          {context.loading && <ActivityIndicator color='grey' />}
          {!context.loading &&
            context.groups.map((group, index) => (
              <View key={index}>
                <View style={styles.groupContainer}>
                  <View style={styles.groupNameContainer}>
                    <Text size={14}>{group.name}</Text>
                    <Space margin={2} />
                    <Text size={10}>{group.description}</Text>
                  </View>
                  <Button
                    loading={context.joining}
                    disabled={context.joining}
                    style={styles.groupButton}
                    onPress={() => context.setActualGroup(group)}>
                    {group.joined ? 'ENTER' : 'JOIN'}
                  </Button>
                </View>
                <Divider style={styles.divider} />
              </View>
            ))}
          <Space margin={10} />
          <Card>
            <Space />
            <Text italic size={13}>
              Is there a Special Interest Group you'd like to see?{'\n'}Suggest it here:
            </Text>
            <Space margin={8} />
            <TextInput
              multiline={true}
              value={suggestGroup}
              placeholderTextColor={theme.main.palette.other.login.placeholder}
              placeholder='Describe your suggested group...'
              onChangeText={(suggest) => setSuggestGroup(suggest)}
              style={styles.textInput}
            />
            <Space margin={10} />
            <View style={styles.suggestButton}>
              <Button style={styles.groupButton} loading={doingSuggestion} onPress={() => doSuggestion()}>
                SEND
              </Button>
            </View>
          </Card>
          <Space margin={10} />
        </>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};
