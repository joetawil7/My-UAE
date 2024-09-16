import React, { useState } from 'react';
import { TypeHelper } from '@utils';
import moment from 'moment';
import { useTranslate } from '@localization';
import { TextInput } from 'react-native';
import { DateInput } from './dateInput';
import { Icon } from './base/icon';
import { useGlobalNotifications } from './globalNotifications';

interface Props {
  initialDate?: string;
  setBirthDate: (birthDate: string) => void;
  setDateValid: (valid: boolean) => void;
  onError?: boolean;
  onEndEditing?: () => void;
}

const BirthDateInputRaw = React.forwardRef<TextInput, Props>((props, ref) => {
  const { initialDate, setBirthDate, setDateValid, onError, onEndEditing } =
    props;
  const [birthDateTemp, setBirthDateTemp] = useState(initialDate ?? '');

  const { t } = useTranslate();
  const { makeToast } = useGlobalNotifications();

  const handleSetDate = (_date: string) => {
    let newDate = _date;
    const currentYear = new Date().getFullYear();
    const dateParts = newDate.split('/').map((p) => parseInt(p, 10));
    let yyyy = dateParts[2];
    yyyy = TypeHelper.isNumber(yyyy) ? yyyy : currentYear;

    if (newDate.length === 10) {
      const age = currentYear - yyyy;
      const validYear = age >= 13 && age < 130;
      let message = t('age_restriction');
      if (age > 130) {
        message = t('invalid_date');
      }
      if (!validYear) {
        newDate = newDate.substring(0, 6);
        makeToast({ message, position: 'top' });
      }
    }

    setBirthDateTemp(newDate);

    const dateCorrect = /^(?:\d{2}\/){2}\d{4}$/.test(newDate);

    setDateValid(dateCorrect);

    if (dateCorrect) {
      const date = moment.utc(newDate, 'DD-MM-YYYY');

      setBirthDate(date.toDate().toISOString());
    } else {
      setBirthDate('');
    }
  };

  return (
    <DateInput
      value={birthDateTemp}
      onValueChanged={handleSetDate}
      iconEnd={<Icon name='birthday-cake' gradientVariant='primary' />}
      onError={onError}
      onEndEditing={onEndEditing}
      ref={ref}
    />
  );
});

export const BirthDateInput = React.memo(BirthDateInputRaw);
