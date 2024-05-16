import { Image, Modal, View } from 'react-native';
import React from 'react';
import { useSafetyPlanExportModalStyles } from './SafetyPlanExportModal.styles';
import { Button, Card, Text } from 'components';
import { BackgroundView } from 'components/BackgroundView/BackgroundView';
import { Space } from 'components/Space/Space';
import { useTheme } from 'providers/theme/ThemeProvider';

interface SafetyPlanExportModalProps {
  visible: boolean;
  onPressOk: () => void;
}

export const SafetyPlanExportModal: React.VFC<SafetyPlanExportModalProps> = ({ visible, onPressOk }) => {
  const styles = useSafetyPlanExportModalStyles();
  const theme = useTheme();

  return (
    <Modal animationType='slide' visible={visible} transparent={true} onRequestClose={() => onPressOk()}>
      <View style={styles.root}>
        <BackgroundView
          styles={{
            // top: { flex: 36 },
            // bottom: { flex: 17 },
            middle: { backgroundColor: theme.main.palette.other.weeklyTopic.background },
          }}>
          <View style={styles.emptyContainer} />
          <View style={styles.cardContainer}>
            <Card style={styles.card}>
              <Image style={styles.image} source={require('./assets/SafetyPlanIllustration.png')} />
              <Space margin={10} />
              <Text weight='bold' style={styles.title} size={25}>
                Super!
              </Text>
              <Space margin={10} />
              <Text style={styles.title}>Your Safety Plan has been sent.</Text>
              <Space margin={2} />
              <Text style={styles.title}>You've taken a strong step toward safety.</Text>
              <Space margin={10} />
              <View style={styles.buttonContainer}>
                <Button style={styles.button} onPress={() => onPressOk()}>
                  OK
                </Button>
              </View>
            </Card>
          </View>
        </BackgroundView>
      </View>
    </Modal>
  );
};
