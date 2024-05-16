import { View } from 'react-native';
import React from 'react';
import { useSliderCardStyles } from './SliderCard.styles';
import { useTheme } from 'providers/theme/ThemeProvider';
import { Card, Text } from 'components';
import { Slider } from '@miblanchard/react-native-slider';

interface SliderCardProps {
  title: string;
  value: number;
  onChange: (value: number) => void;
}

export const SliderCard: React.VFC<SliderCardProps> = ({ title, value, onChange }) => {
  const styles = useSliderCardStyles();
  const theme = useTheme();

  const tiles = ["Skip / Don't Know", 'None', 'A Little', 'Some', 'A Lot'];

  return (
    <Card style={styles.card}>
      <View style={styles.cardTitleContainer}>
        <Text size={15} style={styles.cardTitle}>
          {title}
        </Text>
      </View>
      <View style={styles.sliderTilesContainer}>
        {tiles.map((tile, i) => (
          <View key={i} style={styles.sliderTileContainer}>
            <Text size={15} key={i}>
              {tile}
            </Text>
          </View>
        ))}
      </View>
      <View style={styles.slider}>
        <Slider
          containerStyle={styles.sliderContainer}
          minimumValue={0}
          maximumValue={4}
          step={1}
          value={value}
          onValueChange={([newValue]) => onChange(newValue)}
          trackStyle={styles.sliderTrack}
          thumbTintColor={theme.main.palette.primary}
          thumbStyle={styles.sliderThumbnail}
          minimumTrackTintColor={theme.main.palette.other.onBoarding.background.middle}
          maximumTrackTintColor={theme.main.palette.background.alternative}
        />
      </View>
    </Card>
  );
};
