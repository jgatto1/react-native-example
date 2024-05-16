import React, { useEffect, useState } from 'react';
import { useProgressTriggerSeverityStyle, useTriggerLocationStyles } from './TriggerLocation.styles';
import { Button, Card, Text } from 'components';
import { ActivityIndicator, Image, View } from 'react-native';
import { Space } from 'components/Space/Space';
import { useProgress } from 'containers/Main/Progress/Progress.context';
import { TriggerIncident, TriggerIncidentsRes } from 'model/backend/trigger-incident';
import { validateResponse } from 'model/backend';
import { TriggerSeverity } from 'model/backend/progress';
import moment from 'moment';
import WebView from 'react-native-webview';
import { BackendClient } from 'service/backend-client.service';

interface Incident {
  severity: TriggerSeverity;
  trigger: TriggerIncident;
}

export const TriggerLocation: React.VFC = () => {
  const styles = useTriggerLocationStyles();
  const severityOf = useProgressTriggerSeverityStyle();
  const progressContext = useProgress();

  // Component not depends on severity from progress. But use it to refresh using Effect
  const triggersSeverity = progressContext.progress?.trigger_severity;

  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [actualIndex, setActualIndex] = useState<number>();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setActualIndex(undefined);
    if (!triggersSeverity) {
      return;
    }
    BackendClient.get<TriggerIncidentsRes>('/trigger_incidents')
      .then(validateResponse)
      .then((res) => res.trigger_incidents.map((trigger, i) => ({ trigger, severity: triggersSeverity[i] })))
      .then((i) => {
        setIncidents(i);
        if (i.length > 0) {
          setActualIndex(0);
        }
      })
      .catch((err) => {
        console.warn('Cannot fetch trigger locations', err);
      })
      .finally(() => setLoading(false));
  }, [triggersSeverity]);

  const next = () => {
    if (typeof actualIndex !== 'number') {
      return;
    }
    setActualIndex(actualIndex === incidents.length - 1 ? 0 : actualIndex + 1);
  };

  const prev = () => {
    if (typeof actualIndex !== 'number') {
      return;
    }
    setActualIndex(actualIndex === 0 ? incidents.length - 1 : actualIndex - 1);
  };

  const actual: Partial<Incident> = typeof actualIndex === 'number' ? incidents[actualIndex] : {};

  return (
    <Card>
      <Text center bold>
        Trigger Location Map
      </Text>

      <Space margin={10} />
      <View style={styles.mapContainer}>
        {loading && <ActivityIndicator color='grey' />}
        {!loading && (
          <>
            {!actual.trigger?.location && (
              <Image style={styles.noTriggerImage} source={require('./assets/NoTriggerLocation_Image.png')} />
            )}
            {actual.trigger?.location && (
              <WebView
                androidHardwareAccelerationDisabled={true}
                style={styles.mapView}
                source={{
                  uri: `https://maps.googleapis.com/maps/api/staticmap?center=&zoom=16&scale=2&size=425x425&maptype=roadmap&key=CHANGEIT&format=png&visual_refresh=true&markers=size:mid%7Ccolor:0xff0000%7Clabel:%7C${actual.trigger?.location.lat},+${actual.trigger.location.long}`,
                }}
              />
            )}
          </>
        )}
      </View>
      <Space />

      <View style={styles.buttonContainer}>
        <Button
          disabled={loading || typeof actualIndex !== 'number'}
          horizontalButtonPadding={10}
          onPress={() => next()}>
          PREV
        </Button>
        <Button
          disabled={loading || typeof actualIndex !== 'number'}
          horizontalButtonPadding={10}
          onPress={() => prev()}>
          NEXT
        </Button>
      </View>

      <Space />
      <View style={styles.severityContainer}>
        <Text>Trigger Severity:</Text>
        {!actual && <Text italic> {loading ? 'Loading...' : 'No triggers'}</Text>}
        {actual && (
          <Text style={[styles.severity, severityOf(actual?.trigger?.severity || 0)]}>{actual.trigger?.severity}</Text>
        )}
      </View>

      <Space />
      <View style={styles.dateContainer}>
        <Text>Trigger Date:{'  '}</Text>
        {!actual && <Text italic> {loading ? 'Loading...' : 'No triggers'}</Text>}
        {actual && <Text>{moment(actual?.trigger?.created).format('H:mm A MM/DD/yyyy')}</Text>}
      </View>
    </Card>
  );
};
