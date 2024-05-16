import { Image, Pressable, ScrollView, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSafetySurpriseViewStyles } from './SafetySurpriseView.styles';
import { Button, NewPost, Text } from 'components';
import { SURPRISES, SurpriseSource } from './asset/surprises';
import { Space } from 'components/Space/Space';
import { SVG } from './asset';
import { useTheme } from 'providers/theme/ThemeProvider';
import { SafetySurpriseRoutes } from 'containers/Main/Safety/Surprise/SafetySurprise.routes';
import { Res, validateResponse } from 'model/backend';
import { BackendClient } from 'service/backend-client.service';
import { showAlertIfNetworkError } from 'providers/error.alert';

export const SafetySurpriseView: React.VFC = () => {
  const styles = useSafetySurpriseViewStyles();
  const theme = useTheme();
  const [source, setSource] = useState<SurpriseSource>(SURPRISES[0]);
  const [stars, setStars] = useState(0);
  const [rated, setRated] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSource(SURPRISES[Math.floor(Math.random() * SURPRISES.length)]);
  }, []);

  const sendRate = () => {
    const data = {
      safe_coping_skill_title: source.title,
      safe_coping_skill_tagline: source.tagline,
      rating: stars,
    };
    setLoading(true);
    //mockOkReq()
    BackendClient.post<Res>('/safety_surprise_response/create', data)
      .then(validateResponse)
      .then(() => setRated(true))
      .catch((err) => {
        showAlertIfNetworkError(err);
        console.warn(`Cannot send stars to ${JSON.stringify(source)}`, err);
      })
      .finally(() => setLoading(false));
  };

  return (
    <ScrollView style={styles.root}>
      <Space />
      <Text center italic size={30} style={styles.title}>
        Your surprise...
      </Text>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={source.source} />
      </View>
      <Space />
      <Text center bold>
        Rate this Safe Coping Skill
      </Text>
      <View style={[styles.rateContainer, rated && styles.centerStars]}>
        {new Array(5).fill(0).map((_, index) => {
          const actualStar = index + 1;
          const Star = stars >= actualStar ? SVG.StarFill : SVG.StarEmpty;
          return (
            <Pressable key={index} onPress={() => !rated && setStars(stars === actualStar ? 0 : actualStar)}>
              <Star fill={theme.main.palette.primary} width={40} height={40} />
            </Pressable>
          );
        })}
        {!rated && (
          <>
            <Space horizontal margin={5} />
            <Button loading={loading} onPress={() => sendRate()}>
              RATE
            </Button>
          </>
        )}
      </View>
      <Space />
      <NewPost
        title='How can you use this skill today?'
        placeholder='Write something...'
        origin='Safety Surprise'
        // attachB64={source.base64}
        onSubmitNavigateRoute={SafetySurpriseRoutes.PICK}
        minimized
        backButton
      />
    </ScrollView>
  );
};
