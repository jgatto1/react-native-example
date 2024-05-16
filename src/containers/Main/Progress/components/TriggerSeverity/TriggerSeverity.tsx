import React from 'react';
import { useTriggerSeverityStyles } from './TriggerSeverity.styles';
import { Card, Divider, Text } from 'components';
import { useProgress } from 'containers/Main/Progress/Progress.context';
import { ActivityIndicator, ScrollView, StyleProp, View, ViewStyle } from 'react-native';
import { Space } from 'components/Space/Space';
import { useTheme } from 'providers/theme/ThemeProvider';
import { useProgressTriggerSeverityStyle } from 'containers/Main/Progress/components/TriggerLocation/TriggerLocation.styles';

const DAYS = ['M', 'T', 'W', 'Th', 'F', 'S', 'S'];

const WEEKS = new Array(12).fill(0);

export const TriggerSeverity: React.VFC = () => {
  const styles = useTriggerSeverityStyles();
  const severityOf = useProgressTriggerSeverityStyle();
  const progress = useProgress();
  const theme = useTheme();

  if (progress.loading || !progress.progress?.trigger_severity) {
    return (
      <Card>
        <Text center bold>
          Trigger Severity
        </Text>
        <View style={styles.cardLoading}>
          <ActivityIndicator color='grey' />
        </View>
      </Card>
    );
  }

  const severities = progress.progress.trigger_severity;

  const severity = (dIndex: number, wIndex: number): StyleProp<ViewStyle> => {
    const index = wIndex * 7 + dIndex;
    if (index >= severities.length) {
      return false;
    }
    const daySeverity = severities[index];
    if (daySeverity.severity === 0) {
      return false;
    }
    return severityOf(daySeverity.severity);
  };

  return (
    <Card style={styles.card}>
      <Text center bold>
        Trigger Severity
      </Text>
      <Space />
      <ScrollView>
        <View style={styles.severityContainer}>
          {DAYS.map((day, dIndex) => (
            <View key={dIndex} style={styles.dayContainer}>
              <Text style={styles.dayText} center>
                {day}
              </Text>
              {WEEKS.map((_, wIndex) => (
                <View key={`week-${wIndex}-day-${dIndex}`} style={[styles.dayBox, severity(dIndex, wIndex)]} />
              ))}
            </View>
          ))}
          <View style={styles.dayContainer}>
            <Text style={styles.dayText} center>
              {' '}
            </Text>
            {WEEKS.map((_, wIndex) => (
              <View key={`week-${wIndex}`}>
                <Text size={10}>{`W${wIndex + 1}`}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <Divider />
      <Space />
      <View style={styles.colorReferenceContainer}>
        {theme.main.palette.other.progress.trigger.severity.map((color, index) => (
          <View key={index} style={styles.colorReference}>
            <View style={[styles.dayBox, { backgroundColor: color }]} />
            {index === 0 && (
              <Text center size={11}>
                Mild
              </Text>
            )}
            {index === 2 && (
              <Text center size={11}>
                Mod.
              </Text>
            )}
            {index === 4 && (
              <Text center size={11}>
                Intense
              </Text>
            )}
          </View>
        ))}
      </View>
    </Card>
  );
};
