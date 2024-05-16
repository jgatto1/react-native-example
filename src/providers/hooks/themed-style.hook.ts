import { StyleSheet } from 'react-native';
import { useMemo } from 'react';
import { Theme } from 'app/theme/model';
import { useTheme } from 'providers/theme/ThemeProvider';

declare type CreateStyleArg<T> = T | StyleSheet.NamedStyles<T>;

declare type CreateStyleWithTheme<T> = (theme: Theme) => CreateStyleArg<T>;

declare type Styles<T> = CreateStyleArg<T> | CreateStyleWithTheme<T>;

export const makeStyle = <T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>>(
  style: Styles<T>
): (() => T) => {
  if (typeof style === 'function') {
    const styleConstructor = style as CreateStyleWithTheme<T>;
    return function useThemedStyle() {
      const theme = useTheme();
      const themedStyle = styleConstructor(theme.main);

      return StyleSheet.create(themedStyle);
    };
  }

  return () => useMemo(() => StyleSheet.create(style), []);
};

const parseRGB = (color: string) => {
  if (!color.startsWith('rgb')) {
    throw new Error('alpha(rgb[a], opacity) Only support rgba string colors');
  }
  return color.slice(color.indexOf('(') + 1, color.length - 1).split(',');
};

export const alphaRGB = (color: string, opacity: number) => {
  if (!color.startsWith('rgb')) {
    throw new Error('alpha(rgb[a], opacity) Only support rgba string colors');
  }
  const [r, g, b] = parseRGB(color);

  return `rgba(${r}, ${g}, ${b}, ${Math.max(0, Math.min(opacity, 1))})`;
};

export const shadeRGB = (color: string, shade: number) => {
  const [r, g, b, a] = parseRGB(color);

  const s = (c: string) => Math.round(Number(c) * (1 - shade));

  return `rgba(${s(r)}, ${s(g)}, ${s(b)}, ${a || 1})`;
};
