import React, { useState } from 'react';
import { Translation, useTranslate } from '@localization';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AccountApi, useAuthentication } from '@services';
import { UserInfo } from '@types';
import { ICON_SIZE } from '@assets';
import { ChevronLeft } from '@icons/rtl';
// import ImagePicker, {
//   Image as CropImage,
// } from 'react-native-image-crop-picker';
import { constants } from '@globals';
import {
  View,
  Image,
  ScreenShell,
  TouchableOpacity,
  Text,
  IconButton,
} from '../base';
import { NavigationHeader } from '../navigationHeader';
import { WideButton } from '../customButton';

interface Props {
  title: keyof Translation;
  rightText: keyof Translation;
  onBack: () => void;
  onNext: () => void;
  isRequired?: boolean;
  leftText?: keyof Translation;
}

const ProfilePictureUploadRaw = (props: Props) => {
  const { title, rightText, onBack, onNext, isRequired, leftText } = props;
  const { authenticatedUser, setAuthenticatedUser } = useAuthentication();

  const [image, setImage] = useState<CropImage>();
  const [loading, setLoading] = useState(false);

  const { t } = useTranslate();
  const { bottom } = useSafeAreaInsets();

  const doneDisabled =
    isRequired && image?.path === authenticatedUser?.profilePicture?.url;

  const chooseProfilePic = async () => {
    setLoading(true);
    try {
      // const asset = await ImagePicker.openPicker({
      //   width: constants.PROFILE_PICTURE_SIZE,
      //   height: constants.PROFILE_PICTURE_SIZE,
      //   cropping: true,
      //   mediaType: 'photo',
      //   compressImageQuality: 0.7,
      // });
      // setImage(asset);
    } catch (e) {
      /* empty */
    }

    setLoading(false);
  };

  const onPress = async () => {
    if (image?.path === authenticatedUser?.profilePicture?.url) {
      onNext();
      return;
    }

    setLoading(true);
    let file;
    try {
      if (image) {
        file = {
          name: image.filename,
          type: image.mime,
          uri: image.path,
        };
      }
      const response = await AccountApi.updateProfilePicture(file);

      if (authenticatedUser) {
        const modifiedUser: UserInfo = {
          ...authenticatedUser,
          profilePicture: response,
        };

        setAuthenticatedUser(modifiedUser);
      }
      onNext();
    } catch (e) {
      /* empty */
    }
    setLoading(false);
  };

  return (
    <ScreenShell>
      <NavigationHeader
        leftHeader={
          leftText ? (
            <TouchableOpacity onPress={onBack}>
              <Text color="white">{t(leftText)}</Text>
            </TouchableOpacity>
          ) : (
            <IconButton
              size={ICON_SIZE.l}
              name={ChevronLeft}
              onPress={onBack}
            />
          )
        }
        title={t(title)}
        rightHeader={
          <TouchableOpacity disabled={doneDisabled} onPress={onPress}>
            <Text color={doneDisabled ? 'grayDark' : 'primary'}>
              {t(rightText)}
            </Text>
          </TouchableOpacity>
        }
        rightLoading={loading}
      />
      <View
        position="absolute"
        height="100%"
        width="100%"
        alignItems="center"
        justifyContent="center"
        zIndex="none"
      >
        <View>
          <Image
            height={160}
            width={160}
            borderRadius="max"
            source={
              image || authenticatedUser?.profilePicture?.url
                ? { uri: image?.path ?? authenticatedUser?.profilePicture?.url }
                : require('@assets/img/defaultProfile.png')
            }
          />

          {image && (
            <TouchableOpacity
              position="absolute"
              bottom={-40}
              right={0}
              left={0}
              justifyContent="center"
              alignItems="center"
              flexShrink={1}
              onPress={() => setImage(undefined)}
            >
              <Text variant="poppins_m_medium" color="danger">
                {t('remove')}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View
        position="absolute"
        bottom={bottom + 16}
        width="100%"
        flexDirection="row"
        marginTop="m"
        paddingHorizontal="m"
      >
        <WideButton
          flexGrow={1}
          onPress={chooseProfilePic}
          label={t('upload')}
          gradientVariant="primary"
        />
      </View>
    </ScreenShell>
  );
};

export const ProfilePictureUpload = React.memo(ProfilePictureUploadRaw);
