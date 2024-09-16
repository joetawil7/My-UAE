import React from 'react';
import { Translation, useTranslate } from '@localization';
import { Gender } from '@types';
import { TouchableOpacity, View, Text } from '../base';
import { CheckBox } from '../checkBox';

interface Props {
  gender: Gender;
  setGender: (gender: Gender) => void;
}

export const ProfileGenderSelection = (props: Props) => {
  const { gender, setGender } = props;

  const { t } = useTranslate();

  const renderItem = (_gender: Gender) => {
    let text: keyof Translation = 'male';
    switch (_gender) {
      case 'Male':
        text = 'male';
        break;
      case 'Female':
        text = 'female';
        break;
      default:
        text = 'prefer_not_say';
        break;
    }

    return (
      <TouchableOpacity
        onPress={() => setGender(_gender)}
        flexDirection='row'
        justifyContent='space-between'
        paddingBottom='m'
      >
        <Text>{t(text)}</Text>
        <CheckBox
          value={gender === _gender}
          onValueChange={() => setGender(_gender)}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View paddingHorizontal='m' paddingTop='xl'>
      <View>
        {renderItem('Male')}
        {renderItem('Female')}
        {renderItem('Unknown')}
      </View>
    </View>
  );
};
