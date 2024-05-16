import React from 'react';
import { View } from 'react-native';
import { Button, Modal, Text } from 'components';
import { useCommitmentCongratsModalStyles } from './WeeklyModal.styles';
import { useNavigation } from '@react-navigation/native';
import { WeeklyTopicRoutes } from '../WeeklyTopic.stack.routes';
import { useTheme } from 'providers/theme/ThemeProvider';

export const WeeklyTopicModal = ({ route }: { route: any }) => {
  const theme = useTheme();
  const styles = useCommitmentCongratsModalStyles();
  const navigation = useNavigation();

  return (
    <Modal
      backgroundViewStyles={{ middle: { backgroundColor: theme.main.palette.other.weeklyTopic.background } }}
      styles={{ bottomSpace: { flex: 2.3 } }}
      onClose={() => navigation.navigate(WeeklyTopicRoutes.MENU)}>
      <View style={styles.content}>
        <Text bold size={20}>
          {route?.params?.title || 'CONGRATS!'}
        </Text>

        <Text>{route?.params?.content || 'Weekly commitment completed.'}</Text>

        <Button style={styles.congratsOk} onPress={() => navigation.navigate(WeeklyTopicRoutes.MENU)}>
          {route?.params?.action || 'OK'}
        </Button>
      </View>
    </Modal>
  );
};
