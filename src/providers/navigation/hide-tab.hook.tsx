import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React from 'react';

export const useNavigationHideTab = () => {
  const navigation = useNavigation();

  const tabNav = React.useMemo(() => {
    let parent = navigation.dangerouslyGetParent();
    // Hack: Navigate under nav parent to achieve second navigation on the tree - the tab bar
    while (parent?.dangerouslyGetParent()) {
      parent = parent?.dangerouslyGetParent();
    }
    return parent;
  }, [navigation]);

  useFocusEffect(
    React.useCallback(() => {
      tabNav?.setOptions({
        tabBarVisible: false,
      });

      // reveal after changing screen
      return () => {
        tabNav?.setOptions({
          tabBarVisible: true,
        });
      };
    }, [tabNav])
  );

  return navigation;
};

export const WithOutTabBar: React.FC = ({ children }) => {
  useNavigationHideTab();
  return <>{children}</>;
};
