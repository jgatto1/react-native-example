import React, { createRef, useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  Pressable,
  ScrollView,
  StyleProp,
  Switch,
  View,
  ViewStyle,
} from 'react-native';
import { useTheme } from 'providers/theme/ThemeProvider';
import { useHeaderStyle, useHomeStyle } from './Home.styles';
import { Button, Text } from 'components';

import Icons from '../assets';
import LogoIcon from '../../Login/assets/seeking-safety-logo.svg';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { IconButton } from 'components/Button/Button';
import { SocialFeed, SocialFeedRef } from './SocialFeed/SocialFeed';

import { HomeRoutes } from './Home.stack.routes';
import { Space } from 'components/Space/Space';
import { useCohortTopic } from './CohortTopic.context';
import { NotificationsService } from './Notifications/Notifications.service';
import { Tree3DView } from 'containers/Main/Home/Tree3DView/Tree3DView';
import LinearGradient from 'react-native-linear-gradient';
import { Toggle } from 'components/Toggle/Toggle';
import { MainTabRoutes } from '../MainTabRoutes';
import { TriggerRoutes } from '../Trigger/Trigger.routes';
import { ReachOutRoutes } from '../ReachOut/ReachOut.routes';
import { SafetyRoutes } from '../Safety/Safety.routes';
import { LearnRoutes } from '../Learn/Learn.routes';
import { ProgressRoutes } from '../Progress/Progress.routes';

export const Home: React.FC = () => {
  const [showSocialFeed, setShowSocialFeed] = useState(true);
  const [notificationsCount, setNotificationsCount] = useState(0);
  const { dailyActionText, weeklyTopicText, loading } = useCohortTopic();

  useEffect(() => {
    getNotifications().catch(() => console.log('Error while getting notifications'));
  }, []);

  const socialFeedRef = createRef<SocialFeedRef>();

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        socialFeedRef.current?.fetchNews();
      }, 100);
    }, [socialFeedRef])
  );

  const getNotifications = async () => {
    try {
      const response = await NotificationsService.getNotifications();
      setNotificationsCount(response.notifications.length);
    } catch (error) {
      console.warn('error getNotifications', error);
    }
  };

  const toggleSocialFeed = () => {
    setShowSocialFeed(!showSocialFeed);
  };

  const styles = useHomeStyle();

  function onScroll(e: NativeSyntheticEvent<NativeScrollEvent>) {
    const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent;
    const paddingToBottom = 20;
    const onBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
    if (onBottom) {
      socialFeedRef.current?.loadMore();
    }
  }

  return (
    <View style={styles.root}>
      <HomeHeader notificationsCount={notificationsCount} />
      <LoadingLayout loading={loading as boolean}>
        <ScrollView
          scrollEventThrottle={400}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          onScroll={(e) => onScroll(e)}>
          <HomeMainContent
            showSocialFeed={showSocialFeed}
            toggleSocialFeed={toggleSocialFeed}
            dailyActions={dailyActionText || ''}
            weeklyTopics={weeklyTopicText || ''}
          />
          <View style={styles.postsContainer}>
            {showSocialFeed && <SocialFeed newestTop={true} ref={socialFeedRef} place='social_feed' />}
          </View>
        </ScrollView>
        {/*<ScrollableFlatList
          styles={styles.content}
          topContent={
            <HomeMainContent
              showSocialFeed={showSocialFeed}
              toggleSocialFeed={toggleSocialFeed}
              dailyActions={dailyActionText || ''}
              weeklyTopics={weeklyTopicText || ''}
            />
          }
          bottomContent={
            <View style={styles.postsContainer}>
              {showSocialFeed && <SocialFeed newestTop={true} ref={socialFeedRef} place='social_feed' />}
            </View>
          }
        />*/}
      </LoadingLayout>
    </View>
  );
};

interface HomeContentProps {
  showSocialFeed: boolean;
  toggleSocialFeed: () => void;
  dailyActions: string;
  weeklyTopics: string;
}

