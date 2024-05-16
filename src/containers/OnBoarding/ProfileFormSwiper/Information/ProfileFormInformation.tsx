import { View } from 'react-native';
import { Text } from 'components';
import React from 'react';
import { useProfileFormInformationStyles } from './ProfileFormInformation.styles';
import { TextInput } from 'components/TextInput/TextInput';
import { useProfileForm } from '../context/ProfileFormContext';
import { ProfileInformation } from '../context/model';

const DEFAULT_PROFILE_INFORMATION: ProfileInformation = {
  firstName: '',
  lastName: '',
  publicName: '',
};

export const ProfileFormInformation: React.VFC = () => {
  const styles = useProfileFormInformationStyles();

  const { info, setInfo } = useProfileForm();

  const definedInfo = { ...DEFAULT_PROFILE_INFORMATION, ...info };

  const setOf = (key: keyof ProfileInformation) => (value: string) => {
    const newInfo = { ...info, [key]: value };
    setInfo(newInfo);
  };

  return (
    <View style={styles.root}>
      <View style={styles.textContainer}>
        <Text>Your public display name will be visible to other app members</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='First Name'
          placeholderTextColor='grey'
          editable={false}
          onChangeText={setOf('firstName')}
          value={definedInfo.firstName}
        />
        <TextInput
          placeholder='Last Name'
          placeholderTextColor='grey'
          editable={false}
          onChangeText={setOf('lastName')}
          value={definedInfo.lastName}
        />
        <TextInput
          autoFocus
          maxLength={15}
          placeholder='Public Display Name'
          placeholderTextColor='grey'
          onChangeText={setOf('publicName')}
          value={definedInfo.publicName}
        />
      </View>
    </View>
  );
};
