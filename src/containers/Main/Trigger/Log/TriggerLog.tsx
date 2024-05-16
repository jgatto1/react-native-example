import { Pressable, ScrollView, View } from 'react-native';
import React, { createRef, useCallback, useState } from 'react';
import { useTriggerLogStyles } from './TriggerLog.styles';
import { Button, Text } from 'components';
import { Space } from 'components/Space/Space';
import { Picker, PickerRef } from 'components/Picker/Picker';
import { SVG } from './assets';
import moment from 'moment';
import { DEFAULT, LABELED, LabeledTags } from 'containers/Main/Trigger/shared/CustomizePrep/TriggerCustomizePrep.tags';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { BackendClient } from 'service/backend-client.service';
import { validateResponse } from 'model/backend';
import { TriggerPrepRes } from 'model/backend/trigger-prep';
import Geolocation, { GeolocationResponse } from '@react-native-community/geolocation';
import { Topic } from 'model/backend/topic';
import { fetchTopic } from 'containers/Main/Home/CohortTopic.context';
import { useSession } from 'providers/session/SessionProvider';
import { TriggerIncidentCreate, TriggerIncidentRes } from 'model/backend/trigger-incident';
import { TriggerLogRoutes } from 'containers/Main/Trigger/Log/TriggerLog.routes';
import { TriggerCustomizePrepTag } from 'containers/Main/Trigger/shared/CustomizePrep/Tag/TriggerCustomizePrepTag';
import { showAlertIfNetworkError } from 'providers/error.alert';

const LEVELS = [
  { key: 5, label: 'Level 5 (intense)' },
  { key: 4, label: 'Level 4' },
  { key: 3, label: 'Level 3' },
  { key: 2, label: 'Level 2' },
  { key: 1, label: 'Level 1 (mild)' },
].map((level, value) => ({ ...level, value }));

const tagsOfUser = (userTags: string[]) => {
  const userTagsSet = new Set(userTags);
  return ({ label, labelTags }: LabeledTags) => {
    return {
      label,
      labelTags: labelTags.filter((tag) => userTagsSet.has(tag)),
    };
  };
};

const MAX_GEO_AGE_MS = 5 * 60 * 1000; // 5 minutes

