import { ActivityIndicator, Image, Pressable, ScrollView, Switch, View } from 'react-native';
import React, { useCallback } from 'react';
import { useReachOutMessagesStyles } from './ReachOutMessages.styles';
import { Button, Card, Divider, Text } from 'components';
import { Space } from 'components/Space/Space';
import { useReachOutMessageContext } from 'containers/Main/ReachOut/Messages/ReachOutMessages.context';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { ReachOutMessagesRoutes } from 'containers/Main/ReachOut/Messages/ReachOutMessages.routes';
import { User } from 'model/backend/login';

function sortUsers(a: User, b: User) {
  return a.settings?.display_name?.localeCompare(b.settings?.display_name);
}

declare type RouteParams = { openChatWithUser?: User; openChatWithLeader?: boolean };

export const ReachOutMessages: React.VFC = () => {
  const styles = useReachOutMessagesStyles();
  const reachOutMessages = useReachOutMessageContext();
  const navigation = useNavigation();

  const memberUsers = reachOutMessages.cohortUsers.users.filter((user) => user.roles.includes('member'));
  const leaderUsers = reachOutMessages.cohortUsers.users.filter((user) => user.roles.includes('leader'));

  const router = useRoute();

  useFocusEffect(
    useCallback(() => {
      const params = router.params as RouteParams;
      // @ts-ignore
      if (!!params && typeof params === 'object' && params.openChatWithUser && !params.preventAgain) {
        const userChat = params.openChatWithUser!;
        setTimeout(() => reachOutMessages.openChatWithUser(userChat, { preventAgain: true }), 100);
      }
    }, [reachOutMessages, router])
  );

  return (
    <ScrollView>
      <View style={styles.root}>
        <Space margin={10} />
        <Text italic size={20} style={styles.title}>
          Message your Seeking Safety Group
        </Text>
        {leaderUsers.length > 0 && (
          <>
            <Space margin={8} />
            <Text size={15} bold>
              <Text italic>Seeking Safety</Text> Leader
            </Text>
            <Space />
            {leaderUsers.map((user) => (
              <UserCard user={user} key={user.uuid} />
            ))}
          </>
        )}
        <Space margin={5} />
        <Text size={15} bold>
          <Text italic>Seeking Safety</Text> Group
        </Text>
        <Space />
        <Card style={styles.helpMeCopeCard}>
          {reachOutMessages.unreadHelpCopes > 0 && (
            <View style={styles.helpMeCopeUnreadBadge}>
              <Text bold size={13} style={styles.helpMeCopeUnreadText}>
                {reachOutMessages.unreadHelpCopes}
              </Text>
            </View>
          )}
          <Pressable onPress={() => navigation.navigate(ReachOutMessagesRoutes.HELP_ME_COPE)}>
            <View style={styles.cardContainer}>
              <View style={styles.cardIcon}>
                <Text bold size={44} style={styles.cardIconText}>
                  !
                </Text>
              </View>
              <View style={styles.cardTextContainer}>
                <Text size={15} bold>
                  Help Me Cope
                </Text>
                <Text size={15}>Request help from your group and help others</Text>
              </View>
            </View>
          </Pressable>
        </Card>
        <Space />
        <View style={styles.switchContainer}>
          <Switch
            accessibilityRole='button'
            trackColor={{ true: styles.availableSwitch.color }}
            value={reachOutMessages.available}
            onValueChange={() => reachOutMessages.switchAvailable()}
          />
          <Space margin={5} horizontal />
          <Text>I'm available to chat / message today</Text>
        </View>
        <Space />
        <View style={styles.buttonContainer}>
          <Button onPress={() => reachOutMessages.openCohortChat()}>
            <Text size={15} style={styles.button}>
              MESSAGE ENTIRE GROUP
            </Text>
          </Button>
        </View>
        <Divider margin={10} style={{ borderWidth: 0.6 }} />
        <View>
          {reachOutMessages.cohortUsers.loading && (
            <View style={styles.personListLoading}>
              <ActivityIndicator color='grey' />
            </View>
          )}
          {!reachOutMessages.cohortUsers.loading &&
            memberUsers.sort(sortUsers).map((user) => <UserCard user={user} key={user.uuid} />)}
        </View>
      </View>
    </ScrollView>
  );
};

const ROLE: { [key: string]: string } = {
  member: 'Member',
  leader: 'Group Leader',
};

const UserCard: React.VFC<{ user: User }> = ({ user }) => {
  const styles = useReachOutMessagesStyles();
  const reachOutMessages = useReachOutMessageContext();

  return (
    <Pressable onPress={() => reachOutMessages.openChatWithUser(user)}>
      <Card style={styles.userCard}>
        <Text>
          <Text size={13} style={user.settings.available_to_chat ? styles.available : styles.notAvailable}>
            ⬤
          </Text>
          {'  '}
          {user.settings.available_to_chat ? 'Available' : 'Not Available'}
        </Text>
        <View style={styles.userCardContent}>
          <View style={styles.userAvatarContainer}>
            {user.settings.avatar_url_512 && (
              <Image style={styles.mockAvatar} source={{ uri: user.settings.avatar_url_512 }} />
            )}
            {!user.settings.avatar_url_512 && <View style={styles.mockAvatar} />}
          </View>
          <View style={styles.userCardContentName}>
            <Text bold>{user.settings.display_name}</Text>
            <Text>{user.settings.about_me_short}</Text>
          </View>
          <View>
            <Text bold={user.roles.includes('member')}>{ROLE[user.roles[0]]}</Text>
          </View>
        </View>
      </Card>
    </Pressable>
  );
};
