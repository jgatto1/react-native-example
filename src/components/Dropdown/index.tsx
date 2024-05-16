import React from 'react';
import { StyleProp, View, TextStyle } from 'react-native';
import { Dropdown as RNDropdown } from 'react-native-element-dropdown';
import useStyles from 'components/Dropdown/style';
import { Text } from 'components';

interface DropdownProps<T> {
  data: T[];
  onChange: (value: T) => void;
  label?: string | JSX.Element;
  labelStyle?: StyleProp<TextStyle>;
  placeholder?: string;
  disabled?: boolean;
  defaultValue?: any;
}

function Dropdown<T>({
  data,
  onChange,
  label,
  labelStyle,
  placeholder = 'Select',
  disabled,
  defaultValue,
}: DropdownProps<T>) {
  const styles = useStyles();
  return (
    <View>
      {label && <Text style={[styles.label, labelStyle ?? labelStyle]}>{label}</Text>}
      <RNDropdown
        disable={disabled}
        style={[styles.dropdown, disabled && styles.disabled]}
        fontFamily={styles.dropdown.fontFamily}
        iconColor={styles.icon.color}
        iconStyle={styles.iconStyle}
        inputSearchStyle={styles.font}
        selectedTextStyle={styles.font}
        placeholderStyle={styles.font}
        data={data}
        renderItem={(item) => (
          <View style={styles.customDropdownItem}>
            <Text>{item.label}</Text>
          </View>
        )}
        maxHeight={40 * Math.min(5, data.length) + 10}
        labelField={'label'}
        valueField={'value'}
        placeholder={placeholder}
        dropdownPosition='auto'
        value={defaultValue ?? 'value'}
        onChange={(item: any) => onChange(item)}
      />
    </View>
  );
}

export default Dropdown;