const ANDROID_LOCAL = __DEV__ && Platform.OS === 'android';
// const ANDROID_LOCAL = false;

const HomeMainContent = ({ showSocialFeed, toggleSocialFeed, dailyActions, weeklyTopics }: HomeContentProps) => {
  const styles = useHomeStyle();
  const theme = useTheme();
  const navigation = useNavigation();
  return (
    <>
      <Space />
      {!ANDROID_LOCAL && <Tree3DView />}
      <Space />
      <View style={styles.navigationButtonsContainer}>
        <View style={styles.navButtonsFirstRow}>
          <Button
            style={[styles.navButton, styles.buttonWithMarginRight, { flexGrow: 1 }]}
            textStyle={{ fontSize: 13 }}
            onPress={() =>
              navigation.navigate(MainTabRoutes.SAFETY, {
                screen: SafetyRoutes.MAIN,
                params: {
                  screen: SafetyRoutes.MENU,
                },
              })
            }
            icon={<Icons.LighthouseInactiveIcon width={27} style={styles.buttonIcon} />}>
            SAFETY
          </Button>
          <Button
            style={[styles.navButton, styles.buttonWithMarginLeft, styles.buttonWithMarginRight, { flexGrow: 1.25 }]}
            textStyle={{ fontSize: 13 }}
            onPress={() => navigation.navigate(MainTabRoutes.REACH_OUT, { screen: ReachOutRoutes.MENU })}
            icon={<Icons.ChatInactiveIcon width={20} style={styles.buttonIcon} />}>
            REACH OUT
          </Button>
          <Button
            style={[styles.navButton, styles.buttonWithMarginLeft, { flexGrow: 1.1 }]}
            textStyle={{ fontSize: 13 }}
            onPress={() => navigation.navigate(MainTabRoutes.TRIGGER, { screen: TriggerRoutes.MENU })}
            icon={<Icons.FireInactiveIcon width={27} style={styles.buttonIcon} />}>
            TRIGGER
          </Button>
        </View>
        <View style={styles.navButtonsSecondRow}>
          <View style={[styles.secondRowButtonContainer, styles.secondRowButtonContainerLeft]}>
            <Button
              style={[styles.navButton, styles.buttonWithMarginRight, styles.learnButton]}
              textStyle={{ fontSize: 13 }}
              onPress={() => navigation.navigate(MainTabRoutes.LEARN, { screen: LearnRoutes.MAIN })}
              icon={<Icons.LearnInactiveIcon width={27} style={styles.buttonIcon} />}>
              LEARN
            </Button>
          </View>
          <View style={[styles.secondRowButtonContainer, styles.secondRowButtonContainerRight]}>
            <Button
              style={[styles.navButton, styles.buttonWithMarginLeft]}
              textStyle={{ fontSize: 13 }}
              onPress={() => navigation.navigate(MainTabRoutes.PROGRESS, { screen: ProgressRoutes.MAIN })}
              icon={<Icons.ProgressInactiveIcon width={27} style={styles.buttonIcon} />}>
              PROGRESS
            </Button>
          </View>
        </View>
      </View>
      <View style={styles.reminders}>
        <LinearGradient
          start={{ x: 0, y: 3 }}
          end={{ x: 1, y: 1 }}
          colors={['white', styles.dailyActions.backgroundColor]}
          style={[styles.reminderBox]}>
          <Pressable onPress={() => navigation.navigate(HomeRoutes.DAILY_ACTIONS)}>
            <Text size={15} bold center>
              DAILY ACTIONS
            </Text>
            <Space margin={1} />
            <View style={{ paddingHorizontal: 5 }}>
              <Text center size={22} style={styles.dailyActionsFont}>
                {dailyActions || 'No Current Topic'}
              </Text>
            </View>
          </Pressable>
        </LinearGradient>
        <LinearGradient
          start={{ x: -1, y: 3 }}
          end={{ x: 1, y: 1 }}
          colors={['white', styles.weeklyTopics.backgroundColor]}
          style={[styles.reminderBox, styles.reminderBoxRight]}>
          <Pressable onPress={() => navigation.navigate(HomeRoutes.WEEKLY_TOPIC)}>
            <Text size={15} bold center>
              WEEKLY TOPIC
            </Text>
            <Space margin={1} />
            <View style={{ paddingHorizontal: 5 }}>
              <Text center size={22} style={styles.dailyActionsFont}>
                {weeklyTopics || 'No Current Topic'}
              </Text>
            </View>
          </Pressable>
        </LinearGradient>
      </View>
      <View style={styles.socialFeedContainer}>
        <Text style={styles.socialFeedTitle}>SOCIAL FEED</Text>
        <View style={styles.socialFeedActions}>
          {showSocialFeed && (
            <Button
              style={[styles.newPostButton]}
              textStyle={{ fontSize: 12 }}
              onPress={() => navigation.navigate('new-post')}
              icon={<Icons.AddIcon width={22} height={22} style={styles.newPostIcon} />}>
              NEW POST
            </Button>
          )}
          <View style={styles.switchContainer}>
            <Text style={{ fontFamily: 'Montserrat-Bold' }} size={14}>
              Show Feed
            </Text>
            {Platform.OS === 'android' && <Toggle onToggle={toggleSocialFeed} isOn={showSocialFeed} />}
            {Platform.OS !== 'android' && (
              <Switch
                accessibilityRole='button'
                style={styles.switch}
                trackColor={{ true: theme.main.palette.primary }}
                onValueChange={toggleSocialFeed}
                value={showSocialFeed}
              />
            )}
          </View>
        </View>
        <Space margin={8} />
      </View>
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const NoARView = () => {
  return (
    <View style={{ height: 210, position: 'relative', justifyContent: 'center', alignItems: 'center' }}>
      <Image
        source={require('./Tree3DView/assets/ar_gradient_bg.png')}
        style={{ height: 210, position: 'absolute', top: 0, left: 0 }}
      />
      <Text center>Your device does not support AR</Text>
    </View>
  );
};

interface HomeHeaderProps {
  notificationsCount: number;
}

const HomeHeader = ({ notificationsCount }: HomeHeaderProps) => {
  const theme = useTheme();
  const styles = useHeaderStyle();
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        <IconButton onPress={() => navigation.navigate('settings')}>
          <Icons.SettingsIcon width={22} stroke={theme.main.palette.primary} />
        </IconButton>
        <View style={styles.headerTextContainer}>
          <LogoIcon width={32} height={32} />
          <Text style={styles.headerTextSeeking}>Seeking</Text>
          <Text style={styles.headerTextS}>S</Text>
          <Text style={styles.headerTextAfety}>AFETY</Text>
        </View>
        <IconButton style={styles.headerNotificationIcon} onPress={() => navigation.navigate('notifications')}>
          {notificationsCount > 0 && (
            <View style={styles.headerBudge}>
              <Text style={styles.headerBudgeText}>{notificationsCount}</Text>
            </View>
          )}
          <Icons.NotificationsIcon width={20} stroke={theme.main.palette.primary} />
        </IconButton>
      </View>
    </View>
  );
};

const LoadingLayout = ({ children, loading }: { children: React.ReactNode; loading: boolean }) => {
  const styles = useHomeStyle();
  return (
    <View style={styles.scrollViewContainer}>
      {loading && (
        <View style={styles.loadingIndicator}>
          <ActivityIndicator size='large' />
        </View>
      )}
      {children}
    </View>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ScrollableFlatList = ({
  topContent,
  bottomContent,
  styles,
}: {
  topContent: React.ReactElement;
  bottomContent: React.ReactElement;
  styles?: StyleProp<ViewStyle>;
}) => (
  <View style={styles}>
    <FlatList
      showsVerticalScrollIndicator={false}
      data={[]}
      renderItem={null}
      ListHeaderComponent={topContent}
      ListFooterComponent={bottomContent}
    />
  </View>
);
