import React from 'react';
import { Text } from 'components';
import { TextProps } from 'components/Text/Text';

const BOLD_REGEX = /<\/?[b|i]>/g;

/**
 * Text which supports html string only with: <b>, <i>
 */

interface StyledTextProps extends TextProps {
  text: string;
}

export const StyledText: React.VFC<StyledTextProps> = ({ text, ...props }) => {
  const words = text.split(BOLD_REGEX);

  return (
    <Text {...props}>
      {words.map((word, index) => (
        <Text key={index} bold={index % 2 !== 0}>
          {word}
        </Text>
      ))}
    </Text>
  );
};

export const TextFormatted: React.FC<TextProps> = ({ children, ...props }) => {
  // eslint-disable-next-line valid-typeof
  if (typeof children === undefined || typeof children === null) {
    return null;
  }
  if (typeof children !== 'string') {
    throw new Error(`TextFormatted only accept string as child. Actual: ${typeof children}`);
  }
  const text = children as string;

  const firstBold = text.indexOf('<b>');
  const firstItalic = text.indexOf('<i>');
  if (firstBold === -1 && firstItalic === -1) {
    return <Text>{children}</Text>;
  }
  if ((firstBold === -1 || firstItalic < firstBold) && firstItalic > -1) {
    const before = text.substring(0, firstItalic);
    const close = text.indexOf('</i>', firstItalic + 3);
    const inner = text.substring(firstItalic + 3, close);
    const after = text.substring(close + 4, text.length);
    return (
      <>
        <Text {...props}>{before}</Text>
        <Text italic>
          <TextFormatted {...props}>{inner}</TextFormatted>
        </Text>
        <TextFormatted {...props}>{after}</TextFormatted>
      </>
    );
  }
  if ((firstItalic === -1 || firstBold < firstItalic) && firstBold > -1) {
    const before = text.substring(0, firstBold);
    const close = text.indexOf('</b>', firstBold + 3);
    const inner = text.substring(firstBold + 3, close);
    const after = text.substring(close + 4, text.length);
    return (
      <>
        <Text {...props}>{before}</Text>
        <Text bold>
          <TextFormatted {...props}>{inner}</TextFormatted>
        </Text>
        <TextFormatted {...props}>{after}</TextFormatted>
      </>
    );
  }
  return <Text>{text}</Text>;
};
