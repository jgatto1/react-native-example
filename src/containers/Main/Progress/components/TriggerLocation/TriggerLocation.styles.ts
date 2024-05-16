import { makeStyle } from '@hooks/themed-style.hook';
import { useTheme } from 'providers/theme/ThemeProvider';
import { StyleProp, TextStyle } from 'react-native';

export const useTriggerLocationStyles = makeStyle((theme) => ({
  mapContainer: {
    height: 350,
    width: '100%',
  },
  noTriggerImage: {
    height: 350,
    width: '100%',
  },
  mapView: {
    height: 350,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  severityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  severity: {
    backgroundColor: theme.palette.error.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
}));

declare type SeverityStyleFactory = (s: number) => StyleProp<TextStyle>;

export const useProgressTriggerSeverityStyle = (): SeverityStyleFactory => {
  const theme = useTheme();

  const severityColors = theme.main.palette.other.progress.trigger.severity;

  return (severity: number) => {
    const index = severity - 1;
    if (index >= severityColors.length || index < 0) {
      return false;
    }
    return { backgroundColor: severityColors[index] };
  };
};
