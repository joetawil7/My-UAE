import { createBox, BoxProps } from '@shopify/restyle';
import {
  Image as ReactNativeImage,
  ImageProps as ReactNativeImageProps,
} from 'expo-image';
import { Theme } from '@theme';
import { CombineProps } from '@utils';

type NativeProps = ReactNativeImageProps & {
  children?: React.ReactNode;
};
export const Image = createBox<Theme, NativeProps, false>(ReactNativeImage);

export type ImageProps = CombineProps<NativeProps, BoxProps<Theme, false>>;
