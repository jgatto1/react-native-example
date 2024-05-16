import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { CohortTopicContextProvider } from 'containers/Main/Home/CohortTopic.context';
import { Safety } from 'containers/Main/Safety/Safety';
import { useThemedCustomHeaderFactory } from 'components/CustomHeader/CustomHeader';
import { SafetyRoutes } from './Safety.routes';
import { SafetySafePlace } from './SafePlace/SafetySafePlace';
import { SafetySafePlaceNewPost } from 'containers/Main/Safety/SafePlace/NewPost/SafetySafePlaceNewPost';
import { SafetyPlanStack } from 'containers/Main/Safety/Plan/SafetyPlan.stack';
import { SafetyBoomerangStack } from 'containers/Main/Safety/Boomerang/SafetyBoomerang';
import { SafetyTalkToSelfStack } from 'containers/Main/Safety/TalkToSelf/SafetyTalkToSelf.stack';
import { SafetyPictureStack } from 'containers/Main/Safety/Picture/SafetyPicture.stack';
import { SafetySurpriseStack } from 'containers/Main/Safety/Surprise/SafetySurprise.stack';

const Stack = createStackNavigator();
const ModalStack = createStackNavigator();

export const SafetySafePlaceOptionsProps = {
  popupProps: {
    title: 'MORE INFORMATION',
    content:
      'This is safety central-- your most important content in one place! Each item is private unless you click Share to post to the app community; to share just with your group go to the gear icon (from home screen) to edit settings. Come back often to see what you have here; let it bring you back to safety',
  },
};

const SafetyMain: React.VFC = () => {
  const optionsFor = useThemedCustomHeaderFactory();

  return (
    <Stack.Navigator initialRouteName={SafetyRoutes.MENU}>
      <Stack.Screen options={optionsFor('Safety')} name={SafetyRoutes.MENU} component={Safety} />
      <Stack.Screen
        options={optionsFor('My Safe Place', SafetySafePlaceOptionsProps)}
        name={SafetyRoutes.SAFE_PLACE}
        component={SafetySafePlace}
      />
      <Stack.Screen
        options={optionsFor('Safety Reflection')}
        name={SafetyRoutes.NEW_POST}
        component={SafetySafePlaceNewPost}
      />
      <Stack.Screen
        name={SafetyRoutes.PLAN}
        options={optionsFor('Safety Plan', { headerShown: false })}
        component={SafetyPlanStack}
      />

      <Stack.Screen
        name={SafetyRoutes.BOOMERANG}
        options={optionsFor('Safety Boomerang', { headerShown: false })}
        component={SafetyBoomerangStack}
      />

      <Stack.Screen
        name={SafetyRoutes.TALK_TO_SELF}
        options={optionsFor('Safety Talk To Self', { headerShown: false })}
        component={SafetyTalkToSelfStack}
      />

      <Stack.Screen
        name={SafetyRoutes.PICTURE}
        options={optionsFor('Safe / Unsafe Picture', { headerShown: false })}
        component={SafetyPictureStack}
      />

      <Stack.Screen
        options={optionsFor('Safety Surprise', { headerShown: false })}
        name={SafetyRoutes.SURPRISE}
        component={SafetySurpriseStack}
      />
    </Stack.Navigator>
  );
};

export const SafetyStack = () => {
  const opts = { headerShown: false };

  return (
    <CohortTopicContextProvider>
      <ModalStack.Navigator mode='modal'>
        <Stack.Screen name={SafetyRoutes.MAIN} options={opts} component={SafetyMain} />
      </ModalStack.Navigator>
    </CohortTopicContextProvider>
  );
};
