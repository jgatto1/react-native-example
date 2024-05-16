import React, { useState } from 'react';
import OutlineStar from './assets/star-outline.svg';
import FilledStar from './assets/star-filled.svg';
import { Pressable, View } from 'react-native';
import { useRatingStarsStyles } from './RatingStars.styles';
import { Space } from 'components/Space/Space';
import { Button, Text } from 'components';

interface RatingStarsProps {
  rated: boolean;
  loading: boolean;
  sendRate: () => void;
}

export const RatingStars = ({ rated, loading, sendRate }: RatingStarsProps) => {
  const [stars, setStars] = useState(0);
  const styles = useRatingStarsStyles();

  return (
    <>
      <View style={[styles.rateContainer, rated && styles.centerStars]}>
        {new Array(5).fill(0).map((_, index) => {
          const actualStar = index + 1;
          const Star = stars >= actualStar ? FilledStar : OutlineStar;
          return (
            <>
              <Pressable key={index} onPress={() => !rated && setStars(stars === actualStar ? 0 : actualStar)}>
                <Star width={35} height={35} />
              </Pressable>
              <Space key={`${index}-star`} horizontal />
            </>
          );
        })}
        {!rated && (
          <>
            <Space horizontal margin={8} />
            <Button style={{ height: 35, paddingHorizontal: 20 }} loading={loading} onPress={() => sendRate()}>
              RATE
            </Button>
          </>
        )}
      </View>
      {rated && (
        <>
          <Space />
          <Text center bold>
            Rating sent, thank you!
          </Text>
        </>
      )}
    </>
  );
};
