import { Image, ScrollView, View } from 'react-native';
import React, { useCallback, useState, VFC } from 'react';
import { useSafetyStyles } from './Safety.styles';
import { Space } from 'components/Space/Space';
import { ArrowButton } from 'components/ArrowButton/ArrowButton';
import { useTheme } from 'providers/theme/ThemeProvider';
import { SafetyRoutes } from 'containers/Main/Safety/Safety.routes';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { SafetyService } from './Safety.service';
import { EnabledFeature } from 'model/backend/safety';

export interface SafetyRouter {
  [key: string]: {
    name: string;
    route: SafetyRoutes;
  };
}

const orderedFeatures = [
  'safety_plan',
  'safety_boomerang',
  'safety_surprise',
  'talk_to_safe_self',
  'safe_unsafe_picture',
];

///TODO: check
const router: SafetyRouter = {
  safety_place: { name: 'My Safe Place', route: SafetyRoutes.SAFE_PLACE },
  safety_plan: { name: 'Safety Plan Wizard', route: SafetyRoutes.PLAN },
  safety_boomerang: { name: 'Safety Boomerang', route: SafetyRoutes.BOOMERANG },
  safety_surprise: { name: 'Safety Surprise', route: SafetyRoutes.SURPRISE },
  talk_to_safe_self: { name: 'Talk to Safe Self', route: SafetyRoutes.TALK_TO_SELF },
  safe_unsafe_picture: { name: 'Safe / Unsafe Pictures', route: SafetyRoutes.PICTURE },
};

export const Safety: VFC = () => {
  const styles = useSafetyStyles();
  const theme = useTheme();
  const navigation = useNavigation();
  const [data, setData] = useState<EnabledFeature[] | null>(null);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const featuresData = await SafetyService.fetchEnableFeatures();
        setData(featuresData);
      };
      fetchData().catch(() => console.debug('Ignored Safety Features data'));
    }, [])
  );

  const to = (item: EnabledFeature) => () => {
    if (item.is_new_to_me) {
      SafetyService.markFeatureAsNotNew(item.enabled_feature);
    }
    navigation.navigate(router[item.enabled_feature].route);
  };

  const buttonColor = theme.main.palette.other.safety.button.background;
  return (
    <ScrollView>
      <View style={styles.root}>
        <Space />
        <Image style={styles.bannerImage} source={require('./assets/SafetyMainIllustration.png')} />
        <View>
          <Space margin={10} />
          <ArrowButton
            color={buttonColor}
            textColor='black'
            text={router.safety_place.name}
            tag={false}
            onClick={() => navigation.navigate(router.safety_place.route)}
          />
        </View>
        {data &&
          data
            .filter((item) => router[item.enabled_feature])
            .sort((a, b) =>
              orderedFeatures.indexOf(a.enabled_feature) > orderedFeatures.indexOf(b.enabled_feature) ? 1 : -1
            )
            .map((item) => {
              return (
                <View key={`key-${item.enabled_feature}`}>
                  <Space margin={5} />
                  <ArrowButton
                    color={buttonColor}
                    textColor='black'
                    text={router[item.enabled_feature].name}
                    tag={Boolean(item.is_new_to_me)}
                    onClick={to(item)}
                  />
                </View>
              );
            })}
        <Space />
      </View>
    </ScrollView>
  );
};
