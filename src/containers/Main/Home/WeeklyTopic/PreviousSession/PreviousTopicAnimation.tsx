import React, { useCallback, useRef, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
// @ts-ignore
import Video from 'react-native-video-controls';
import { makeStyle } from 'providers/hooks/themed-style.hook';
import { BackendClient } from 'service/backend-client.service';
import { Text } from 'components';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import axios from 'axios';

export const PreviousTopicAnimation = ({ route }: { route: any }) => {
  const [loading, setLoading] = useState(true);
  const [errorLoadingVideo, setErrorLoadingVideo] = useState(false);
  const { animationUrl } = route.params;
  const [videoWork, setVideoWork] = useState(false);
  const styles = usePrevTopicAnimationStyles();
  const isFocused = useIsFocused(); // hot fix https://github.com/react-native-video/react-native-video/issues/1989#issuecomment-688397232
  const playerRef = useRef<Video>(null);

  useFocusEffect(
    useCallback(() => {
      axios
        .get(animationUrl, { headers: { ...BackendClient.defaults.headers.common } })
        .then(() => true)
        .catch(() => false)
        .then((result) => setVideoWork(result));
    }, [animationUrl])
  );

  if (!isFocused) {
    return null;
  }

  return (
    <View style={styles.root}>
      <View style={styles.videoPlayerContainer}>
        {!errorLoadingVideo ? (
          <>
            {loading && (
              <View style={[styles.noVideo, { position: 'absolute' }]}>
                <ActivityIndicator style={styles.loadingIndicator} color={'orange'} size='large' />
              </View>
            )}
            {isFocused && videoWork && (
              <Video
                ref={playerRef}
                playInBackground={false}
                resizeMode={'contain'}
                style={[styles.videoPlayer]}
                source={{ uri: animationUrl, headers: { ...BackendClient.defaults.headers.common } }}
                onLoad={() => {
                  setTimeout(() => {
                    setLoading(false);
                  }, 1200);
                  playerRef.current?.player?.ref?.seek(1);
                }}
                disableVolume
                disableBack
                disableFullscreen
                onError={(_error: any) => {
                  console.warn(_error);
                  setErrorLoadingVideo(true);
                }}
              />
            )}
          </>
        ) : (
          <View style={styles.noVideo}>
            <Text>No Animation for this topic</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const usePrevTopicAnimationStyles = makeStyle((theme) => ({
  root: {
    flex: 1,
    padding: 16,
  },
  videoPlayerContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    width: '100%',
    height: '100%',
  },
  videoPlayer: {
    height: 210,
  },
  noVideo: {
    height: 210,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.other.onBoarding.button.accent,
  },
  loadingIndicator: {
    flex: 1,
  },
}));
