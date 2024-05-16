import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, View } from 'react-native';
import React, { useState } from 'react';
import { useSafetyPlanExportStyles } from './SafetyPlanExport.styles';
import { Button, Card, Text, TextInput } from 'components';
import { Space } from 'components/Space/Space';
import { SafetyPlanExportModal } from 'containers/Main/Safety/Plan/Export/Modal/SafetyPlanExportModal';
import { Res, validateResponse } from 'model/backend';
import { useNavigation } from '@react-navigation/native';
import { SafetyPlanRoutes } from 'containers/Main/Safety/Plan/SafetyPlan.routes';
import * as EmailValidator from 'email-validator';
import { BackendClient } from 'service/backend-client.service';
import { useTheme } from 'providers/theme/ThemeProvider';
import { showAlertIfNetworkError } from 'providers/error.alert';

export const SafetyPlanExport: React.VFC = () => {
  const styles = useSafetyPlanExportStyles();
  const navigation = useNavigation();
  const theme = useTheme();

  const [toInputs, setToInputs] = useState<string[]>([]);
  const [newEmail, setNewEmail] = useState<string>('');
  const [something, setSomething] = useState<string>('');
  const [sending, setSending] = useState(false);

  const [visibleModal, setVisibleModal] = useState(false);

  const addTo = () => {
    setToInputs([...toInputs, newEmail]);
    setNewEmail('');
  };

  const sendEmail = () => {
    if (toInputs.length === 0) {
      return;
    }
    setSending(true);

    const data = {
      message: something,
      email_addresses: toInputs,
    };

    BackendClient.post<Res>('/safety_plan/email', data)
      .then(validateResponse)
      .catch((err) => {
        showAlertIfNetworkError(err);
        console.warn('Cannot export plan', err);
      })
      .then(() => setVisibleModal(true))
      .finally(() => {
        setSending(false);
      });
  };

  return (
    <View style={styles.root}>
      <SafeAreaView>
        <SafetyPlanExportModal
          visible={visibleModal}
          onPressOk={() => {
            setVisibleModal(false);
            navigation.navigate(SafetyPlanRoutes.MENU);
          }}
        />
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'position' : 'height'} keyboardVerticalOffset={50}>
          <ScrollView>
            <View style={styles.body}>
              <Card style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text weight='bold'>Export Safety Plan</Text>
                </View>
                <Space />
                <Text size={16} style={styles.exportDescription}>
                  Your report will be sent with your actual email address so the recipient will know who this is from.
                  If your email address is not clear to the recipient, such as not showing your name, please let the
                  person know your email address outside of the app.
                </Text>
                <Space margin={10} />
                <Text style={{ lineHeight: 23 }} align='left'>
                  To add an email to your list of recipients, hit the <Text weight='600'>CONFIRM</Text> button below
                </Text>
                <Space />
                <View style={styles.toContainer}>
                  <Text weight='bold' size={12}>
                    To:
                  </Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.toInputs}>
                    {toInputs.map((to, index) => (
                      <View key={index} style={styles.toChip}>
                        <Text size={10}>{to}</Text>
                      </View>
                    ))}
                  </ScrollView>
                </View>
                <Space margin={2} />
                <TextInput
                  placeholderTextColor={theme.main.palette.other.login.placeholder}
                  autoCapitalize={'none'}
                  placeholder='Add new email'
                  value={newEmail}
                  onChangeText={(email) => setNewEmail(email)}
                />
                <Space />
                <View style={styles.buttonContainer}>
                  <Button disabled={!EmailValidator.validate(newEmail)} onPress={() => addTo()}>
                    CONFIRM
                  </Button>
                </View>
                <Space margin={15} />

                <Text style={styles.addMessageText} size={15} weight='bold'>
                  Add message:
                </Text>
                <Space />
                <TextInput
                  placeholderTextColor={theme.main.palette.other.login.placeholder}
                  placeholder='Write something...'
                  value={something}
                  onChangeText={(s) => setSomething(s)}
                />
                <Space />
                <View style={styles.buttonContainer}>
                  <Button disabled={toInputs.length === 0} loading={sending} onPress={() => sendEmail()}>
                    SEND
                  </Button>
                </View>
              </Card>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};
