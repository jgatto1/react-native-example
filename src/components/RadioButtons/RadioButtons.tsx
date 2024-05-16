import React, { ReactNode, useState } from 'react';
import { useRadioButtonsStyles } from './RadioButtons.styles';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { useTheme } from 'providers/theme/ThemeProvider';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

interface RadioButtonsProps {
  items: { value: number; label: string | ReactNode }[];
  initial?: number;
  onSelect: (value: number) => void;
  styles?: RadioButtonStyles;
  labelStyle?: StyleProp<TextStyle>;
  margin?: number;
}

interface RadioButtonStyles {
  radioButton?: StyleProp<ViewStyle>;
  label?: StyleProp<TextStyle>;
}

export const RadioButtons: React.VFC<RadioButtonsProps> = (props) => {
  const styles = useRadioButtonsStyles();
  const theme = useTheme();

  const [value, setValue] = useState(props.initial || 0);
  const getRadioButtonStyles = (isSelected: boolean): StyleProp<ViewStyle> => {
    return isSelected
      ? {
          backgroundColor: theme.main.palette.primary,
          borderColor: theme.main.palette.primary,
          borderRadius: 40,
          borderWidth: 4,
          height: 31,
          alignSelf: 'center',
        }
      : {};
  };

  const getButtonStyles = (isSelected: boolean) => (!isSelected ? { borderWidth: 1 } : {});

  const onPress = (newValue: number) => {
    setValue(newValue);
    props.onSelect(newValue);
  };

  return (
    <RadioForm>
      {props.items.map((item, index) => (
        <RadioButton style={props?.styles?.radioButton} key={index}>
          <RadioButtonInput
            isSelected={value === index}
            obj={item}
            index={index}
            onPress={() => onPress(index)}
            buttonSize={value === index ? 13 : 21}
            buttonOuterColor={theme.main.palette.primary}
            buttonInnerColor={'white'}
            buttonWrapStyle={getRadioButtonStyles(value === index)}
            buttonStyle={getButtonStyles(value === index)}
          />
          <RadioButtonLabel
            onPress={() => onPress(0)}
            labelStyle={[styles.radioLabelStyle, props?.styles?.label]}
            obj={item}
            index={0}
          />
        </RadioButton>
      ))}
    </RadioForm>
  );
};
