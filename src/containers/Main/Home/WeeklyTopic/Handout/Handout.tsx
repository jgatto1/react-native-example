import React, { useState } from 'react';
import { ActivityIndicator, Dimensions, Platform, View } from 'react-native';
import { Modal } from 'components';
import { useHandoutStyles } from './Handout.styles';
import { WebView } from 'react-native-webview';
import { useTheme } from 'providers/theme/ThemeProvider';
import { useNavigationHideTab } from 'providers/navigation/hide-tab.hook';

export const Handout = ({ route }: { route: any }) => {
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const styles = useHandoutStyles();
  const navigation = useNavigationHideTab();
  const { handoutUrl } = route.params;

  return (
    <Modal
      onClose={() => navigation.goBack()}
      styles={{ bottomSpace: { flex: 0.5 }, card: { height: Dimensions.get('window').height * 0.66, width: '100%' } }}
      backgroundViewStyles={{
        middle: { flex: 10, backgroundColor: theme.main.palette.other.weeklyTopic.background },
        bottom: { flex: 5 },
      }}>
      <View style={styles.modalRoot}>
        {loading && <ActivityIndicator style={styles.loadingIndicator} size='large' />}
        <WebView
          hardwareAccelerationDisabledAndroid={Platform.OS === 'android'}
          onLoad={() => setLoading(false)}
          style={loading ? styles.hide : styles.webView}
          source={{ uri: handoutUrl }}
        />
      </View>
    </Modal>
  );
};
