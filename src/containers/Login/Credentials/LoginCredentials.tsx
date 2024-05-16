import { Button, Space, Text } from 'components';
import { ActivityIndicator, Animated, RecursiveArray, TextInput, TextStyle, View } from 'react-native';
import React, { useEffect } from 'react';
import ArrowSVG from '../assets/right-arrow.svg';
import { useLoginStyle } from 'containers/Login/Login.style';
import { useTheme } from 'providers/theme/ThemeProvider';

interface LoginCredentialsProps {
  initials: string;
  setInitials: (initials: string) => void;
  idNumber: string;
  setIdNumber: (num: string) => void;
  validInputs: boolean;
  logging: boolean;
  login: () => void;
  error: unknown;
}

export const LoginCredentials: React.VFC<LoginCredentialsProps> = (props) => {
  const styles = useLoginStyle();
  const theme = useTheme();
  const { error, login, initials, validInputs, setInitials, setIdNumber, idNumber, logging } = props;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const animation = new Animated.Value(0);

  useEffect(() => {
    if (!error) {
      return;
    }
    animation.setValue(0);
    Animated.timing(animation, {
      useNativeDriver: true,
      duration: 400,
      toValue: 3,
    }).start();
  }, [animation, error]);

  const interpolated = animation.interpolate({
    inputRange: [0, 0.5, 1, 1.5, 2, 2.5, 3],
    outputRange: [0, -10, 0, 10, 0, -10, 0],
  });
  const animatedStyle = {
    transform: [{ translateX: interpolated }],
  };

  return (
    <View style={styles.credentialsContainer}>
      <Text style={styles.inputLabel}>Study initials (4 letters)</Text>
      <Animated.View style={animatedStyle}>
        <TextInput
          placeholderTextColor={theme.main.palette.other.login.placeholder}
          placeholder='Example: ABCD'
          style={[styles.input, error && styles.inputError] as RecursiveArray<TextStyle>}
          onChangeText={(text) => text.length <= 4 && setInitials(text)}
          value={initials}
        />
      </Animated.View>
      <Space margin={10} />
      <Text style={styles.inputLabel}>Study ID number (3 numbers)</Text>
      <Animated.View style={animatedStyle}>
        <TextInput
          placeholderTextColor={theme.main.palette.other.login.placeholder}
          placeholder={'Example: 123'}
          keyboardType='number-pad'
          style={[styles.input, error && styles.inputError] as RecursiveArray<TextStyle>}
          onChangeText={(text) => text.length <= 3 && setIdNumber(text)}
          value={idNumber}
        />
      </Animated.View>
      {error ? <Text>Cannot log in. Invalid credentials.</Text> : <Text> </Text>}
      <Space margin={10} />
      <View style={styles.buttonContainer}>
        <Button disabled={!validInputs} style={styles.button} onPress={() => !logging && login()}>
          <View style={styles.containerTextButton}>
            <Text bold size={13} style={styles.buttonText}>
              LOG IN
            </Text>
            <View>{logging ? <ActivityIndicator color={'white'} /> : <ArrowSVG />}</View>
          </View>
        </Button>
      </View>
    </View>
  );
};
