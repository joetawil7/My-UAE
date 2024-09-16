import { ProfilePictureUpload } from '@components';
import {
  NavigationElement,
  useNavigation,
} from '@navigation/navigationElements';
import React from 'react';

export const CreateAccountProfilePictureScreen = () => {
  const navigation = useNavigation();

  return (
    <ProfilePictureUpload
      onBack={navigation.goBack}
      onNext={() => navigation.push(NavigationElement.CreateAccountNameScreen)}
      rightText='next'
      title='profile_picture'
      leftText='cancel'
    />
  );
};
