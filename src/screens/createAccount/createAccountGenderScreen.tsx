import { CheckBox, NavigationHeader } from '@components';
import { ScreenShell, TouchableOpacity, Text, View } from '@components/base';
import { Translation, useTranslate } from '@localization';
import {
  NavigationElement,
  useNavigation,
} from '@navigation/navigationElements';
import { AccountApi, useAuthentication } from '@services';
import { UserInfo, Gender } from '@types';
import React, { useState } from 'react';

export const CreateAccountGenderScreen = () => {
  const { authenticatedUser, setAuthenticatedUser } = useAuthentication();

  const [gender, setGender] = useState<Gender>(
    authenticatedUser?.gender ?? 'Male'
  );
  const [loading, setLoading] = useState(false);

  const { t } = useTranslate();
  const navigation = useNavigation();

  const onDone = async () => {
    if (gender === authenticatedUser?.gender) {
      navigation.push(NavigationElement.CreateAccountPolicyScreen);
      return;
    }

    try {
      setLoading(true);

      await AccountApi.updateGender(gender);

      if (authenticatedUser) {
        const modifiedUser: UserInfo = {
          ...authenticatedUser,
          gender,
        };

        setAuthenticatedUser(modifiedUser);
      }
      navigation.push(NavigationElement.CreateAccountPolicyScreen);
    } catch (e: any) {
      /* empty */
    }

    setLoading(false);
  };

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
    <ScreenShell>
      <NavigationHeader
        withBack
        title={t('gender')}
        rightHeader={
          <TouchableOpacity onPress={onDone}>
            <Text color='primary'>{t('next')}</Text>
          </TouchableOpacity>
        }
        rightLoading={loading}
      />

      <View paddingHorizontal='m' paddingTop='xl'>
        <View gap='m'>
          {renderItem('Male')}
          {renderItem('Female')}
          {renderItem('Unknown')}
        </View>
      </View>
    </ScreenShell>
  );
};
