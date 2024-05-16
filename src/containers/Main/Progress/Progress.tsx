import { RefreshControl, ScrollView, View } from 'react-native';
import React, { useCallback } from 'react';
import { useProgressStyles } from './Progress.styles';
import { Button, Card, Text } from 'components';
import { Space } from 'components/Space/Space';
import { useProgress } from 'containers/Main/Progress/Progress.context';
import { CountCard } from 'containers/Main/Progress/components/CountCard/CountCard';
import { DailyActionsRoutes } from 'containers/Main/Home/DailyActions/DailyActions.stack.routes';
import { WeekMark } from 'containers/Main/Progress/components/WeekMark/WeekMark';
import { SVG } from './assets';
import { TriggerLocation } from 'containers/Main/Progress/components/TriggerLocation/TriggerLocation';
import { TriggerSeverity } from 'containers/Main/Progress/components/TriggerSeverity/TriggerSeverity';
import { WeekMarkPropFactory } from 'containers/Main/Progress/components/WeekMark/WeekMark.prop-factory';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { ProgressRoutes } from 'containers/Main/Progress/Progress.routes';
import { LearnRoutes } from '../Learn/Learn.routes';
import { ProgressARRoutes } from 'containers/Main/Progress/AR/Progress.AR.routes';
import { MainTabRoutes } from 'containers/Main/MainTabRoutes';

interface Tool {
  title: string;
  route: string;
}

interface Tools {
  safe_unsafe_picture: Tool;
  safety_plan_wizard: Tool;
  talk_to_safe_self: Tool;
}

const TOOLS: Tools = {
  safe_unsafe_picture: { title: 'Safe / Unsafe Picture', route: ProgressRoutes.PICTURE },
  safety_plan_wizard: { title: 'Safety Plan Wizard', route: ProgressRoutes.PLAN },
  talk_to_safe_self: { title: 'Talk To Safe Self', route: ProgressRoutes.TALK_TO_SELF },
};

declare type ToolKey = keyof Tools;

const TOOLS_KEY_ORDER: ToolKey[] = ['safety_plan_wizard', 'safe_unsafe_picture', 'talk_to_safe_self'];

