import { View } from 'react-native';
import React from 'react';
import { useWeekMarkStyles } from './WeekMark.styles';
import { Card, Divider, Text } from 'components';
import { Space } from 'components/Space/Space';

interface WeekMarkProps {
  title: string;
  index: number[];
  indexP?: number[];
}

export const WeekMark: React.VFC<WeekMarkProps> = (props) => {
  const styles = useWeekMarkStyles();

  const markIndex = new Set(props.index || []);
  const markIndexP = new Set(props.indexP || []);

  return (
    <Card style={styles.root}>
      <Text bold center>
        {props.title}
      </Text>
      <Space />
      <View style={styles.weeksContainer}>
        <View style={styles.weeks}>
          {new Array(12).fill(0).map((_, index) => (
            <View style={styles.weekContainer} key={`view-${index}`}>
              <View key={`view-${index}`} style={styles.weekInner}>
                {markIndexP.has(index) && (
                  <Text bold size={22} style={styles.p}>
                    P
                  </Text>
                )}
                {!markIndexP.has(index) && <View style={[styles.mark, markIndex.has(index) && styles.on]} />}
                <Text adjustsFontSizeToFit numberOfLines={1} center size={11}>
                  W{index + 1}
                </Text>
              </View>
              {index !== 11 && <Divider key={`divider-${index}`} width={0.7} vertical />}
            </View>
          ))}
        </View>
      </View>
    </Card>
  );
};
