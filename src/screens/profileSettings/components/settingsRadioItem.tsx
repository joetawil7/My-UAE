import { View, Text, TouchableOpacity } from '@components/base';
import { Translation, useTranslate } from '@localization';
import { useShopifyTheme } from '@theme/theme';
import { RadioButtonType } from '@types';
import React from 'react';
import { RadioButton } from 'react-native-radio-buttons-group';

interface Props {
  radioButtons: RadioButtonType[];
  selectedId: string;
  setSelectedId: (selectedId: string) => void;
  header?: keyof Translation;
  footer?: keyof Translation;
}

export const SettingsRadioItem = (props: Props) => {
  const { radioButtons, selectedId, setSelectedId, header, footer } = props;

  const theme = useShopifyTheme();
  const { t } = useTranslate();

  return (
    <View>
      {header && (
        <Text marginBottom='l' variant='poppins_m_bold'>
          {t(header)}
        </Text>
      )}
      {radioButtons.map((item) => (
        <TouchableOpacity
          flexDirection='row'
          justifyContent='space-between'
          onPress={() => setSelectedId(item.id)}
          activeOpacity={0.9}
          marginBottom='m'
          key={item.id}
        >
          <Text>{t(item.label as keyof Translation)}</Text>
          <RadioButton
            selected={selectedId === item.id}
            onPress={setSelectedId}
            id={item.id}
            borderColor={
              selectedId === item.id ? theme.colors.primary : undefined
            }
            color={selectedId === item.id ? theme.colors.primary : undefined}
            size={20}
          />
        </TouchableOpacity>
      ))}
      {footer && (
        <Text color='grayDark' variant='poppins_s'>
          {t(footer)}
        </Text>
      )}
    </View>
  );
};
