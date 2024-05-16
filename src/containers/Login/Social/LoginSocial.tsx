import { GoogleSignin, NativeModuleError, statusCodes } from '@react-native-google-signin/google-signin';
import React, { useEffect } from 'react';
import { Alert, Image, Platform, Pressable } from 'react-native';
import { useLoginSocialStyles } from './LoginSocial.styles';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import { useSession } from 'providers/session/SessionProvider';
import { LoginService } from '../Login2.service';
import { Space, Text } from 'components';
// @ts-ignore
import { AccessToken, LoginManager } from 'react-native-fbsdk';

const PROFILE_IMAGE_SIZE = 150;

export const LoginSocial: React.VFC = () => {
  const styles = useLoginSocialStyles();
  const session = useSession();

  useEffect(() => {
    // Google setup
    GoogleSignin.configure({
      iosClientId: '407089170047-073ss3t9v7mj7l75rct3mgl0ikerl9vv.apps.googleusercontent.com',
      offlineAccess: false,
      profileImageSize: PROFILE_IMAGE_SIZE,
    });
  }, []);

  const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      const idToken = userInfo.idToken;
      console.log('idToken', idToken);
      // // console.log(userInfo.idToken);
      const tokens = await GoogleSignin.getTokens();
      console.log('tokens', tokens.accessToken);
      // TODO: send the acces token to the server
      const sessionData = await LoginService.googleLogin(tokens.accessToken).catch((err) => {
        console.log('error!', err);
        Alert.alert('Error', 'Google Login has failed');
        return null;
      });
      if (sessionData) {
        session.login(sessionData);
      }
    } catch (error) {
      const typedError = error as NativeModuleError;
      switch (typedError.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          // sign in was cancelled
          Alert.alert('cancelled');
          break;
        case statusCodes.IN_PROGRESS:
          // operation (eg. sign in) already in progress
          Alert.alert('in progress');
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          // android only
          Alert.alert('play services not available or outdated');
          break;
        default:
          Alert.alert('Something went wrong', typedError.toString());
      }
    }
  };

  const fbSignIn = async () => {
    // Attempt a login using the Facebook login dialog asking for default permissions.
    try {
      // check this out https://stackoverflow.com/questions/29791618/using-facebook-sdk-on-android-gives-user-logged-in-as-different-facebook-user
      // if the user is logged in another session we have to close it. Otherwise isCancelled will be true
      await LoginManager.logOut();
      const login = await LoginManager.logInWithPermissions(['public_profile, email']);
      if (login.isCancelled) {
        console.log('Login cancelled');
      } else {
        // await AccessToken.getCurrentAccessToken();
        const accessToken = await AccessToken.getCurrentAccessToken();
        console.log('accessToken', accessToken?.accessToken);
        // send token to our backend. By now just mock the data with our Basic API login
        const sessionData = await LoginService.facebookLogin(accessToken?.accessToken as string).catch((err) => {
          console.error('error!', err);
          Alert.alert('Error', 'Facebook Login has failed');
          return null;
        });
        if (sessionData) {
          session.login(sessionData);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const appleSignIn = async () => {
    if (Platform.OS === 'ios') {
      // performs login request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      console.debug('appleAuthRequestResponse', appleAuthRequestResponse);
      // const email = appleAuthRequestResponse.email;
      // const firstName = appleAuthRequestResponse.fullName?.givenName;
      // const lastName = appleAuthRequestResponse.fullName?.familyName;
      // get current authentication state for user
      // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
      const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

      // use credentialState response to ensure the user is authenticated
      // console.log(appleAuthRequestResponse, credentialState);
      const idToken = appleAuthRequestResponse.identityToken;
      console.log('apple id token', idToken);
      if (credentialState === appleAuth.State.AUTHORIZED) {
        // user is authenticated
        const sessionData = await LoginService.appleLogin(appleAuthRequestResponse).catch((err) => {
          console.log('error!', err);
          Alert.alert('Error', 'Error calling the Internal Apple API');
          return null;
        });
        if (sessionData) {
          session.login(sessionData);
        }
      }
    } else {
      throw Error('no android config');
    }
  };

  return (
    <>
      <Pressable style={styles.googleSocialButton} onPress={() => googleSignIn()}>
        <Image style={styles.socialButtonImg} source={require('./assets/google.png')} />
        <Text>Log in with Google</Text>
      </Pressable>
      <Space margin={8} />
      <Pressable style={styles.fbSocialButton} onPress={() => fbSignIn()}>
        <Image style={styles.socialButtonImg} source={require('./assets/facebook_2.png')} />
        <Text style={styles.fbSocialButtonText}>Log in with Facebook</Text>
      </Pressable>
      <Space margin={8} />
      {Platform.OS === 'ios' && (
        <Pressable style={styles.appleSocialButton} onPress={() => appleSignIn()}>
          <Image style={styles.socialButtonImg} source={require('./assets/apple.png')} />
          <Text style={styles.appleSocialButtonText}>Log in with Apple</Text>
        </Pressable>
      )}
    </>
  );
};
