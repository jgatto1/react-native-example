import { Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Text } from 'components';
import { SVG } from 'containers/Main/Trigger/Log/assets';
import { Space } from 'components/Space/Space';
import { useTriggerCustomizePrepTagStyles } from 'containers/Main/Trigger/shared/CustomizePrep/Tag/TriggerCustomizePrepTag.styles';

interface TriggerCustomizePrepTagProps {
  small?: boolean;
  label: string;
  onChange: (s: boolean) => void;
  checked?: boolean;
}

export const TriggerCustomizePrepTag: React.VFC<TriggerCustomizePrepTagProps> = ({ label, onChange, checked }) => {
  const styles = useTriggerCustomizePrepTagStyles();
  const [selected, setSelected] = useState(checked);

  useEffect(() => {
    setSelected(!!checked);
  }, [checked]);

  const Icon = selected ? SVG.Remove : SVG.Add;
  const iconProps = {
    width: 16,
    height: 16,
    fill: selected ? undefined : styles.triggerLabelSVG.color,
  };

  return (
    <Pressable
      style={[styles.triggerLabel, selected && styles.triggerLabelSelected]}
      onPress={() => {
        setSelected(!selected);
        onChange(!selected);
      }}>
      <Icon {...iconProps} />
      <Space horizontal margin={1.5} />
      <Text size={label.length > 12 ? 10 : 12}>{label}</Text>
    </Pressable>
  );
};
