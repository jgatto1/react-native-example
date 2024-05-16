import { LayoutChangeEvent, LayoutRectangle, Pressable, View } from 'react-native';
import React, { useState } from 'react';
import { useSafetySurpriseStyles } from './SafetySurprise.styles';
import { useTheme } from 'providers/theme/ThemeProvider';
import { Divider, Space, Text } from 'components';
import { useNavigation } from '@react-navigation/native';
import { AutoScrolling } from './AutoScrolling';
import { SafetySurpriseRoutes } from 'containers/Main/Safety/Surprise/SafetySurprise.routes';

export const SafetySurprise: React.VFC = () => {
  const styles = useSafetySurpriseStyles();
  const theme = useTheme();
  const navigation = useNavigation();
  const [layoutSize, setLayoutSize] = useState<LayoutRectangle>();

  const COLORS = {
    first: { backgroundColor: theme.main.palette.other.safety.surprise.first },
    second: { backgroundColor: theme.main.palette.other.safety.surprise.second },
    third: { backgroundColor: theme.main.palette.other.safety.surprise.third },
    forth: { backgroundColor: theme.main.palette.other.safety.surprise.forth },
  };

  const size = (s: number) => {
    const baseAspect = (900 / 450) * 1.35;
    const actualAspect = layoutSize ? layoutSize.width / layoutSize.height : 1;
    const ratio = baseAspect / actualAspect;
    return {
      height: Math.round(s / ratio),
      width: Math.round(s / ratio),
    };
  };

  const top = (t: number) => {
    const ratio = (layoutSize?.height || 450) / 450;
    return t * ratio;
  };
  const left = (l: number) => {
    const ratio = (layoutSize?.width || 900) / 900;
    return l * ratio;
  };

  const circle = (t: number, l: number, s: number, c: 'first' | 'second' | 'third' | 'forth') => {
    return { style: { top: top(t), left: left(l), ...size(s), ...COLORS[c] } };
  };

  const sizeProp = 1.5;
  const SURPRISES = [
    circle(270, 820, 100 * sizeProp, 'first'),
    circle(280, 150, 120 * sizeProp, 'first'),
    circle(5, 320, 150 * sizeProp, 'first'),
    circle(100, 450, 120 * sizeProp, 'first'),
    circle(130, 620, 110 * sizeProp, 'first'),
    circle(30, 160, 120 * sizeProp, 'second'),
    circle(350, 300, 90 * sizeProp, 'second'),
    circle(10, 510, 80 * sizeProp, 'second'),
    circle(130, 760, 140 * sizeProp, 'second'),
    circle(10, 20, 80 * sizeProp, 'third'),
    circle(300, 30, 80 * sizeProp, 'third'),
    circle(150, 240, 190 * sizeProp, 'third'),
    circle(270, 640, 195 * sizeProp, 'third'),
    circle(100, 0, 220 * sizeProp, 'forth'),
    circle(220, 400, 250 * sizeProp, 'forth'),
    circle(20, 680, 110 * sizeProp, 'forth'),
  ];

  const createBubbles = (e: LayoutChangeEvent) => {
    const newLayout = e.nativeEvent.layout;
    if (!layoutSize || newLayout.width !== layoutSize.width || newLayout.height !== layoutSize.height) {
      setLayoutSize(e.nativeEvent.layout);
    }
  };

  return (
    <View style={styles.root}>
      <Space margin={3} />
      <Text center size={25} style={styles.title}>
        Tap a circle to see a safety idea
      </Text>
      <Space margin={3} />
      <Divider style={styles.divider} />
      <View style={styles.container}>
        <AutoScrolling endPaddingWidth={0} duration={40000} isVertical={false} style={styles.autoScrolling}>
          <View style={styles.scrollableContainer} onLayout={(e) => createBubbles(e)}>
            {SURPRISES.map(({ style }, index) => {
              return (
                <Pressable
                  key={index}
                  style={[styles.bubble, style]}
                  onPress={() => navigation.navigate(SafetySurpriseRoutes.VIEW)}
                />
              );
            })}
          </View>
        </AutoScrolling>
      </View>
    </View>
  );
};
