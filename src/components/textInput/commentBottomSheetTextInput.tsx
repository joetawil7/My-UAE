import React from 'react';
import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  StyleProp,
  TextInputEndEditingEventData,
  I18nManager,
  TextStyle,
  Platform,
} from 'react-native';
import { Theme, useShopifyTheme } from '@theme';
import { BottomSheetTextInput as GorhomTextInput } from '@gorhom/bottom-sheet';
import { BottomSheetTextInputProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetTextInput';
import { TextInput } from 'react-native-gesture-handler';
import { IconButton, View } from '../base';

type Props = {
  value: string;
  onValueChange: (value: string) => void;
  onSubmit: () => void;
  style?: StyleProp<TextStyle>;
  placeholder?: string;
  secureTextEntry?: boolean;
  onEndEditing?: (
    e: NativeSyntheticEvent<TextInputEndEditingEventData>
  ) => void;
  keyboardType?: KeyboardTypeOptions;
  textContentType?: 'password';
  color?: keyof Theme['colors'];
  backgroundColor?: keyof Theme['colors'];
  borderColor?: keyof Theme['colors'];
  textInputProps?: Omit<BottomSheetTextInputProps, 'textAlign'>;
  isBottomSheet?: boolean;
};

const CommentTextInputRaw = React.forwardRef<TextInput, Props>((props, ref) => {
  const {
    style,
    value,
    onValueChange,
    onEndEditing,
    keyboardType,
    placeholder,
    secureTextEntry,
    color,
    textContentType,
    textInputProps,
    backgroundColor,
    borderColor,
    onSubmit,
    isBottomSheet,
  } = props;

  const theme = useShopifyTheme();

  return (
    <View flexGrow={1}>
      {isBottomSheet ? (
        <GorhomTextInput
          onEndEditing={onEndEditing}
          style={[
            {
              minHeight: 40,
              maxHeight: 105,
              backgroundColor: backgroundColor
                ? theme.colors[backgroundColor as keyof Theme['colors']]
                : theme.colors.background,
              borderRadius: 24,
              margin: 1,
              color: color ? theme.colors[color] : 'white',
              paddingHorizontal: theme.spacing.m,
              paddingTop: Platform.OS === 'ios' ? 9 : 0,
              fontSize: 16,
              borderWidth: 1,
              borderColor: borderColor
                ? theme.colors[borderColor as keyof Theme['colors']]
                : theme.colors.secondary,
            },
            style,
          ]}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.grayDark}
          defaultValue={value}
          onChangeText={onValueChange}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          clearTextOnFocus={false}
          textContentType={textContentType}
          autoComplete='off'
          textAlign={I18nManager.isRTL ? 'right' : 'left'}
          keyboardAppearance={theme.themeType}
          textAlignVertical='center'
          autoFocus={false}
          multiline
          ref={ref}
          {...textInputProps}
        />
      ) : (
        <TextInput
          onEndEditing={onEndEditing}
          style={[
            {
              minHeight: 40,
              maxHeight: 105,
              backgroundColor: backgroundColor
                ? theme.colors[backgroundColor as keyof Theme['colors']]
                : theme.colors.background,
              borderRadius: 24,
              margin: 1,
              color: color ? theme.colors[color] : 'white',
              paddingHorizontal: theme.spacing.m,
              paddingTop: Platform.OS === 'ios' ? 9 : 0,
              fontSize: 16,
              borderWidth: 1,
              borderColor: borderColor
                ? theme.colors[borderColor as keyof Theme['colors']]
                : theme.colors.secondary,
            },
            style,
          ]}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.grayDark}
          defaultValue={value}
          onChangeText={onValueChange}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          clearTextOnFocus={false}
          textContentType={textContentType}
          autoComplete='off'
          textAlign={I18nManager.isRTL ? 'right' : 'left'}
          keyboardAppearance={theme.themeType}
          textAlignVertical='center'
          autoFocus={false}
          multiline
          ref={ref}
          {...textInputProps}
        />
      )}

      <View
        position='absolute'
        right={16}
        height='100%'
        top={0}
        justifyContent='center'
      >
        <IconButton
          onPress={() => {
            onSubmit();
          }}
          name='chevron-right'
          color={value.length > 0 ? 'white' : 'grayDark'}
          disabled={value.length <= 0}
        />
      </View>
    </View>
  );
});

export const CommentTextInput = React.memo(CommentTextInputRaw);
