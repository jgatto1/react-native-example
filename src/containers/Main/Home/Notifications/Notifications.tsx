import React, { useCallback, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
// Components
import { Button, Card, IconButton, Space, Text } from 'components';
import { DefaultAvatar } from 'components/Avatar/Avatar';
import Loading from 'components/Loading/Loading';
// Core
import { Notification, NotificationsService } from './Notifications.service';
import { INotification } from 'model/backend/notification';
// Routes
import { HomeRoutes } from '../Home.stack.routes';
import { ReachOutMessagesRoutes } from 'containers/Main/ReachOut/Messages/ReachOutMessages.routes';
import { ReachOutRoutes } from 'containers/Main/ReachOut/ReachOut.routes';
import { SafetyBoomerangRoutes } from 'containers/Main/Safety/Boomerang/SafetyBoomerang.routes';
import { SafetyTalkToSelfRoutes } from 'containers/Main/Safety/TalkToSelf/SafetyTalkToSelf.routes';
import { TriggerRoutes } from 'containers/Main/Trigger/Trigger.routes';
import { WeeklyTopicRoutes } from '../WeeklyTopic/WeeklyTopic.stack.routes';
// Assets
import Icons from '../../assets';
// Style
import { useNotificationsStyle } from './Notifications.style';
import { Avatar } from 'containers/Main/Home/SocialFeed/PostCard/PostCard';
import { MainTabRoutes } from 'containers/Main/MainTabRoutes';

interface IRouteOrigin {
  safety_check_in_reminder: string;
  meeting_reminder: string;
  trigger_prep_event: string;
  help_cope: string;
  weekly_commitment_reminder: string;
  talk_to_safe_self_reminder: string;
  boomerang_message: string;
  direct_message_from_leader: string;
  direct_message_from_member: string;
  comment_on_social_feed_post: string;
  new_social_feed_post_cohort: string;
  new_social_feed_post_community: string;
  new_weekly_topic: string;
  new_daily_share: string;
  new_daily_quiz: string;
}

declare type RouteParams = { screen?: string; params?: RouteParams; backRoute?: String };
declare type Params = { route: string; params?: RouteParams };

const ROUTES: { [key: string]: Params } = {
  safety_check_in_reminder: { route: WeeklyTopicRoutes.MENU },
  meeting_reminder: { route: WeeklyTopicRoutes.MENU },
  trigger_prep_event: { route: TriggerRoutes.MENU },
  help_cope: {
    route: MainTabRoutes.REACH_OUT,
    params: {
      screen: ReachOutRoutes.MESSAGES,
      params: {
        screen: ReachOutMessagesRoutes.HELP_ME_COPE,
        params: {
          backRoute: HomeRoutes.NOTIFICATIONS,
        },
      },
    },
  },
  weekly_commitment_reminder: { route: WeeklyTopicRoutes.MENU },
  talk_to_safe_self_reminder: { route: SafetyTalkToSelfRoutes.MENU },
  boomerang_message: { route: SafetyBoomerangRoutes.MENU },
  direct_message_from_leader: {
    route: 'reach-out',
    params: {
      screen: ReachOutRoutes.MESSAGES,
      params: {
        screen: ReachOutMessagesRoutes.MAIN,
      },
    },
  },
  direct_message_from_member: {
    route: 'reach-out',
    params: {
      screen: ReachOutRoutes.MESSAGES,
      params: {
        screen: ReachOutMessagesRoutes.MAIN,
      },
    },
  },
  comment_on_social_feed_post: { route: HomeRoutes.COMMENTS },
  new_social_feed_post_cohort: { route: HomeRoutes.NEW_POST },
  new_social_feed_post_community: { route: HomeRoutes.NEW_POST },
  new_weekly_topic: { route: HomeRoutes.WEEKLY_TOPIC },
  new_daily_share: { route: HomeRoutes.DAILY_ACTIONS },
  new_daily_quiz: { route: HomeRoutes.DAILY_ACTIONS },
};

function mergeParams(params: RouteParams | undefined, notificationParams: object | undefined): object | undefined {
  if (!params || !notificationParams) {
    return params;
  }
  const add = params.screen ? { params: mergeParams(params.params || {}, notificationParams) } : notificationParams;
  return { ...params, ...add };
}

const Notifications: React.FC = () => {
  const styles = useNotificationsStyle();
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);

  const getNotifications = async (): Promise<INotification[]> => {
    try {
      setLoading(true);
      const response = await NotificationsService.getAllNotifications();
      setLoading(false);
      setNotifications(response.notifications ?? []);
      return response.notifications;
    } catch (error) {
      console.warn('Error while fetching notifications', error);
    }
    return [];
  };

  useFocusEffect(
    useCallback(() => {
      getNotifications()
        .then((n) => NotificationsService.fillMoreData(n))
        .then((n) => setNotifications(n))
        .catch((err) => console.warn('Error while filling more data notifications', err));
    }, [])
  );

  const removeNotification = async (id: number) => {
    try {
      setLoading(true);
      await NotificationsService.deleteNotification(id);
      setLoading(false);
      setNotifications((actual) => actual.filter((n) => n.id !== id));
    } catch (error) {
      console.warn('error removeNotification', error);
    }
  };

  const goToSettings = async () => {
    navigation.navigate('settings');
  };

  const onPressNotification = (notification: Notification) => {
    NotificationsService.markAsRead(notification.id).catch((err) =>
      console.warn(`Cannot mark as read notification ${notification.id}`, err)
    );
    const { route, params } = ROUTES[notification.origin as keyof IRouteOrigin];
    const finalParams = mergeParams(params, notification.params);
    console.log(`Going to ${route}`, { notification, finalParams });
    navigation.navigate(route, finalParams);
  };

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>
            You can change your notification preferences in My Account settings any time.
          </Text>
          <Button style={styles.buttonAccountSettings} onPress={goToSettings}>
            <Text style={styles.textButton}>MY ACCOUNT SETTINGS</Text>
          </Button>
          {notifications.map((item) => (
            <Pressable key={item.id} onPress={() => onPressNotification(item)}>
              <Card style={styles.containerCard}>
                <View style={styles.containeravatar}>
                  <Space />
                  <NotificationAvatar n={item} />
                </View>
                <View style={styles.containerDescription}>
                  <Space horizontal />
                  <View style={styles.description}>
                    <Space margin={8} />
                    <Text size={13}>{item.text.trim()}</Text>
                  </View>
                </View>

                <IconButton style={styles.closeIcon} onPress={() => removeNotification(item.id)}>
                  <Icons.CloseIcon height={35} width={35} fill={styles.avatarRed.color} />
                </IconButton>
              </Card>
            </Pressable>
          ))}
        </View>
      </ScrollView>
      {loading && <Loading />}
    </>
  );
};

const NotificationAvatar: React.VFC<{ n: Notification }> = ({ n }) => {
  const styles = useNotificationsStyle();
  if (!n.user || !n.user.settings.avatar_url_512) {
    return <DefaultAvatar size={29} backgroundColor={styles.avatarRedCircle} color={styles.avatarRed.color} />;
  }
  return (
    <Avatar
      imageUrl={{ uri: n.user.settings.avatar_url_512 }}
      clickable={false}
      userId={n.user.uuid}
      userName={n.user.settings.display_name}
    />
  );
};

export default Notifications;
