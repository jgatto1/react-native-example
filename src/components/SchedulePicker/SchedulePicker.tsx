import { Platform, Pressable, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSchedulePickerStyles } from './SchedulePicker.styles';
import { Text } from 'components';
import { SVG } from 'containers/Main/Safety/Boomerang/Create/assets';
import { Space } from 'components/Space/Space';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

interface Schedule {
  day: number;
  month: number;
  year: number;
  hour: number;
  minute: number;
  time: 'AM' | 'PM';
}

interface SchedulePickerProps {
  onSelect: (args: { schedule: Partial<Schedule>; date: Date }) => void;
  autofocus?: boolean;
}

export const SchedulePicker: React.VFC<SchedulePickerProps> = ({ onSelect, autofocus }) => {
  const styles = useSchedulePickerStyles();

  const [schedule, setSchedule] = useState<Partial<Schedule>>({});
  const [showDatePicker, setShowDatePicker] = useState(false);

  const openDatePicker = () => setShowDatePicker(true);

  useEffect(() => {
    if (autofocus && Platform.OS !== 'android') {
      setShowDatePicker(true);
    }
  }, [autofocus]);

  const [scheduleDate, setScheduleDate] = useState<Date>();

  const setDateTime = (date: Date) => {
    setShowDatePicker(false);
    const newDate = new Date(date);
    setScheduleDate(newDate);
    const newSchedule: Partial<Schedule> = {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      hour: date.getHours() % 12,
      minute: date.getMinutes(),
      time: date.getHours() > 11 ? 'PM' : 'AM',
    };
    setSchedule(newSchedule);
    onSelect({ schedule: newSchedule, date });
  };

  const formatMinHour = (time?: number) => {
    if (!time && time !== 0) {
      return;
    }
    return String(time).padStart(2, '0');
  };

  return (
    <>
      <DateTimePickerModal
        date={scheduleDate || new Date()}
        minimumDate={new Date()}
        isVisible={showDatePicker}
        mode='datetime'
        onConfirm={setDateTime}
        onCancel={() => setShowDatePicker(false)}
      />
      <View style={styles.dateTimePickerContainer}>
        <View style={styles.datePickerContainer}>
          <View style={styles.pickerTitle}>
            <SVG.Calendar width={17} />
            <Space horizontal margin={3} />
            <Text>Select Date</Text>
          </View>
          <Space margin={3} />
          <View style={styles.inputsContainer}>
            <Pressable onPress={openDatePicker} style={[styles.monthInput, styles.input]}>
              <Text size={12} style={[!schedule.month && styles.inputPlaceholder]}>
                {schedule.month || 'mm'}
              </Text>
            </Pressable>
            <Pressable onPress={openDatePicker} style={[styles.dayInput, styles.input]}>
              <Text size={12} style={[!schedule.day && styles.inputPlaceholder]}>
                {schedule.day || 'dd'}
              </Text>
            </Pressable>
            <Pressable onPress={openDatePicker} style={[styles.yearInput, styles.input]}>
              <Text size={12} style={[!schedule.year && styles.inputPlaceholder]}>
                {schedule.year || 'yyyy'}
              </Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.datePickerContainer}>
          <View style={styles.pickerTitle}>
            <SVG.Clock width={17} />
            <Space horizontal margin={3} />
            <Text>Select Time</Text>
          </View>
          <Space margin={3} />
          <View style={styles.inputsContainer}>
            <Pressable onPress={openDatePicker} style={[styles.hourInput, styles.input]}>
              <Text size={12} style={[!schedule.hour && styles.inputPlaceholder]}>
                {formatMinHour(schedule.hour) || 'hh'}
              </Text>
            </Pressable>
            <Text>:</Text>
            <Pressable onPress={openDatePicker} style={[styles.minuteInput, styles.input]}>
              <Text size={12} style={[!schedule.minute && styles.inputPlaceholder]}>
                {formatMinHour(schedule.minute) || 'mm'}
              </Text>
            </Pressable>
            <Pressable onPress={openDatePicker} style={[styles.amInput, styles.input]}>
              <Text size={12} style={[!schedule.time && styles.inputPlaceholder]}>
                {schedule.time || 'AM'}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </>
  );
};
