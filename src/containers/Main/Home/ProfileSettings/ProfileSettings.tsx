import { Image, ImageSourcePropType, Linking, Pressable, SafeAreaView, ScrollView, View } from 'react-native';
import React, { ReactNode, useCallback, useState } from 'react';
import { useProfileSettingsStyles } from './ProfileSettings.styles';
import { Button, Card, Checkbox, Text } from 'components';
import { useSession } from 'providers/session/SessionProvider';
import { TextLink } from 'components/Text/TextLink';
import { EMOJIS } from 'containers/OnBoarding/ProfileFormSwiper/About/assets';
import { SVG } from './assets';
import { AnimatedTextInput } from 'components/TextInput/TextInput';
import { Space } from 'components/Space/Space';
import { useTheme } from 'providers/theme/ThemeProvider';
import { RadioButtons } from 'components/RadioButtons/RadioButtons';
import { Divider } from 'components/Divider/Divider';
import DeviceInfo from 'react-native-device-info';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { ProfileSettingsRoutes } from 'containers/Main/Home/ProfileSettings/ProfileSettings.routes';
import { BackendClient } from 'service/backend-client.service';
import { User } from 'model/backend/login';
import { F, Res, validateResponse } from 'model/backend';
import { UserSettings } from 'model/backend/user.settings';
import Dropdown from 'components/Dropdown';
import Purchases from 'react-native-purchases';
import { ContactValidResult, LoginValidator, Type } from 'containers/Login/validator/email.validator';
import { InputLoginType, useCodeValidator } from '@hooks/code-validator.hook';
import { ValidationCodeModal } from 'components/ValidationCodeModal/ValidationCodeModal';
import { calculateInputLoginType } from 'containers/Login/utils/auth.utils';
import Icons from '../../assets';

interface CheckData {
  email: boolean;
  push: boolean;
}

interface ChecksData {
  [key: string]: Partial<CheckData>;
}

interface Notification extends Partial<CheckData> {
  key: string;
  name: string | ReactNode;
  select?: {
    actual: number;
    changeState: React.Dispatch<React.SetStateAction<number>>;
    before: string;
    after: string;
  };
}

