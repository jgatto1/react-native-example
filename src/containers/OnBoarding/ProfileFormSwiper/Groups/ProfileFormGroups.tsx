import { ActivityIndicator, Pressable, Switch, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useProfileFormGroupsStyles } from './ProfileFormGroups.styles';
import { Text } from 'components';
import { ProfileInterestGroup } from 'containers/OnBoarding/ProfileFormSwiper/context/model';
import { useProfileForm } from 'containers/OnBoarding/ProfileFormSwiper/context/ProfileFormContext';
import { SVG } from './assets';
import { useTheme } from 'providers/theme/ThemeProvider';
import { BackendClient } from 'service/backend-client.service';
import { F, Res, validateResponse } from 'model/backend';

declare type InterestGroupsRes = Res<F<'interest_groups', ProfileInterestGroup[]>>;

export const fetchGroups = () => {
  return BackendClient.get<InterestGroupsRes>('/interest_groups')
    .then(validateResponse)
    .then((data) => {
      return data.interest_groups;
    });
};

interface InterestGroupsData {
  groupsError?: boolean;
  loadingGroups: boolean;
  groups?: ProfileInterestGroup[];
  reloadGroups: () => void;
}

export const useInterestGroups = (): InterestGroupsData => {
  const [groups, setGroups] = useState<ProfileInterestGroup[]>();
  const [loadingGroups, setLoadingGroups] = useState(true);
  const [groupsError, setError] = useState<boolean>();
  const [tryCount, setTryCount] = useState(0);

  useEffect(() => {
    fetchGroups()
      .then((newGroups) => setGroups(newGroups))
      .catch((err) => {
        console.warn('Cannot load groups', err);
        setError(true);
      })
      .finally(() => setLoadingGroups(false));
  }, [tryCount]);

  return { groups, loadingGroups, groupsError, reloadGroups: () => setTryCount(tryCount + 1) };
};

export const ProfileFormGroupsContainer = () => {
  const form = useProfileForm();

  return (
    <ProfileFormGroups
      isPublic={form.groupsPublic}
      switchPublic={() => form.switchGroupsPublic()}
      setGroups={(newGroups) => form.setGroups(newGroups)}
      selected={form.groups || []}
    />
  );
};

interface ProfileFormGroupsProps {
  isPublic: boolean | undefined;
  switchPublic: () => void;
  setGroups: (groups: ProfileInterestGroup[]) => void;
  selected?: ProfileInterestGroup[];
  hideDescription?: boolean;
  alternativeLayout?: boolean;
}

export const ProfileFormGroups: React.VFC<ProfileFormGroupsProps> = (props) => {
  const styles = useProfileFormGroupsStyles();
  const theme = useTheme();

  const data = useInterestGroups();

  const groups = data.groups;
  const error = data.groupsError;
  const loading = data.loadingGroups;

  return (
    <View style={[styles.root, props.alternativeLayout ? styles.rootAlt : {}]}>
      {!props.hideDescription && (
        <>
          <View style={styles.textContainer}>
            <Text style={styles.optionalText}>Optional</Text>
          </View>
          <View style={styles.textContainer}>
            <Text>
              Tap a Special Interest Group to join it. Decide if you want groups to appear in your public profile.
              Change your choice any time in settings
            </Text>
          </View>
        </>
      )}
      <View style={[styles.textContainer, styles.groupsContainer]}>
        {error && (
          <Text onPress={() => data.reloadGroups()} style={styles.error}>
            Cannot fetch groups. Try again
          </Text>
        )}
        {!error && loading && <ActivityIndicator color={'grey'} />}
        {!error && !loading && !!groups?.length && (
          <Groups
            altLayout={props.alternativeLayout}
            groups={groups}
            selected={props.selected}
            setGroups={(newGroups) => props.setGroups(newGroups)}
          />
        )}
      </View>
      <View style={[styles.publicSwitchContainer, props.alternativeLayout ? styles.publicSwitchContainerAlt : {}]}>
        <Text style={styles.publicSwitchText}>Make My Special Interest Groups Public</Text>
        <Switch
          accessibilityRole='button'
          trackColor={{ true: theme.main.palette.primary }}
          value={props.isPublic}
          onValueChange={() => props.switchPublic()}
          style={styles.publicSwitch}
        />
      </View>
    </View>
  );
};

interface GroupsProps {
  groups: ProfileInterestGroup[];
  setGroups: (groups: ProfileInterestGroup[]) => void;
  selected?: ProfileInterestGroup[];
  altLayout?: boolean;
}

const Groups: React.VFC<GroupsProps> = (props) => {
  const styles = useProfileFormGroupsStyles();

  const selected = new Set(props.selected?.map((group) => group.id) || []);

  const selectorOf = (group: ProfileInterestGroup) => (isSelected: boolean) => {
    if ((isSelected && selected.has(group.id)) || (!isSelected && !selected.has(group.id))) {
      return;
    }
    const base = props.selected || [];
    const updatedGroups = isSelected ? [...base, group] : base.filter(({ id }) => id !== group.id);
    props.setGroups(updatedGroups);
  };

  return (
    <View style={[styles.groupsButtonsContainer, props.altLayout ? styles.groupsContainerAlt : {}]}>
      {props.groups.map((group) => (
        <Group isSelected={selected.has(group.id)} key={group.id} group={group} onChange={selectorOf(group)} />
      ))}
    </View>
  );
};

interface GroupProps {
  group: ProfileInterestGroup;
  onChange: (selected: boolean) => void;
  isSelected?: boolean;
}

const Group: React.VFC<GroupProps> = ({ isSelected, group, onChange }) => {
  const styles = useProfileFormGroupsStyles();

  const onPress = () => {
    onChange(!isSelected);
  };

  return (
    <Pressable onPress={onPress} style={[styles.groupButton, isSelected && styles.groupButtonSelected]}>
      <View style={styles.groupButtonIcon}>{isSelected ? <SVG.Unselect /> : <SVG.Select />}</View>
      <Text style={styles.groupButtonText}>{group.name}</Text>
    </Pressable>
  );
};
