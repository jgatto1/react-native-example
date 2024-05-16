import React, { ReactNode, useContext, useState } from 'react';
import { BackHandler, Platform, StyleSheet, View } from 'react-native';
import { CommonActions, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Header, StackHeaderProps, StackNavigationOptions, StackNavigationProp } from '@react-navigation/stack';

import { IconButton, Text } from 'components';
import { AppTheme, useTheme } from 'providers/theme/ThemeProvider';
import Icons from './assets';
import { usePopupStyles } from './CustomHeader.styles';
import { noop } from 'lodash';
import { TouchableOpacity } from 'react-native-gesture-handler';

type RouteType = RouteProp<Record<string, object | undefined>, string>;

interface RouteParams {
  showPopup: boolean;
}

export interface ScreenOptions {
  route: RouteType;
  navigation: any;
}

const headerStyles = StyleSheet.create({
  headerTitle: {
    fontWeight: 'bold',
    ...(Platform.OS === 'android' ? { fontSize: 16 } : {}),
  },
  backButtonIcon: {
    marginLeft: 10,
  },
  moreInfoButtonIcon: {
    marginRight: 10,
  },
});

const androidDummyHeaderRightStyles = StyleSheet.create({
  space: {
    width: 35,
  },
});

const AndroidDummyHeaderRight = () => {
  return <View style={androidDummyHeaderRightStyles.space} />;
};

export const customHeaderOptions = (
  route: RouteType,
  navigation: any,
  theme: AppTheme,
  headerTitle: string | ReactNode,
  popupProps: PopupDataProps | undefined = undefined,
  overrides?: Partial<StackNavigationOptions>
): StackNavigationOptions => {
  const closer = (show: boolean) => navigation.setParams({ showPopup: show });
  return {
    ...overrides,
    header: (props) => (
      <CustomHeader popupProps={popupProps} popupCloser={closer} routeParams={route.params as RouteParams} {...props} />
    ),
    headerTitle: () =>
      typeof headerTitle === 'string' ? (
        <Text center={Platform.OS === 'android'} bold style={headerStyles.headerTitle}>
          {headerTitle}
        </Text>
      ) : (
        headerTitle
      ),
    headerLeft: () => <GoBack />,
    headerRight: () =>
      popupProps ? <MoreInfo closer={closer} /> : Platform.OS === 'android' ? <AndroidDummyHeaderRight /> : <></>,
    headerStyle: {
      backgroundColor: theme.main.palette.background.alternative,
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 5,
      shadowColor: 'black',
      shadowOpacity: 0.15,
      elevation: 2,
    },
  };
};

interface HeaderFactoryOpts extends Partial<StackNavigationOptions> {
  popupProps?: PopupDataProps;
}

export const useThemedCustomHeaderFactory = () => {
  const theme = useTheme();

  return (title: string, props?: HeaderFactoryOpts) => {
    const { popupProps, ...overrides } = props || {};
    return ({ route, navigation }: ScreenOptions) =>
      customHeaderOptions(route, navigation, theme, title, popupProps, overrides);
  };
};

export const NO_HEADER: StackNavigationOptions = { headerShown: false };

interface IBackContext {
  reset: () => void;
  set: (route: string, stack?: string, params?: object) => void;
  data?: { route: string; stack?: string; params?: object };
}

const DEFAULT_BACK_CTX: IBackContext = {
  reset: noop,
  set: noop,
};

const BackContext = React.createContext(DEFAULT_BACK_CTX);

export const useBackContext = () => useContext(BackContext);

export const BackProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<{ route: string; stack?: string; params?: object } | undefined>();

  const value: IBackContext = {
    reset: () => setData(undefined),
    set: (route: string, stack?: string, params?: object) => setData({ route, stack, params }),
    data,
  };

  return <BackContext.Provider value={value}>{children}</BackContext.Provider>;
};

const GoBack = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const route = useRoute();
  const backCtx = useBackContext();

  // @ts-ignore
  const backRoute = route.params?.backRoute;
  React.useEffect(() => {
    const params = route.params;

    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      // @ts-ignore
      if (params?.backRoute) {
        // @ts-ignore
        navigation.navigate(params?.backRoute);
        return true; // prevent default behaviour
      }
      // else continue back button as default
    });

    return () => backHandler.remove();
  }, [navigation, route]);

  const goBack = () => {
    if (backRoute) {
      // @ts-ignore
      const backStack = route.params?.backStack;
      // @ts-ignore
      const backParams = route.params?.backParams;
      // @ts-ignore
      // This fix the error described here https://app.asana.com/0/1201819601644474/1202103390129753
      if (backStack) {
        navigation.dispatch(CommonActions.navigate(backStack, { screen: backRoute, ...(backParams && backParams) }));
      } else {
        navigation.dispatch(CommonActions.navigate(backRoute, backParams));
      }
      return;
    }
    if (backCtx.data) {
      const data = backCtx.data;
      backCtx.reset();
      // This fix the error described here https://app.asana.com/0/1201819601644474/1202103390129753
      if (data.stack) {
        navigation.dispatch(CommonActions.navigate(data.stack, { ...data.params, screen: data.route }));
      } else {
        navigation.dispatch(CommonActions.navigate(data.route, data.params));
      }
      return;
    }
    navigation.dispatch(CommonActions.goBack());
  };

  return (
    <IconButton style={[headerStyles.backButtonIcon]} onPress={goBack}>
      <Icons.BackArrowIcon />
    </IconButton>
  );
};

const MoreInfo = (props: { closer: (show: boolean) => void }) => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    props.closer(!showPopup);
    setShowPopup((actual) => !actual);
  };
  return (
    <IconButton style={headerStyles.moreInfoButtonIcon} onPress={() => togglePopup()}>
      <Icons.QuestionMarkIcon width={26} height={26} />
    </IconButton>
  );
};

const CustomHeader = (
  props: {
    routeParams: { showPopup: any };
    popupProps?: PopupDataProps;
    popupCloser: (show: boolean) => void;
  } & StackHeaderProps
) => {
  const { routeParams, popupProps, popupCloser } = props;

  const close = () => {
    popupCloser(false);
  };

  return (
    <>
      <Header {...props} />
      {Platform.OS === 'android' && <>{routeParams?.showPopup && <Popup {...popupProps} close={close} />}</>}
      {Platform.OS !== 'android' && <View>{routeParams?.showPopup && <Popup {...popupProps} close={close} />}</View>}
    </>
  );
};

interface PopupDataProps {
  title?: string;
  content?: string;
}

interface PopoupProps extends PopupDataProps {
  close: () => void;
}

const Popup = ({ title = 'More info', content = 'test content', close }: PopoupProps) => {
  const styles = usePopupStyles();
  return (
    <View style={[styles.root, Platform.OS === 'android' && { zIndex: 1 }]}>
      <View style={styles.fakeHeaderShadow} />
      <View style={[styles.popupContent, Platform.OS === 'android' && { zIndex: 2 }]}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{title}</Text>
          {Platform.OS === 'android' && (
            <TouchableOpacity onPress={() => close()} style={{ overflow: 'visible', height: 32 }}>
              <IconButton onPress={() => undefined}>
                <Icons.CloseIcon width={30} height={30} />
              </IconButton>
            </TouchableOpacity>
          )}
          {Platform.OS !== 'android' && (
            <IconButton onPress={() => close()}>
              <Icons.CloseIcon width={30} height={30} />
            </IconButton>
          )}
        </View>
        <View style={styles.body}>
          <Text>{content}</Text>
        </View>
      </View>
    </View>
  );
};
