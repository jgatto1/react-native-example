import { Image, ScrollView, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useTreeProgressStyles } from './TreeProgress.styles';
import { Card, Divider, Space, Text } from 'components';
import { useFocusEffect } from '@react-navigation/native';
import { TextProps } from 'components/Text/Text';
import { Viro3DTreeViewProgress } from 'containers/Main/Home/Tree3DView/Viro3DTreeView';
import { Tree3DViewContextProvider } from 'containers/Main/Home/Tree3DView/Tree3DView.context';

interface Props {
  cameraRoute: {
    name: string;
    params: object;
  };
}

export const TreeProgress: React.VFC<Props> = (_props) => {
  const styles = useTreeProgressStyles();
  const [visible, setIsVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setIsVisible(true);

      return () => {
        setIsVisible(false);
      };
    }, [])
  );

  if (!visible) {
    return <></>;
  }

  return (
    <Tree3DViewContextProvider progressView>
      <ScrollView style={styles.root}>
        <Space />
        <Card style={styles.card}>
          <View style={styles.cardContent}>
            <View style={styles.tree3dContainer}>
              <Viro3DTreeViewProgress />
            </View>
            <View style={styles.bigFlex}>
              <View style={styles.sizeDividerThumbnailContainer}>
                <View style={styles.divider}>
                  <Divider width={0.8} style={styles.dividerLine} />
                </View>
                <View>
                  <View style={styles.thumbnail}>
                    <Image source={require('./assets/BigPreview.png')} style={styles.imagePreview} />
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.midFlex}>
              <View style={styles.sizeDividerThumbnailContainer}>
                <View style={styles.divider}>
                  <Divider width={0.8} style={styles.dividerLine} />
                </View>
                <View>
                  <View style={styles.thumbnail}>
                    <Image source={require('./assets/MidPreview.png')} style={styles.imagePreview} />
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.smallFlex}>
              <View style={styles.sizeDividerThumbnailContainer}>
                <View style={styles.divider}>
                  <Divider width={0.8} style={styles.dividerLine} />
                </View>
                <View>
                  <View style={styles.thumbnail}>
                    <Image source={require('./assets/SmallPreview.png')} style={styles.imagePreview} />
                  </View>
                </View>
              </View>
            </View>
          </View>
          <Divider />
        </Card>
        <Space margin={15} />
        <Card>
          <Space />
          <Text center bold size={16}>
            Bring your recovery alive!
          </Text>
          <Space />
          <TextCommon size={15} style={styles.text}>
            The more you use this Seeking Safety app, the more your tree grows-- and the more your recovery progresses.
          </TextCommon>
          <Space />
          <TextCommon size={15}>
            You'll earn <Text italic>leaves, flowers, fruits, butterflies</Text>, and a <Text italic>lantern</Text> from
            the following activities
          </TextCommon>
          <Space />
          <View style={styles.bullets}>
            <TextCommon size={15}>
              ●{' '}
              <TextCommon italic bold>
                Leaves
              </TextCommon>{' '}
              arise from <TextCommon bold>daily activities</TextCommon>
              {': '}
              <TextCommon italic size={10}>
                Daily Safety Check, Daily Question; and Daily Safety Reflection.
              </TextCommon>
            </TextCommon>
            <Space margin={5} />
            <TextCommon size={15}>
              ●{' '}
              <TextCommon italic bold>
                Flowers
              </TextCommon>{' '}
              arise from <TextCommon bold>safety activities</TextCommon>
              {': '}
              <TextCommon italic size={10}>
                Safety Surprise, Safety Boomerang, Talk to Safe Self, Safe / Unsafe Pictures, and Log a Trigger.
              </TextCommon>
            </TextCommon>
            <Space margin={5} />
            <TextCommon size={15}>
              ●{' '}
              <TextCommon italic bold>
                Butterflies
              </TextCommon>{' '}
              arise from <TextCommon bold>posts</TextCommon>{' '}
              <TextCommon italic size={10}>
                to the Social Feed or My Safe Place.
              </TextCommon>
            </TextCommon>
            <Space margin={5} />
            <TextCommon size={15}>
              ●{' '}
              <TextCommon italic bold>
                Fruits
              </TextCommon>{' '}
              arise from <TextCommon bold>weekly activities</TextCommon>
              {': '}
              <TextCommon italic size={10}>
                Weekly Commitment, Weekly Power Up, and Weekly Quiz.
              </TextCommon>
            </TextCommon>
            <Space margin={5} />
            <TextCommon size={15}>
              ●{' '}
              <TextCommon italic bold>
                The lantern
              </TextCommon>{' '}
              appears when your <TextCommon bold>tree is complete</TextCommon>. It takes 4 weeks to complete your tree.
            </TextCommon>
          </View>
          <Space />
          <TextCommon size={15}>
            You can also see your tree in <TextCommon italic>augmented reality</TextCommon>, which means you can place
            it in your environment and take a photo of that if you want. See the app Learn section for more.
          </TextCommon>
        </Card>
        <Space margin={13} />
      </ScrollView>
    </Tree3DViewContextProvider>
  );
};

const TextCommon: React.FC<TextProps> = ({ children, ...props }) => {
  const styles = useTreeProgressStyles();
  return (
    <Text {...props} style={[styles.text, props.style]}>
      {children}
    </Text>
  );
};
