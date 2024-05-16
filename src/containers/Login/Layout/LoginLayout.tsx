import { Image, Keyboard, Linking, Pressable, SafeAreaView, ScrollView, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLoginLayoutStyles } from './LoginLayout.styles';
import { STATE, useLoginContext } from '../Login.context';
import { Space, Text } from 'components';
import { SVG } from '../assets';

export const LoginLayout: React.FC<{ back?: STATE | boolean }> = ({ back, children }) => {
  const styles = useLoginLayoutStyles();

  const login = useLoginContext();

  const [keyboardIsVisible, setKeyboardIsVisible] = useState(false);

  useEffect(() => {
    const showListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardIsVisible(true);
    });
    const hideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardIsVisible(false);
    });

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.root} contentContainerStyle={styles.rootView}>
        {!back && <Space margin={14} />}
        {back && (
          <Pressable style={styles.back} onPress={() => login.goTo(typeof back === 'boolean' ? 'SignIn' : back)}>
            <SVG.Back fill={styles.backSVG.color} width={18} height={18} />
            <Text size={12} bold style={styles.backText}>
              Back
            </Text>
          </Pressable>
        )}

        <View style={styles.logoImageContainer}>
          <Image style={styles.logoImage} source={require('./assets/seeking-safety-logo.png')} />
          <Text style={styles.appName} size={31}>
            Seeking <Text style={styles.appNameS}>S</Text>
            <Text style={styles.appNameWare} size={22}>
              AFETY
            </Text>
          </Text>
        </View>

        <Space />

        <Space margin={9} />

        {children}

        <Space margin={9} />

        {!keyboardIsVisible && (
          <View style={styles.siteContainer}>
            <Pressable onPress={() => Linking.canOpenURL('https://www.treatment-innovations.org')}>
              <Text bold center style={styles.site}>
                www.treatment-innovations.org
              </Text>
              <Space />
              <Text bold center style={styles.site}>
                support@treatment-innovations.org
              </Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
