import React from 'react';
import { useCountCardStyles } from './CountCard.styles';
import { Card, Text } from 'components';
import { View } from 'react-native';
import { Space } from 'components/Space/Space';
import { TextLink } from 'components/Text/TextLink';
import { useNavigation } from '@react-navigation/native';
import { useBackContext } from 'components/CustomHeader/CustomHeader';
import { MainTabRoutes } from 'containers/Main/MainTabRoutes';
import { ProgressRoutes } from '../../Progress.routes';

interface CountCardProps {
  title: string;
  countWord: string;
  total?: number;
  average?: number;
  link: {
    route: string;
    params?: object;
    title: string;
  };
}

export const CountCard: React.VFC<CountCardProps> = (props) => {
  const styles = useCountCardStyles();
  const nav = useNavigation();
  const back = useBackContext();

  const navigate = () => {
    back.set(ProgressRoutes.MAIN, MainTabRoutes.PROGRESS);
    nav.navigate(props.link.route, props.link.params);
  };

  const calculateCircleSizes = (): {
    total: { size: number; width: number };
    average: { size: number; width: number };
  } => {
    let total = props.total;
    let average = props.average;
    const bigSize = 85;
    const middleSize = 55;
    if (!total) {
      total = 0;
    }
    if (!average) {
      average = 0;
    }
    if (total === average) {
      return { total: { size: middleSize, width: 4 }, average: { size: middleSize, width: 4 } };
    } else if (total > average) {
      return { total: { size: bigSize, width: 7 }, average: { size: middleSize, width: 4 } };
    } else {
      return { total: { size: middleSize, width: 4 }, average: { size: bigSize, width: 7 } };
    }
  };

  const { total, average } = calculateCircleSizes();

  return (
    <Card style={styles.root}>
      <Text center bold>
        {props.title}
      </Text>
      <Space margin={10} />

      <View style={styles.counts}>
        <View style={styles.countContainer}>
          <View
            style={[
              styles.count,
              styles.my,
              styles.countBig,
              {
                minWidth: total.size,
                minHeight: total.size,
                borderWidth: total.width,
              },
            ]}>
            <Text center bold size={18} style={styles.myText}>
              {props.total || 0}
            </Text>
          </View>
          <Text>My {props.countWord}</Text>
        </View>
        <View style={styles.countContainer}>
          <View
            style={[
              styles.count,
              styles.avg,
              {
                minWidth: average.size,
                minHeight: average.size,
                borderWidth: average.width,
              },
            ]}>
            <Text center bold size={18} style={styles.avgText}>
              {props.average || 0}
            </Text>
          </View>
          <Text center>
            Average Group{'\n'}
            {props.countWord}
          </Text>
        </View>
      </View>
      <Space margin={5} />
      <TextLink plain center style={styles.link} onPress={() => navigate()}>
        Tap here to complete more{'\n'}
        {props.link.title}
      </TextLink>
      <Space />
    </Card>
  );
};
