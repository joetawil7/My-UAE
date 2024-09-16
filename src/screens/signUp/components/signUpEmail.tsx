import { CustomTextInput } from '@components';
import { useTranslate } from '@localization';
import { validators } from '@utils';
import React, { useEffect, useRef, useState } from 'react';
import { TextInput } from 'react-native';

interface Props {
  email: string;
  setEmail: (email: string) => void;
  setValid: (valid: boolean) => void;
  flatListIndex: number;
  ownIndex: number;
}

const SignUpEmailRaw = React.forwardRef<TextInput, Props>((props, ref) => {
  const { email, setEmail, setValid, flatListIndex, ownIndex } = props;

  const [emailError, setEmailError] = useState(false);

  const timeout = useRef<number | undefined>();

  const { t } = useTranslate();

  useEffect(() => {
    if (flatListIndex === ownIndex) {
      (ref as React.RefObject<TextInput>).current?.focus();

      const valid = validators.validateEmail(email);

      if (timeout.current != null) {
        clearTimeout(timeout.current);
      }

      if (valid && email.length !== 0) {
        setValid(true);
      } else {
        setValid(false);
      }

      if (valid || email.length === 0) {
        setEmailError(false);
      } else {
        timeout.current = window.setTimeout(() => {
          setEmailError(true);
        }, 1000);
      }
    }
  }, [email, flatListIndex, ownIndex, ref, setValid]);

  return (
    <CustomTextInput
      value={email}
      onValueChange={(value) => setEmail(value.toLocaleLowerCase())}
      placeholder={t('email')}
      onError={emailError}
      keyboardType='email-address'
      ref={ref}
    />
  );
});

export const SignUpEmail = React.memo(SignUpEmailRaw);
