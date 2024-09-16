import React from 'react';
import { IconsId, ICONS_CODEPOINTS } from '@assets/icons/icons';
import { Theme } from '@theme/theme';
import { Text, TextProps } from './text';
import { GradientText } from '../gradientText';

export type IconProps = Omit<TextProps, 'children' | 'fontSize' | 'variant'> & {
  name: IconsId;
  size?: TextProps['fontSize'];
  gradientVariant?: keyof Theme['linearGradientVariants'];
};

export const Icon: React.FC<IconProps> = ({
  name,
  size,
  gradientVariant,
  ...rest
}) => {
  const glyph = parseInt(ICONS_CODEPOINTS[name], 10);
  if (!glyph) throw new Error(`Unrecognized icon name ${name}`);

  return gradientVariant ? (
    <GradientText
      text={String.fromCodePoint(glyph)}
      gradientVariant={gradientVariant}
      textProps={{
        fontSize: size ?? 18,
        fontFamily: 'Icons',
        ...rest,
      }}
    />
  ) : (
    <Text {...rest} fontSize={size ?? 18} fontFamily='Icons'>
      {String.fromCodePoint(glyph)}
    </Text>
  );
};
