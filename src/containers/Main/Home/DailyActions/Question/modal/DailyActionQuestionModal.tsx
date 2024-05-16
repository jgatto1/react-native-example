import React from 'react';
import { useDailyActionsModalStyles } from './DailyActionQuestionModal.styles';
import { Button, Modal, Text } from 'components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { DailyActionsRoutes } from 'containers/Main/Home/DailyActions/DailyActions.stack.routes';
import { View } from 'react-native';
import { useTheme } from 'providers/theme/ThemeProvider';
import { BackgroundViewStyles } from 'components/BackgroundView/BackgroundView';

interface RouteProps {
  reminder?: boolean;
}

enum Texts {
  YES = 'Yes!',
  SUPER = 'Super!',

  COMPLETE = 'Your Daily Question is marked complete',
  REMINDER = 'You will be reminded in 3 hours',
}

export const DailyActionQuestionModal: React.VFC = () => {
  const styles = useDailyActionsModalStyles();
  const route = useRoute();
  const navigation = useNavigation();
  const theme = useTheme();
  const params = (route.params || {}) as RouteProps;

  const title = params.reminder ? Texts.YES : Texts.SUPER;
  const subtitle = params.reminder ? Texts.REMINDER : Texts.COMPLETE;
  const backgroundStyles: BackgroundViewStyles = {
    top: { flex: 28 },
    middle: { flex: 9, backgroundColor: theme.main.palette.other.weeklyTopic.background },
  };
  return (
    <Modal
      styles={{ root: { flex: 1.5 } }}
      backgroundViewStyles={backgroundStyles}
      onClose={() => navigation.navigate(DailyActionsRoutes.MENU)}>
      <View style={styles.cardRoot}>
        <Text weight='bold' size={20}>
          {title}
        </Text>
        <Text style={styles.modalMiddleText}>{subtitle}</Text>
        <Button style={styles.modalButton} onPress={() => navigation.navigate(DailyActionsRoutes.MENU)}>
          OK
        </Button>
      </View>
    </Modal>
  );
};
