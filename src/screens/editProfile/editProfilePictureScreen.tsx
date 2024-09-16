import { useNavigation } from '@navigation/navigationElements';
import React from 'react';
import { ProfilePictureUpload } from '@components';

export const EditProfilePictureScreen = () => {
  const navigation = useNavigation();

  return (
    <ProfilePictureUpload
      onBack={navigation.goBack}
      onNext={navigation.goBack}
      rightText='done'
      title='profile_picture'
      isRequired
    />
  );
};
