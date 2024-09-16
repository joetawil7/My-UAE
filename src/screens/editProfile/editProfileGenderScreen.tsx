import { ScreenShell, Text, TouchableOpacity } from '@components/base';
import { NavigationHeader } from '@components/navigationHeader';
import { useNavigation } from '@navigation/navigationElements';
import React, { useState } from 'react';
import { AccountApi } from '@services/api';
import { UserInfo, Gender } from '@types';
import { useAuthentication } from '@services';
import { useTranslate } from '@localization';
import { ProfileGenderSelection } from '@components/profile/profileGenderSelection';

export const EditProfileGenderScreen = () => {
  const { authenticatedUser, setAuthenticatedUser } = useAuthentication();
  const [gender, setGender] = useState<Gender>(
    authenticatedUser?.gender ?? 'Male'
  );
  const [loading, setLoading] = useState(false);

  const { t } = useTranslate();
  const navigation = useNavigation();

  const doneDisabled = gender === authenticatedUser?.gender;

  const onDone = async () => {
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
      navigation.goBack();
    } catch (e: any) {
      /* empty */
    }

    setLoading(false);
  };

  return (
    <ScreenShell>
      <NavigationHeader
        withBack
        title={t('gender')}
        rightHeader={
          <TouchableOpacity disabled={doneDisabled} onPress={onDone}>
            <Text color={doneDisabled ? 'grayDark' : 'primary'}>
              {t('done')}
            </Text>
          </TouchableOpacity>
        }
        rightLoading={loading}
      />

      <ProfileGenderSelection gender={gender} setGender={setGender} />
    </ScreenShell>
  );
};
