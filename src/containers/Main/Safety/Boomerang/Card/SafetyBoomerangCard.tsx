import { View } from 'react-native';
import React from 'react';
import { useSafetyBoomerangCardStyles } from './SafetyBoomerangCard.styles';
import { Button, Card, Divider, Text } from 'components';
import moment from 'moment';
import { Space } from 'components/Space/Space';
import { Boomerang } from 'model/backend/safety';
import { SafetyRoutes } from 'containers/Main/Safety/Safety.routes';
import { useNavigation } from '@react-navigation/native';
import { BackendClient } from 'service/backend-client.service';
import { validateResponse } from 'model/backend';
import { LINKS_HASH } from 'containers/Main/Safety/Boomerang/Card/SafetyBoomerangCard.links';

interface SafetyBoomerangCardProps {
  boomerang: Partial<Boomerang>;
  onlyView?: boolean;
  onCancel?: (boomerangId: number) => void;
}

export const SafetyBoomerangCard: React.VFC<SafetyBoomerangCardProps> = ({ boomerang, onlyView, onCancel }) => {
  const styles = useSafetyBoomerangCardStyles();
  const navigation = useNavigation();

  const goToLink = () => {
    if (onlyView) {
      return;
    }
    navigation.navigate((boomerang.link && LINKS_HASH[boomerang.link].route) || SafetyRoutes.MENU, {
      ...(boomerang.link ? LINKS_HASH[boomerang.link].params : {}),
      backRoute: SafetyRoutes.BOOMERANG,
    });
  };

  const deleteBoomerang = () => {
    const boomerangId = boomerang.id;
    if (!boomerangId) {
      return;
    }
    BackendClient.delete(`/boomerang/${boomerangId}/delete`)
      .then(validateResponse)
      .then(() => onCancel && onCancel(boomerangId))
      .catch((err) => console.warn('Cannot cancel boomerang', err));
  };

  return (
    <Card plain style={styles.boomerangCard}>
      <Text bold>Scheduled for:</Text>
      <Space />
      <Text>
        {boomerang?.scheduled_event?.start_at
          ? moment(boomerang.scheduled_event.start_at).format('MM/DD/YYYY hh:mm A')
          : '------'}
      </Text>

      <Space margin={10} />

      <Text bold>Reminder:</Text>
      <Space />
      <Text>{boomerang.reminder}</Text>

      <Space margin={10} />

      <Text bold>Goal for today:</Text>
      <Space />
      <Text>{boomerang.goal}</Text>
      <Space />

      <Divider width={0.6} margin={10} />
      <Space />

      <Text bold>Try This Safety Activity</Text>
      <Space margin={10} />
      <View>
        {!!boomerang.link && (
          <Button style={styles.button} textStyle={styles.buttonText} onPress={() => goToLink()}>
            {(boomerang.link || '').toUpperCase()}
          </Button>
        )}
      </View>
      <Space />
      <Divider width={0.6} margin={10} />
      <Space />
      <Text bold>Additional message:</Text>
      <Space />
      <Text>{boomerang.message}</Text>
      <Space />
      <View style={styles.cancelButtonContainer}>
        <Button
          disabled={onlyView}
          style={styles.cancelButton}
          textStyle={styles.cancelButtonText}
          onPress={() => deleteBoomerang()}>
          CANCEL
        </Button>
      </View>
    </Card>
  );
};
