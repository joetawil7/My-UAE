import { Icon, KeyboardAvoidingView, TouchableOpacity } from '@components/base';
import { CustomTextInput } from '@components';
import React from 'react';
import { useShopifyTheme } from '@theme';

interface Props {
  value: string;
  setValue: (value: string) => void;
  withoutCancel?: boolean;
  multiline?: boolean;
  autoHeight?: boolean;
  numberOfLines?: number;
}

const EditProfileTextInputRaw = (props: Props) => {
  const {
    value,
    setValue,
    withoutCancel,
    multiline,
    autoHeight,
    numberOfLines,
  } = props;

  const theme = useShopifyTheme();

  return (
    <KeyboardAvoidingView>
      <CustomTextInput
        textInputProps={{
          style: {
            backgroundColor: theme.colors.background,
            borderRadius: 0,
          },
          borderRadius: undefined,
          autoFocus: true,
          multiline,
          numberOfLines,
        }}
        height={autoHeight ? undefined : 36}
        value={value}
        onValueChange={setValue}
        borderBottomColor='secondary'
        borderBottomWidth={1}
        paddingBottom='2xs'
        keyboardType='twitter'
        suffixElement={
          withoutCancel ? undefined : value.length === 0 ? undefined : (
            <TouchableOpacity
              borderRadius='max'
              backgroundColor='grayDark'
              alignItems='center'
              justifyContent='center'
              height={18}
              width={18}
              activeOpacity={0.5}
              onPress={() => setValue('')}
            >
              <Icon size={9} name='x' />
            </TouchableOpacity>
          )
        }
      />
    </KeyboardAvoidingView>
  );
};

export const EditProfileTextInput = React.memo(EditProfileTextInputRaw);
