import { Pressable, SafeAreaView, Text, View } from 'react-native';
import { Picker, PickerRef } from 'components';
import React, { createRef, useState } from 'react';
import { SVG } from 'containers/Main/Safety/Boomerang/Create/assets';
import { makeStyle } from '@hooks/themed-style.hook';

export const DevShowRoom = () => {
  const styles = useStyle();

  const pickerRef = createRef<PickerRef>();
  const [selected, setSelected] = useState(5);

  return (
    <SafeAreaView style={{ flex: 1, borderWidth: 1, paddingHorizontal: 0 }}>
      <View
        style={{
          paddingHorizontal: 0,
          position: 'relative',
          borderWidth: 1,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View>
          <Pressable style={styles.pickerOpener} onPress={() => pickerRef.current?.open()}>
            <Text style={{ color: 'black' }}>Hello {`${selected}`}</Text>
            <SVG.Dropdown fill={'black'} />
          </Pressable>
        </View>
        <Picker
          ref={pickerRef}
          selected={selected}
          items={[
            { value: 5, label: '5' },
            { value: 4, label: '4' },
            { value: 3, label: '3' },
            { value: 2, label: '2' },
            { value: 1, label: '1' },
          ]}
          onDone={(v) => typeof v === 'number' && setSelected(v as number)}
        />
      </View>
    </SafeAreaView>
  );
};

const useStyle = makeStyle((theme) => ({
  pickerOpener: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: theme.palette.background.alternative,
  },
}));
