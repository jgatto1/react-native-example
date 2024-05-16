import * as React from 'react';
import { Animated, Easing, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
  onColor?: string;
  offColor?: string;
  label?: string;
  onToggle?: () => void;
  style?: object;
  isOn?: boolean;
  labelStyle?: object;
}

interface DefaultProps {
  onColor: string;
  offColor: string;
  label: string;
  onToggle: () => void;
  style: object;
  isOn: boolean;
  labelStyle: object;
}

export const Toggle: React.VFC<Props> = (props) => {
  const animatedValue = new Animated.Value(0);

  const moveToggle = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 20],
  });

  const { isOn, onColor, offColor, style, onToggle, labelStyle, label } = props;

  const color = isOn ? onColor : offColor;

  animatedValue.setValue(isOn ? 0 : 1);

  Animated.timing(animatedValue, {
    useNativeDriver: false,
    toValue: isOn ? 1 : 0,
    duration: 300,
    easing: Easing.linear,
  }).start();

  return (
    <View style={styles.container}>
      {!!label && <Text style={[styles.label, labelStyle]}>{label}</Text>}

      <TouchableOpacity
        onPress={() => {
          typeof onToggle === 'function' && onToggle();
        }}>
        <View style={[styles.toggleContainer, style, { backgroundColor: color }]}>
          <Animated.View
            style={[
              styles.toggleWheelStyle,
              {
                marginLeft: moveToggle,
              },
            ]}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

Toggle.defaultProps = {
  onColor: 'rgb(100,161,117)',
  offColor: '#ecf0f1',
  label: '',
  onToggle: () => {},
  style: {},
  isOn: false,
  labelStyle: {},
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleContainer: {
    width: 45,
    height: 25,
    marginLeft: 5,
    borderRadius: 25,
    justifyContent: 'center',
  },
  label: {
    marginRight: 2,
  },
  toggleWheelStyle: {
    width: 25,
    height: 25,
    backgroundColor: 'white',
    borderRadius: 12.5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 1.5,
  },
});