export const ProfileSettings: React.VFC = () => {
  const styles = useProfileSettingsStyles();

  const { data, updateUserData, logout } = useSession();
  const { post, onClose, showValidationModal, msg } = useCodeValidator();
  const theme = useTheme();
  const navigation = useNavigation();

  const [safetyCheckDays, setSafetyCheckDays] = useState(
    data?.user.settings.notification_settings.safety_check_in_reminder_days ?? 5
  );

  const [talkToSelfDays, setTalkToSelfDays] = useState(
    data?.user.settings.notification_settings.talk_to_safe_self_reminder_days ?? 5
  );

  // TODO: I'm not sure why we have this focus effect, I'll keep it for not breaking something
  useFocusEffect(
    useCallback(() => {
      setSafetyCheckDays(data?.user.settings.notification_settings.safety_check_in_reminder_days ?? 5);
      setTalkToSelfDays(data?.user.settings.notification_settings.talk_to_safe_self_reminder_days ?? 5);
    }, [
      data?.user.settings.notification_settings.safety_check_in_reminder_days,
      data?.user.settings.notification_settings.talk_to_safe_self_reminder_days,
    ])
  );

  const [doingLogout, setDoingLogout] = useState(false);

  const initialChecks = Object.entries(data?.user.settings.notification_settings || {})
    .map(([key, value]) => ({ key, value }))
    .filter(({ key }) => key.includes('_email') || key.includes('_notification'))
    .reduce((acc, act) => {
      const emailSplit = act.key.split('_email');
      const pushSplit = act.key.split('_notification');
      const key = emailSplit.length > 1 ? emailSplit[0] : pushSplit[0];
      const type = emailSplit.length > 1 ? 'email' : 'push';
      // @ts-ignore
      return { ...acc, [key]: { ...(acc[key] || {}), [type]: act.value } };
    }, {});
  const [check, setCheck] = useState<ChecksData>(initialChecks);

  const [postVisibility, setPostVisibility] = useState(0);
  const [updatingPostVisibility, setUpdatingPostVisibility] = useState(false);

  const [updatingNotifications, setUpdatingNotifications] = useState(false);

  const updatePostVisibility = () => {
    const userId = data?.user.uuid;
    if (!userId) {
      return;
    }
    setUpdatingPostVisibility(true);
    const reqData: Partial<UserSettings> = { share_with_all: postVisibility === 0 };
    BackendClient.put<Res<F<'user', User>>>(`/user/${userId}/settings`, reqData)
      .then(validateResponse)
      .then((resData) => resData.user && updateUserData(resData.user))
      .catch((err) => {
        console.warn('Cannot update post visibility', err);
      })
      .finally(() => setUpdatingPostVisibility(false));
  };

  const [updatingProfileInfo, setUpdatingProfileInfo] = useState(false);
  const [displayName, setDisplayName] = useState(data?.user?.settings.display_name || '');
  const [email, setEmail] = useState(data?.user?.email || '');
  const [phone, setPhone] = useState(data?.user?.cell_phone || '');
  const [emailError, setEmailError] = useState(false);
  const [cellPhoneError, setCellPhoneError] = useState(false);
  const [changeEmailPhoneSameTime, setChangeEmailPhoneSameTime] = useState(false);
  const [contact, setContact] = useState<ContactValidResult>();
  const [nameError, setNameError] = useState(false);

  const updateCommonUserData = async (userId: string) => {
    const reqData: Partial<UserSettings> = { display_name: displayName };
    return BackendClient.put<Res<F<'user', User>>>(`/user/${userId}/settings`, reqData)
      .then(validateResponse)
      .then((resData) => resData.user && updateUserData(resData.user))
      .catch((err) => {
        console.warn('Cannot update profile information', err);
      })
      .finally(() => setUpdatingProfileInfo(false));
  };

  const updateProfileInfo = () => {
    const userId = data?.user.uuid;
    if (!userId || displayName.length < 3) {
      setNameError(true);
      return;
    }
    setUpdatingProfileInfo(true);
    const updateNameData = async () => {
      // if the logged user email/phone is different from the new one => call the api to update and validate it
      // the same for the cell phone
      let cellPhoneChanged = false;
      let emailChanged = false;
      if (!data?.user.cell_phone) {
        if (phone) {
          cellPhoneChanged = true;
        }
      } else {
        cellPhoneChanged = data.user.cell_phone !== phone;
      }

      if (!data?.user.email) {
        if (email) {
          emailChanged = true;
        }
      } else {
        emailChanged = data.user.email !== email;
      }
      console.debug('data.user.email !== email', data?.user.email, email);
      console.debug('data.user.cell_phone !== cell_phone', data?.user.cell_phone, '-', phone);
      if (cellPhoneChanged && emailChanged) {
        setChangeEmailPhoneSameTime(true);
        return;
      } else {
        setChangeEmailPhoneSameTime(false);
      }
      if (cellPhoneChanged || emailChanged) {
        // validate if the contact is valid
        const contactRes = emailChanged ? LoginValidator.isEmail(email) : LoginValidator.isPhone(phone);
        if (!contactRes) {
          emailChanged ? setEmailError(true) : setCellPhoneError(true);
          return;
        }
        setContact(contactRes);
        console.debug('cellphone or mobile changed');
        const emailPhoneResponse = await post('/update_settings', {
          ...(emailChanged && { [InputLoginType.EMAIL]: email }),
          ...(cellPhoneChanged && { [InputLoginType.CELL_PHONE]: phone }),
        });
        console.debug('response emailPhoneResponse', emailPhoneResponse);
      } else {
        // are equals. So update the other values right now
        await updateCommonUserData(userId);
      }
    };
    updateNameData()
      .catch(() => console.warn('Ignore Update Profile Data data'))
      .finally(() => setUpdatingProfileInfo(false));
  };
  const validateSignupCode = async (code: string) => {
    if (!code || code.length !== 4) {
      return;
    }
    const dataValidated = await post(
      '/update_settings',
      {
        [calculateInputLoginType(contact?.type as Type)]: contact?.type === 'EMAIL' ? email : phone,
      },
      code
    );
    if (dataValidated) {
      // if the code is valid update the remaining user data and set it.
      // Note: This new user data will contain the updated email/phone
      const userId = data?.user.uuid;
      await updateCommonUserData(userId as string);
    }
  };
  const doLogout = async () => {
    setDoingLogout(true);
    if (data?.fcmToken) {
      await BackendClient.delete<Res>('/fcm_registration_token/remove', {
        params: { fcm_registration_token: data.fcmToken },
      }).catch((err) => console.warn('Cannot delete fcm token', err));
    }
    BackendClient.get<Res>('/logout', { validateStatus: () => true })
      .then((res) => {
        if (res.data.status === 'ok' || res.data.error === 'nobody to logout') {
          logout();
        } else {
          throw new Error(res.data.error || JSON.stringify(res.data));
        }
      })
      .catch((err) => console.warn('Cannot logout', err))
      .finally(() => setDoingLogout(false));
    Purchases.logOut().catch((err) => console.warn('cannot logout revenue cat', err));
  };

  const silenceAll = () => setCheck({});

  const user = data?.user;
  if (!user) {
    return (
      <View>
        <Text>No user</Text>
      </View>
    );
  }
  const avatarSource: ImageSourcePropType = user?.settings.avatar_url_512
    ? {
        width: 80,
        height: 80,
        uri: user.settings.avatar_url_512,
      }
    : require('./assets/avatar.default.png');

  const notifications: Notification[] = [
    {
      key: 'safety_check_in_reminder',
      name: 'Safety Check In reminder',
      ...check.safety_check_in_reminder,
      select: {
        actual: safetyCheckDays,
        changeState: setSafetyCheckDays,
        before: 'Remind me after',
        after: 'days of inactivity',
      },
    },
    { key: 'meeting_reminder', name: 'Reminder for Weekly meeting', ...check.meeting_reminder },
    { key: 'trigger_prep_event', name: 'Prepare for a Trigger', ...check.trigger_prep_event },
    {
      key: 'help_cope',
      name: (
        <Text size={12}>
          Help me Cope message from <Text italic>Seeking Safety</Text> Group Member
        </Text>
      ),
      ...check.help_cope,
    },
    { key: 'weekly_commitment_reminder', name: 'Weekly Commitment reminder', ...check.weekly_commitment_reminder },
    {
      key: 'talk_to_safe_self_reminder',
      name: 'Talk to Safe Self reminder',
      ...check.talk_to_safe_self_reminder,
      select: {
        actual: talkToSelfDays as number,
        changeState: setTalkToSelfDays,
        before: 'Send every',
        after: 'days',
      },
    },
    { key: 'boomerang_message', name: 'Boomerang message', ...check.boomerang_message },
    {
      key: 'direct_message_from_leader',
      name: (
        <Text size={12}>
          Direct message from <Text italic>Seeking Safety</Text> Group Leader
        </Text>
      ),
      ...check.direct_message_from_leader,
    },
    {
      key: 'direct_message_from_member',
      name: (
        <Text size={12}>
          Direct message from <Text italic>Seeking Safety</Text> Group Member
        </Text>
      ),
      ...check.direct_message_from_member,
    },
    {
      key: 'comment_on_social_feed_post',
      name: 'Response to my Social Feed post',
      ...check.comment_on_social_feed_post,
    },
    { key: 'new_weekly_topic', name: 'New Weekly Topic', ...check.new_weekly_topic },
  ];

  const updateNotifications = () => {
    const userId = data?.user.uuid;
    if (!userId) {
      return;
    }
    const notificationSettings = notifications.reduce((acc, actual) => {
      const emailKey = `${actual.key}_email`;
      const pushKey = `${actual.key}_notification`;
      return { ...acc, [emailKey]: !!actual.email, [pushKey]: !!actual.push };
    }, {});
    const reqData = {
      notification_settings: {
        ...notificationSettings,
        safety_check_in_reminder_days: safetyCheckDays,
        talk_to_safe_self_reminder_days: talkToSelfDays,
      },
    };
    setUpdatingNotifications(true);
    BackendClient.put<Res<F<'user', User>>>(`/user/${userId}/settings`, reqData)
      .then(validateResponse)
      .then((resData) => resData.user && updateUserData(resData.user))
      .catch((err) => {
        console.warn('Cannot update profile notifications', err);
      })
      .finally(() => setUpdatingNotifications(false));
  };

  const switchCheck = (type: 'email' | 'push') => (key: string) => (value: boolean | undefined) => {
    check[key] = { ...check[key], [type]: value };
    setCheck({ ...check });
  };

  const checkEmailOf = switchCheck('email');

  const checkPushOf = switchCheck('push');

  const NotificationView: React.VFC<{ n: Notification; lastElem: boolean }> = ({ n, lastElem }) => (
    <View style={[!lastElem ? styles.notification : styles.notificationLastElem]}>
      <View style={styles.notificationContainer}>
        <View style={[styles.notificationNameFlex]}>
          {typeof n.name === 'string' ? <Text size={12}>{n.name}</Text> : n.name}
        </View>
        <View style={[styles.notificationEmailCheckFlex]}>
          <Checkbox
            isChecked={n.email || false}
            // bounceFriction={100000}
            // size={35}
            // iconStyle={n.email ? styles.notificationCheck : styles.notificationUncheck}
            // iconComponent={n.email ? <SVG.Checkmark /> : null}
            // fillColor={theme.main.palette.accent}
            onPress={checkEmailOf(n.key)}
          />
        </View>
        <View style={[styles.notificationPushCheckFlex]}>
          <Checkbox
            isChecked={n.push || false}
            // bounceFriction={100000}
            // size={35}
            // iconStyle={n.push ? styles.notificationCheck : styles.notificationUncheck}
            // iconComponent={n.push ? <SVG.Checkmark /> : null}
            // fillColor={theme.main.palette.accent}
            onPress={checkPushOf(n.key)}
          />
        </View>
      </View>
      {n.select && (
        <>
          <Space />
          <View style={styles.notificationReminder}>
            <Text size={11}>{n.select.before}</Text>
            <Space horizontal margin={3} />
            <View style={{ display: 'flex', width: '15%' }}>
              <Dropdown
                data={[
                  { value: 5, label: '5' },
                  { value: 4, label: '4' },
                  { value: 3, label: '3' },
                  { value: 2, label: '2' },
                  { value: 1, label: '1' },
                ]}
                placeholder={typeof n.select.actual !== 'number' ? 'Select' : '' + n.select.actual}
                onChange={(selected) =>
                  typeof selected.value === 'number' && n.select?.changeState(selected.value as number)
                }
              />
            </View>
            <Space horizontal margin={3} />
            <Text size={11}>{n.select.after}</Text>
          </View>
        </>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.root}>
      <ValidationCodeModal
        onClose={onClose}
        modalVisible={showValidationModal}
        contact={contact?.type as Type}
        validateCode={validateSignupCode}
        contactValue={contact?.type === 'EMAIL' ? (email as string) : (phone as string)}
        messages={msg}
      />
      <ScrollView style={styles.scrollView}>
        <Card plain style={styles.mainCard}>
          <View style={styles.cardResume}>
            <View>
              <Image width={25} height={25} source={avatarSource} />
            </View>
            <View style={styles.nameContainer}>
              <Text weight='bold'>{data?.name}</Text>
              <Text size={12} fontStyle='italic' style={styles.aboutMe}>
                {data?.user.settings.about_me_short}
              </Text>
            </View>
          </View>
          <View style={styles.cardActions}>
            <View style={styles.cardEditButtons}>
              <TextLink onPress={() => navigation.navigate(ProfileSettingsRoutes.PHOTO)}>Change Photo</TextLink>
              <TextLink onPress={() => navigation.navigate(ProfileSettingsRoutes.ABOUT_ME)}>Edit Profile</TextLink>
            </View>
            <View style={styles.cardBottom}>
              <Button noShadow loading={doingLogout} style={styles.logoutButton} onPress={() => doLogout()}>
                LOG OUT
              </Button>
              <View style={styles.emotionalEmojiContainer}>
                <Image style={styles.emotionalEmoji} source={EMOJIS[user.settings.emotional_status - 1]} />
              </View>
            </View>
          </View>
        </Card>

        <View style={styles.informationContainer}>
          <View style={styles.informationTitleContainer}>
            <SVG.Person fill={theme.main.palette.text.primary} />
            <Text weight='bold' style={styles.informationTitle}>
              Your information
            </Text>
          </View>
          <Space />
          <AnimatedTextInput
            placeholder='Name'
            error={nameError}
            style={styles.informationInput}
            value={displayName}
            onChangeText={(text) => {
              setDisplayName(text);
              setNameError(false);
            }}
          />
          {nameError && (
            <View style={styles.inputErrorContainer}>
              <Icons.AlertIcon width={15} height={15} fill={styles.inputErrorSVG.color} />
              <Space horizontal margin={2} />
              <Text size={12} style={styles.inputErrorText}>
                Invalid name
              </Text>
            </View>
          )}
          <Space />
          <AnimatedTextInput
            error={emailError}
            placeholder='Email'
            style={styles.informationInput}
            value={email}
            onChangeText={(text) => {
              setEmailError(false);
              setChangeEmailPhoneSameTime(false);
              setEmail(text);
            }}
          />
          {emailError && (
            <View style={styles.inputErrorContainer}>
              <Icons.AlertIcon width={15} height={15} fill={styles.inputErrorSVG.color} />
              <Space horizontal margin={2} />
              <Text size={12} style={styles.inputErrorText}>
                Invalid email
              </Text>
            </View>
          )}
          <Space />
          <AnimatedTextInput
            error={cellPhoneError}
            style={styles.informationInput}
            value={phone}
            placeholder='Phone'
            onChangeText={(text) => {
              setCellPhoneError(false);
              setChangeEmailPhoneSameTime(false);
              setPhone(text);
            }}
          />
          {cellPhoneError && (
            <View style={styles.inputErrorContainer}>
              <Icons.AlertIcon width={15} height={15} fill={styles.inputErrorSVG.color} />
              <Space horizontal margin={2} />
              <Text size={12} style={styles.inputErrorText}>
                Invalid Phone
              </Text>
            </View>
          )}
          {changeEmailPhoneSameTime && (
            <View style={styles.inputErrorContainer}>
              <Icons.AlertIcon width={15} height={15} fill={styles.inputErrorSVG.color} />
              <Space horizontal margin={2} />
              <Text size={12} style={styles.inputErrorText}>
                Cannot change the email and mobile phone at same time
              </Text>
            </View>
          )}
          <Space />
          <View style={styles.informationButton}>
            <Button
              loading={updatingProfileInfo}
              disabled={emailError || cellPhoneError || changeEmailPhoneSameTime}
              horizontalButtonPadding={10}
              onPress={() => updateProfileInfo()}>
              SAVE CHANGES
            </Button>
          </View>
        </View>

        <View>
          <Space />
          <View style={styles.notificationTitleContainer}>
            <View style={styles.informationTitleContainer}>
              <SVG.Notifications fill={theme.main.palette.text.primary} />
              <Text weight='bold' style={styles.informationTitle}>
                Notifications
              </Text>
            </View>
            <View>
              <Button onPress={() => silenceAll()}>SILENCE ALL</Button>
            </View>
          </View>
          <Space />
          <View style={[styles.notificationContainer, styles.notificationHeader]}>
            <View style={[styles.notificationNameFlex]}>
              <Text weight='bold' style={[styles.notificationNameHeader, styles.notificationNameTitle]}>
                Notification settings by feature
              </Text>
            </View>
            <Text
              weight='bold'
              style={[
                styles.notificationEmailCheckFlex,
                styles.notificationNameHeader,
                styles.notificationEmailHeader,
              ]}>
              Email
            </Text>
            <Text
              weight='bold'
              style={[styles.notificationPushCheckFlex, styles.notificationNameHeader, styles.notificationPushHeader]}>
              Notifications
            </Text>
          </View>

          {notifications.map((n, index) => (
            <NotificationView n={n} key={n.key} lastElem={index === notifications.length - 1} />
          ))}

          <Space />
          <View style={styles.informationButton}>
            <Button loading={updatingNotifications} horizontalButtonPadding={10} onPress={() => updateNotifications()}>
              SAVE CHANGES
            </Button>
          </View>

          <Space margin={15} />

          <View>
            <Text>My posts will be shared with:</Text>
            <Space />
            <RadioButtons
              onSelect={(value) => setPostVisibility(value)}
              items={[
                { label: 'Entire app community', value: 0 },
                {
                  label: (
                    <Text>
                      My <Text italic>Seeking Safety</Text> group
                    </Text>
                  ),
                  value: 1,
                },
              ]}
            />
            <Space />
            <View style={styles.informationButton}>
              <Button
                loading={updatingPostVisibility}
                horizontalButtonPadding={10}
                onPress={() => updatePostVisibility()}>
                SAVE CHANGES
              </Button>
            </View>
          </View>
          <Space />
          <Divider width={0.6} style={styles.divider} />
          <Space />
          <View style={styles.bottomInformation}>
            <Pressable onPress={() => Linking.openURL('mailto:support@treatment-innovations.org')}>
              <Text size={11}>Delete account (mailto: support@treatment-innovations.org)</Text>
            </Pressable>
            <Space margin={2} />
            <Text size={11}>Text or call 617-299-1670 or email</Text>
            <Space margin={2} />
            <Text size={11}>support@treatment-innovations.org</Text>
            <Space margin={5} />
            <View style={{ flexDirection: 'row' }}>
              <Pressable
                onPress={() =>
                  Linking.openURL('https://www.treatment-innovations.org/ss-app-terms-of-use-policy.html')
                }>
                <Text bold>Term of use</Text>
              </Pressable>
              <Text> - </Text>
              <Pressable
                onPress={() =>
                  Linking.openURL('https://www.treatment-innovations.org/ss-app-privacy-and-data-policy.html')
                }>
                <Text bold>Privacy Policy</Text>
              </Pressable>
            </View>
            <View style={styles.version}>
              <Text
                size={10}
                fontStyle={'italic'}>{`${DeviceInfo.getVersion()} (${DeviceInfo.getBuildNumber()})`}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
