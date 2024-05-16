import React, { useState } from 'react';
import { useReachOutCopingCoachSelectHourStyles } from './ReachOutCopingCoachSelectHour.styles';
import { Button, Checkbox, Text } from 'components';
import { Space } from 'components/Space/Space';
import { ScrollView, View } from 'react-native';

interface ReachOutCopingCoachSelectHourProps {
  onNext: (hours: string[]) => void;
  onCancel: () => void;
  scheduling?: boolean;
}

interface Hour {
  forRequest: string;
  display: string;
}

const HOURS: Hour[] = [
  { forRequest: 'Before 9am', display: '6am to 9am ET' },
  { forRequest: '9am to 12pm', display: '9am ET to 12pm ET' },
  { forRequest: '12pm to 3pm', display: '12pm ET to 3pm ET' },
  { forRequest: '3pm to 6pm', display: '3pm ET to 6pm ET' },
  { forRequest: 'After 6pm', display: '6pm ET to 9pm ET' },
];

export const ReachOutCopingCoachSelectHour: React.VFC<ReachOutCopingCoachSelectHourProps> = (props) => {
  const styles = useReachOutCopingCoachSelectHourStyles();

  const [selectedHours, setSelectedHours] = useState<Hour[]>([]);

  const checkFor = (hour: Hour) => (value: boolean | undefined) => {
    setSelectedHours([...selectedHours.filter((h) => h.display !== hour.display), ...(value ? [hour] : [])]);
  };

  const cancel = () => {
    setSelectedHours([]);
    props.onCancel();
  };

  const next = () => {
    if (selectedHours.length === 0) {
      return;
    }
    props.onNext(selectedHours.map((hour) => hour.forRequest));
  };

  const selectedHoursSet = new Set(...selectedHours.map((hour) => hour.display));

  return (
    <>
      <Text bold center>
        Reach Out to a Coach
      </Text>
      <Space margin={10} />
      <Text>
        Your contact information will be sent to the Coping Coach, who will get in touch within a day or two. If you're
        having an emergency, please dial 911.
      </Text>
      <Text italic>All times below are in Eastern Time.</Text>
      <Space margin={10} />
      <Text bold>What are good time(s) to reach you to set up an appointment?</Text>
      <Space margin={10} />
      <ScrollView>
        {HOURS.map((hour, index) => (
          <View key={index} style={styles.checkboxContainer}>
            <Checkbox
              isChecked={selectedHoursSet.has(hour.display)}
              // bounceFriction={100000}
              // size={35}
              // iconStyle={[styles.checkbox]}
              onPress={checkFor(hour)}
            />
            <Text>{hour.display}</Text>
          </View>
        ))}
      </ScrollView>
      <Space margin={10} />
      <View style={styles.buttonsContainer}>
        <Button light horizontalButtonPadding={10} onPress={() => cancel()}>
          CANCEL
        </Button>
        <Button
          loading={props.scheduling}
          disabled={!selectedHours.length}
          horizontalButtonPadding={10}
          onPress={() => next()}>
          NEXT
        </Button>
      </View>
    </>
  );
};
