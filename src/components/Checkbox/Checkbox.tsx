import React, { useState } from 'react';
import BouncyCheckbox, { IBouncyCheckboxProps } from 'react-native-bouncy-checkbox';
import { makeStyle } from 'providers/hooks/themed-style.hook';
import { useTheme } from 'providers/theme/ThemeProvider';
import Checkmark from './assets/ActiveSquare.svg';

export type CheckboxProps = IBouncyCheckboxProps & { square?: boolean };

export const Checkbox: React.VFC<CheckboxProps> = ({
  isChecked,
  onPress,
  square,
  iconStyle,
  ...props
}: CheckboxProps) => {
  const theme = useTheme();
  const styles = useCheckboxStyles();
  const [checked, setChecked] = useState(isChecked || false);
  const onPressHandler = () => {
    onPress && onPress(!checked);
    setChecked(!checked);
  };

  return (
    <BouncyCheckbox
      isChecked={checked || false}
      bounceFriction={100000}
      size={35}
      iconStyle={[checked ? styles.checked : styles.unchecked, square && styles.square, iconStyle]}
      iconComponent={checked ? <Checkmark width={30} height={30} /> : null}
      fillColor={theme.main.palette.accent}
      onPress={onPressHandler}
      {...props}
    />
  );
};

const useCheckboxStyles = makeStyle((theme) => ({
  checked: {
    borderColor: theme.palette.accent,
    color: theme.palette.selected.primary,
    borderRadius: 0,
  },
  square: {
    borderRadius: 0,
  },
  unchecked: {
    borderRadius: 0,
    borderColor: theme.palette.primary,
  },
}));
