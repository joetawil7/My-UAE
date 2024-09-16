import React from 'react';
import PhoneInput, { PhoneInputProps } from 'react-native-phone-number-input';

type Props = PhoneInputProps;

export const NumberInput = (props: Props) => {
  return (
    <PhoneInput
      defaultCode="AE"
      layout="first"
      withShadow
      containerStyle={{ borderRadius: 16, width: '100%' }}
      textContainerStyle={{ borderRadius: 16 }}
      {...props}
    />
  );
};
