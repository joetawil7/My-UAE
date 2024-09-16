import React from 'react';
import { StyleProp, TextInput, ViewStyle } from 'react-native';
import { CustomTextInput } from './textInput';
import { TypeHelper } from '../utils';

interface Props {
  style?: StyleProp<ViewStyle>;
  value: string;
  onValueChanged: (value: string) => void;
  iconEnd?: JSX.Element;
  onError?: boolean;
  onEndEditing?: () => void;
}

export const DateInput = React.forwardRef<TextInput, Props>(
  (props, ref): JSX.Element => {
    const { style, value, onValueChanged, iconEnd, onError, onEndEditing } =
      props;

    const onDateChanged = (_value: string) => {
      let newDate = _value;

      let [dd, mm, yyyy] = newDate.split('/').map((p) => parseInt(p, 10));

      const isDelete = newDate.length < value.length;
      if (isDelete) {
        if (value[value.length - 1] === '/') {
          newDate = newDate.substring(0, newDate.length - 1);
        }
      }

      if (
        newDate.length === 2 ||
        newDate.length === 5 ||
        newDate.length === 10
      ) {
        const currentYear = new Date().getFullYear();

        dd = TypeHelper.isNumber(dd) ? dd : 1;
        mm = TypeHelper.isNumber(mm) ? mm - 1 : 0;
        yyyy = TypeHelper.isNumber(yyyy) ? yyyy : currentYear;

        const date = new Date(yyyy, mm, dd);

        const valid =
          dd === date.getDate() &&
          mm === date.getMonth() &&
          yyyy === date.getFullYear();

        if (!valid) {
          return;
        }

        if (!isDelete) {
          if (newDate.length === 2) {
            newDate += '/';
          } else if (newDate.length === 5) {
            newDate += '/';
          }
        }
      } else if (newDate.length === 11) {
        return;
      }

      onValueChanged(newDate);
    };

    return (
      <CustomTextInput
        style={style}
        placeholder='DD/MM/YYYY'
        value={value}
        onValueChange={onDateChanged}
        keyboardType='number-pad'
        suffixElement={iconEnd}
        onError={onError}
        onEndEditing={onEndEditing}
        ref={ref}
      />
    );
  }
);