// TODO: Route to Tree Progress
export const Progress: React.VFC = () => {
  const styles = useProgressStyles();
  const progress = useProgress();
  const nav = useNavigation();

  // update progress data
  useFocusEffect(
    useCallback(() => {
      progress.refresh();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  );

  return (
    <ScrollView
      style={styles.root}
      refreshControl={<RefreshControl refreshing={!!progress.loading} onRefresh={() => progress.refresh()} />}>
      <View style={styles.buttonsContainer}>
        <Button
          style={styles.button}
          onPress={() =>
            nav.navigate(MainTabRoutes.PROGRESS, {
              screen: ProgressRoutes.AR_TREE,
              params: { screen: ProgressARRoutes.PROGRESS },
            })
          }>
          VIEW TREE PROGRESS
        </Button>
        <Space />
        <Button style={styles.button} onPress={() => nav.navigate(ProgressRoutes.SEND_REPORT)}>
          SEND A PROGRESS REPORT
        </Button>
      </View>

      <Space />
      <Text bold>Daily Actions</Text>
      <Space />
      <CountCard
        title={'Weekly Quizzes'}
        countWord={'Quizzes'}
        total={progress.progress?.daily_quiz.my_quizzes}
        average={progress.progress?.daily_quiz.avg_cohort_quizzes}
        link={{
          route: ProgressRoutes.DAILY_ACTIONS,
          params: { screen: DailyActionsRoutes.MAIN, params: { screen: DailyActionsRoutes.QUIZ } },
          title: 'Weekly Quizzes',
        }}
      />
      <Space />
      <CountCard
        title={'Daily Safety Checks'}
        countWord={'Checks'}
        total={progress.progress?.daily_safety_check.my_checks}
        average={progress.progress?.daily_safety_check.avg_cohort_checks}
        link={{
          route: ProgressRoutes.DAILY_ACTIONS,
          params: { screen: DailyActionsRoutes.MAIN, params: { screen: DailyActionsRoutes.CHECK } },
          title: 'Daily Check Ins',
        }}
      />
      <Space />
      <CountCard
        title={'Daily Safety Reflections'}
        countWord={'Reflections'}
        total={progress.progress?.daily_safety_reflection.my_reflections}
        average={progress.progress?.daily_safety_reflection.avg_cohort_reflections}
        link={{
          route: ProgressRoutes.DAILY_ACTIONS,
          params: { screen: DailyActionsRoutes.MAIN, params: { screen: DailyActionsRoutes.REFLECTION } },
          title: 'Safety Reflections',
        }}
      />
      <Space />

      <Text bold>Weekly actions</Text>
      <CountCard
        title={'Weekly Questions'}
        countWord={'Questions'}
        total={progress.progress?.daily_quest.my_quests}
        average={progress.progress?.daily_quest.avg_cohort_quests}
        link={{
          route: ProgressRoutes.DAILY_ACTIONS,
          params: { screen: DailyActionsRoutes.MAIN, params: { screen: DailyActionsRoutes.QUESTION } },
          title: 'Daily Quests',
        }}
      />
      <Space />
      <WeekMark
        title={'Weekly Power up'}
        index={WeekMarkPropFactory.PowerUp.evaluate(progress.progress?.weekly_power_up)}
      />
      <Space />
      <WeekMark
        title={'Weekly Session Attendance'}
        index={WeekMarkPropFactory.MeetingAttendance.evaluate(progress.progress?.weekly_meeting_attendance)}
        indexP={WeekMarkPropFactory.MeetingAttendanceNonFull.evaluate(progress.progress?.weekly_meeting_attendance)}
      />
      <Space />
      <WeekMark
        title={'Weekly Commitment'}
        index={WeekMarkPropFactory.Commitment.evaluate(progress.progress?.weekly_commitment)}
      />
      <Space />
      <Text bold>Completion</Text>
      <Space />
      <Card>
        <Text bold center>
          Set Up Safety Tools
        </Text>
        <Space margin={10} />
        <View style={styles.toolsContainer}>
          {TOOLS_KEY_ORDER.map((tool, index) => (
            <View key={index} style={styles.tool}>
              <Text center>{TOOLS[tool].title}</Text>
              <Space margin={8} />
              {progress.progress?.set_up_safety_tools[tool] && (
                <SVG.Check width={35} height={35} fill={styles.toolSVG.color} />
              )}
              {!progress.progress?.set_up_safety_tools[tool] && (
                <Button onPress={() => nav.navigate(TOOLS[tool].route)} horizontalButtonPadding={4}>
                  SET IT UP
                </Button>
              )}
            </View>
          ))}
        </View>
      </Card>
      <Space />
      <TriggerLocation />
      <Space />
      <TriggerSeverity />

      <Space />
      <CountCard
        title={'Prepare For A Trigger'}
        countWord={'Trigger Preps'}
        total={progress.progress?.prepare_for_a_trigger.my_trigger_preps}
        average={progress.progress?.prepare_for_a_trigger.avg_cohort_trigger_preps}
        link={{ route: ProgressRoutes.PREPARE_AHEAD, title: 'Trigger Preps' }}
      />
      <Space />
      <CountCard
        title={'Safety Boomerangs'}
        countWord={'Boomerangs'}
        total={progress.progress?.safety_boomerang.my_boomerangs}
        average={progress.progress?.safety_boomerang.avg_cohort_boomerangs}
        link={{ route: ProgressRoutes.BOOMERANG, title: 'Safety Boomerangs' }}
      />
      <Space />
      <CountCard
        title={'Social Feed Posts'}
        countWord={'Posts'}
        total={progress.progress?.social_feed_posts.my_posts}
        average={progress.progress?.social_feed_posts.avg_cohort_posts}
        link={{ route: ProgressRoutes.SOCIAL_FEED, title: 'Social Feed Posts' }}
      />
      <Space />
      <CountCard
        title={'My Safe Place Posts'}
        countWord={'Posts'}
        total={progress.progress?.my_safe_place_posts.my_posts}
        average={progress.progress?.my_safe_place_posts.avg_cohort_posts}
        link={{ route: ProgressRoutes.SAFE_PLACE, title: 'My Safety Posts' }}
      />
      {/* <Space />
      <CountCard
        title={'Safety Plan Wizard Checks'}
        countWord={'Checks'}
        total={progress.progress?.safety_plan_check.my_checks}
        average={progress.progress?.safety_plan_check.avg_cohort_checks}
        link={{ route: ProgressRoutes.PLAN, title: 'Safety Plan Wizard Checks' }}
      /> */}
      <Space />
      <CountCard
        title={'Safety Surprises'}
        countWord={'Surprises'}
        total={progress.progress?.safety_surprise.my_surprises}
        average={progress.progress?.safety_surprise.avg_cohort_surprises}
        link={{ route: ProgressRoutes.SURPRISE, title: 'Safety Surprises' }}
      />
      <Space />
      <CountCard
        title={'Learn Reflections'}
        countWord={'Reflections'}
        total={progress.progress?.learn_reflections.my_reflections}
        average={progress.progress?.learn_reflections.avg_cohort_reflections}
        link={{ route: LearnRoutes.MAIN, title: 'Learn Reflections' }}
      />

      <Space />
      <View style={styles.buttonsContainer}>
        <Button
          style={styles.button}
          onPress={() =>
            nav.navigate(MainTabRoutes.PROGRESS, {
              screen: ProgressRoutes.AR_TREE,
              params: { screen: ProgressARRoutes.PROGRESS },
            })
          }>
          VIEW TREE PROGRESS
        </Button>
        <Space />
        <Button style={styles.button} onPress={() => nav.navigate(ProgressRoutes.SEND_REPORT)}>
          SEND A PROGRESS REPORT
        </Button>
        <Space />
        <Space />
      </View>
    </ScrollView>
  );
};
