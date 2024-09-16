import React, {
  forwardRef,
  MutableRefObject,
  PropsWithChildren,
  useEffect,
} from 'react';
import GorhomBottomSheet, {
  BottomSheetModal as GorhomBottomSheetModal,
  BottomSheetModalProps as GorhomBottomSheetModalProps,
  BottomSheetBackdrop,
  BottomSheetProps as GorhomBottomSheetProps,
  BottomSheetFlatList as GorhomBottomSheetFlatList,
  BottomSheetSectionList as GorhomBottomSheetSectionList,
} from '@gorhom/bottom-sheet';
import {
  BottomSheetMethods,
  BottomSheetModalMethods,
} from '@gorhom/bottom-sheet/lib/typescript/types';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import { BackHandler, Platform } from 'react-native';
import { View } from '@components/base/view';
import { StyleSheet } from '@components/base/styleSheet';
import { Blur } from '@components/blur';
import { Theme } from '@theme';
import { makeScrollView } from './scrollView';

export const BottomSheetFlatList = makeScrollView<
  typeof GorhomBottomSheetFlatList
>()(GorhomBottomSheetFlatList);
export const BottomSheetSectionList = makeScrollView<
  typeof GorhomBottomSheetSectionList
>()(GorhomBottomSheetSectionList);

export type BottomSheetProps = GorhomBottomSheetProps & {
  withBackDrop?: boolean;
  handleColor?: keyof Theme['colors'];
};

export type BottomSheetModalProps = GorhomBottomSheetModalProps & {
  withBackDrop?: boolean;
  withBlur?: boolean;
  backgroundColor?: keyof Theme['colors'];
  handleColor?: keyof Theme['colors'];
};

// 16 (margin top) + 16 (margin bottom) + 2 (border top) + 2 (border bottom)
export const HANDLE_HEIGHT = 28;

export const DefaultHandle = (handleColor?: keyof Theme['colors']) => (
  <View width='100%' height={HANDLE_HEIGHT} paddingVertical='s'>
    <View
      alignSelf='center'
      width={36}
      borderColor={handleColor ?? 'secondary'}
      borderRadius='max'
      borderWidth={2}
    />
  </View>
);

const Backdrop = (props: BottomSheetDefaultBackdropProps) => (
  <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />
);

export type BottomSheetBackHandlerProps = {
  sheetRef: MutableRefObject<
    BottomSheetMethods | BottomSheetModalMethods | null
  >;
};

export const BottomSheetBackHandler: React.FC<BottomSheetBackHandlerProps> = ({
  sheetRef,
}) => {
  useEffect(() => {
    const onBackPress = () => {
      if (!sheetRef.current) return false;
      if ('dismiss' in sheetRef.current) {
        sheetRef.current.dismiss();
      } else {
        sheetRef.current.snapToIndex(0);
      }

      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, [sheetRef]);
  return null;
};
// const renderBackground = (backgroundColor?: keyof Theme['colors']) => (
//   <BottomSheetBackgroundComponent backgroundColor={backgroundColor} />
// );

const BottomSheetModalInner: React.ForwardRefRenderFunction<
  BottomSheetModalMethods,
  PropsWithChildren<BottomSheetModalProps>
> = (
  { withBackDrop, withBlur, backgroundColor, handleColor, children, ...props },
  ref
) => {
  const renderBackground = () => (
    <BottomSheetBackgroundComponent backgroundColor={backgroundColor} />
  );
  return (
    <GorhomBottomSheetModal
      ref={ref}
      handleComponent={() => DefaultHandle(handleColor)}
      backgroundComponent={withBlur ? Blur : renderBackground}
      backdropComponent={withBackDrop ? Backdrop : undefined}
      {...props}
    >
      <BottomSheetBackHandler
        sheetRef={ref as BottomSheetBackHandlerProps['sheetRef']}
      />
      {children}
    </GorhomBottomSheetModal>
  );
};

const BottomSheetModalWithoutBackHandlerInner: React.ForwardRefRenderFunction<
  BottomSheetModalMethods,
  PropsWithChildren<BottomSheetModalProps>
> = (
  { withBackDrop, withBlur, backgroundColor, handleColor, children, ...props },
  ref
) => {
  const renderBackground = () => (
    <BottomSheetBackgroundComponent backgroundColor={backgroundColor} />
  );
  return (
    <GorhomBottomSheetModal
      ref={ref}
      handleComponent={() => DefaultHandle(handleColor)}
      backgroundComponent={withBlur ? Blur : renderBackground}
      backdropComponent={withBackDrop ? Backdrop : undefined}
      {...props}
    >
      {children}
    </GorhomBottomSheetModal>
  );
};

const BottomSheetReg: React.ForwardRefRenderFunction<
  BottomSheetMethods,
  BottomSheetProps
> = ({ withBackDrop, handleColor, ...props }, ref) => {
  return (
    <GorhomBottomSheet
      ref={ref}
      backgroundComponent={Blur}
      backdropComponent={withBackDrop ? Backdrop : undefined}
      handleComponent={() => DefaultHandle(handleColor)}
      {...props}
    />
  );
};

const BottomSheetModalWithTextInputInner: React.ForwardRefRenderFunction<
  BottomSheetModalMethods,
  PropsWithChildren<BottomSheetModalProps>
> = (
  { withBackDrop, withBlur, backgroundColor, handleColor, children, ...props },
  ref
) => {
  const renderBackground = () => (
    <BottomSheetBackgroundComponent backgroundColor={backgroundColor} />
  );
  return (
    <GorhomBottomSheetModal
      backgroundComponent={withBlur ? Blur : renderBackground}
      backdropComponent={withBackDrop ? Backdrop : undefined}
      handleComponent={() => DefaultHandle(handleColor)}
      ref={ref}
      keyboardBehavior={Platform.OS === 'android' ? 'interactive' : 'extend'}
      android_keyboardInputMode='adjustResize'
      {...props}
    >
      <BottomSheetBackHandler
        sheetRef={ref as BottomSheetBackHandlerProps['sheetRef']}
      />
      {children}
    </GorhomBottomSheetModal>
  );
};

export const BottomSheet = forwardRef(BottomSheetReg);

export const BottomSheetModal = forwardRef(BottomSheetModalInner);
export const BottomSheetModalWithoutBackHandler = forwardRef(
  BottomSheetModalWithoutBackHandlerInner
);
export const BottomSheetModalWithTextInput = forwardRef(
  BottomSheetModalWithTextInputInner
);

export const BottomSheetBackgroundComponent: React.FC<{
  backgroundColor?: keyof Theme['colors'];
}> = ({ backgroundColor }) => {
  return (
    <View
      style={[StyleSheet.absoluteFill]}
      borderTopLeftRadius='l'
      borderTopRightRadius='l'
      overflow='hidden'
      backgroundColor={backgroundColor ?? 'background'}
    />
  );
};
