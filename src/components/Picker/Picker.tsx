import { Platform, Pressable, View } from 'react-native';
import React, { createRef, useImperativeHandle, useState } from 'react';
import { usePickerStyles } from './Picker.styles';
import { Text } from 'components';
import { Picker as BasePicker } from '@react-native-picker/picker';

interface PickerProps<T = any> {
  items: { label: string; value: T }[];
  selected?: T | null;
  onDone: (selected: T | null) => void;
  noOverlay?: boolean;
}

export interface PickerRef {
  open: () => void;
  close: () => void;
}

function PickerInner<T>(props: PickerProps<T>, ref: React.ForwardedRef<PickerRef>) {
  const styles = usePickerStyles();

  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState<T | null>(
    props.selected || (Array.isArray(props.items) && props.items.length > 0 ? props.items[0].value : null)
  );

  const closePicker = () => {
    console.log('Close', selected);
    props.onDone(selected);
    setShow(false);
  };

  const refInit = () => ({
    open: () => {
      setShow(true);
      baseRef.current?.focus();
    },
    close: () => {
      setShow(false);
      baseRef.current?.blur();
    },
  });

  const baseRef = createRef<BasePicker<T>>();

  useImperativeHandle(ref, refInit, [baseRef, setShow]);

  if (!show && Platform.OS !== 'android') {
    return null;
  }

  if (Platform.OS === 'android') {
    return (
      <View style={{ opacity: 0, borderWidth: 0, height: 0 }}>
        <BasePicker
          // style={{borderWidth: 1}}
          ref={baseRef}
          onValueChange={(newSelected: T) => {
            if (selected !== undefined) {
              setSelected(newSelected);
            }
            props.onDone(newSelected);
          }}
          selectedValue={typeof selected === 'number' ? selected : undefined}>
          {props.items.map((item, index) => (
            // @ts-ignore
            <BasePicker.Item key={`${item.value}-${index}`} label={item.label} value={item.value} />
          ))}
        </BasePicker>
      </View>
    );
  }

  return (
    <View style={styles.pickerContainer}>
      <Pressable style={[styles.overlay, props.noOverlay && styles.noOverlay]} onPress={() => setShow(false)} />
      <View style={styles.picker}>
        <View style={styles.pickerDone}>
          <Pressable onPress={() => closePicker()}>
            <Text bold>DONE</Text>
          </Pressable>
        </View>
        <BasePicker
          selectedValue={selected || undefined}
          onValueChange={(newSelected: T) => {
            if (selected === undefined) {
              return;
            }
            setSelected(newSelected);
          }}>
          {props.items.map((item, index) => (
            <BasePicker.Item key={index} label={item.label} value={item.value} />
          ))}
        </BasePicker>
      </View>
    </View>
  );
}

export const Picker = React.forwardRef(PickerInner);