export const TriggerLog: React.VFC = () => {
  const styles = useTriggerLogStyles();
  const navigation = useNavigation();
  const session = useSession();
  const cohortId = session.data?.user.cohort.id;

  const [level, setLevel] = useState<number>();
  const levelPicker = createRef<PickerRef>();
  const [triggers, setTriggers] = useState<string[]>([]);
  const [userTags, setUserTags] = useState<LabeledTags[]>([]);
  const [geoPos, setGeoPos] = useState<GeolocationResponse>();
  const [geoDisclaimer, setGeoDisclaimer] = useState<boolean>();
  const [currTopic, setCurrentTopic] = useState<Topic>();
  const [creating, setCreating] = useState<boolean>(false);

  useFocusEffect(useCallback(() => setLevel(undefined), []));

  const supplyGeo = async (): Promise<GeolocationResponse | undefined> => {
    if (geoPos && geoPos.coords && new Date().getTime() - geoPos.timestamp <= MAX_GEO_AGE_MS) {
      return geoPos;
    }
    return new Promise((resolve) => {
      Geolocation.getCurrentPosition(
        (res) => {
          setGeoPos(res);
          resolve(res);
        },
        (err) => {
          console.warn('User not allow to get Geo Position', err, geoDisclaimer);
          setGeoDisclaimer(true);
          return resolve(undefined);
        },
        {
          timeout: 5000,
        }
      );
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      supplyGeo().catch(() => console.warn('Cannot fetch geo pos.'));
      BackendClient.get<TriggerPrepRes>('/trigger_prep')
        .then(validateResponse)
        .then((res) => {
          if (!res.trigger_prep) {
            return;
          }
          const resTags: LabeledTags[] = LABELED.map(tagsOfUser(res.trigger_prep.tags || [])).filter(
            ({ labelTags }) => !!labelTags.length
          );
          setUserTags(resTags);
        })
        .catch((err) => {
          console.warn('Cannot load users trigger preps', err);
        });
      if (!cohortId) {
        return;
      }
      fetchTopic(cohortId)
        .then((res) => {
          if (!res.currentEvent.noEvent) {
            setCurrentTopic(res.currentEvent.topic);
          }
        })
        .catch((err) => {
          console.warn('Cannot fetch curr topic to log a trigger. Using null topic', err);
        });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [geoPos, cohortId])
  );

  const handleChangeFor = (trigger: string) => (selected: boolean) => {
    const updated = triggers.filter((t) => t !== trigger);
    setTriggers([...updated, ...(selected ? [trigger] : [])]);
  };

  const triggersStyleFor = (list: string[]) => {
    return [styles.triggers, list.length === 1 && styles.triggers1, list.length === 2 && styles.triggers2];
  };

  const logIt = async () => {
    if (!level) {
      return;
    }
    setCreating(true);
    const finalGeoPos = await supplyGeo();
    const data: TriggerIncidentCreate = {
      location: finalGeoPos && { lat: finalGeoPos.coords.latitude, long: finalGeoPos.coords.longitude },
      severity: LEVELS[level].key,
      tags: triggers.length ? triggers : [''],
      topic_id: currTopic?.id,
    };
    BackendClient.post<TriggerIncidentRes>('/trigger_incident/create', data)
      .then(validateResponse)
      .then((res) => {
        navigation.navigate(TriggerLogRoutes.NEXT_STEPS, { incident: res.trigger_incident });
      })
      .catch((err) => {
        showAlertIfNetworkError(err);
        console.warn('Cannot log trigger', err);
      })
      .finally(() => setCreating(false));
  };

  return (
    <>
      <ScrollView style={styles.root}>
        <Space />
        <Text italic size={20} style={styles.title}>
          Trigger on {moment().format('MM/DD/yy h:mm A')}
        </Text>
        <Space margin={10} />
        <Text bold>1. PICK THE TRIGGER SEVERITY LEVEL</Text>
        <Space margin={10} />
        <Pressable style={styles.levelSelector} onPress={() => levelPicker.current?.open()}>
          <Text style={styles.levelSelectorText}>
            {level !== undefined ? LEVELS[level].label : 'Select Severity Level'}
          </Text>
          <SVG.Expand width={30} height={30} fill={styles.levelSelectorSVG.color} />
        </Pressable>
        <Space margin={10} />
        <Text bold>2. DESCRIBE YOUR TRIGGER</Text>
        <Space margin={10} />

        <Text bold center>
          Choose Your Triggers
        </Text>
        <View style={triggersStyleFor(DEFAULT)}>
          {DEFAULT.map((trigger) => (
            <React.Fragment key={trigger}>
              <TriggerCustomizePrepTag key={trigger} label={trigger} onChange={handleChangeFor(trigger)} />
              <Space horizontal />
            </React.Fragment>
          ))}
        </View>
        {userTags.map(({ label, labelTags }, index) => (
          <View key={index}>
            <Space margin={10} />
            <Text bold center>
              {label} Triggers
            </Text>
            <View style={triggersStyleFor(labelTags)}>
              {labelTags.map((trigger, indexTag) => (
                <React.Fragment key={`${index}-${label}-${trigger}-${indexTag}`}>
                  <TriggerCustomizePrepTag
                    small
                    key={`${index}-${label}-${trigger}-${indexTag}`}
                    label={trigger}
                    onChange={handleChangeFor(trigger)}
                  />
                  <Space />
                </React.Fragment>
              ))}
            </View>
          </View>
        ))}
        <Space margin={10} />
        {/*geoDisclaimer && ( // wont delete this maybe we have to add it again
          <>
            <Space />
            <Pressable
              onPress={() => (Platform.OS === 'ios' ? Linking.openURL('app-settings:') : Linking.openSettings())}>
              <Text italic center size={10}>
                To allow most accurate trigger you must enable permission to get your location.
              </Text>
              <View style={styles.geoDisclaimerContainer}>
                <Text italic center size={10}>
                  Press here to open settings{' '}
                </Text>
                <SVG.Settings fill='grey' width={10} height={10} />
              </View>
            </Pressable>
            <Space margin={10} />
          </>
        )*/}
        <View style={styles.nextButtons}>
          <Button loading={creating} disabled={typeof level !== 'number'} style={styles.button} onPress={() => logIt()}>
            LOG IT & GET NEXT STEPS
          </Button>
          <Space margin={10} />
          <Button style={styles.button} onPress={() => navigation.navigate(TriggerLogRoutes.PREPARE)}>
            CHANGE YOUR TRIGGER TAGS
          </Button>
        </View>
      </ScrollView>
      <Picker
        ref={levelPicker}
        items={LEVELS}
        onDone={(selected) => {
          console.log('Selected', selected);
          typeof selected === 'number' && setLevel(selected as number);
        }}
      />
    </>
  );
};
