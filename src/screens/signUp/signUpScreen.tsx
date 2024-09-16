import React, { useState } from 'react';
import {
  View,
  Text,
  ScreenShell,
  TouchableOpacity,
  KeyboardAwareScrollView,
  Image,
  Button,
} from '@components/base';
import { NavigationHeader } from '@components';
import {
  NavigationElement,
  useNavigation,
} from '@navigation/navigationElements';
import { useTranslate } from '@localization';
import { stylesConstants } from '@/src/styles';
import ImagePicker, {
  Image as CropImage,
} from 'react-native-image-crop-picker';
import { constants } from '@/src/globals';

export const SignUpScreen = () => {
  const [image, setImage] = useState<CropImage>();
  const [loading, setLoading] = useState(false);

  const { t } = useTranslate();
  const navigation = useNavigation();

  const chooseProfilePic = async () => {
    setLoading(true);
    try {
      const asset = await ImagePicker.openPicker({
        width: constants.PROFILE_PICTURE_SIZE,
        height: constants.PROFILE_PICTURE_SIZE,
        cropping: true,
        mediaType: 'photo',
        compressImageQuality: 0.7,
      });

      setImage(asset);
    } catch (e) {
      /* empty */
    }

    setLoading(false);
  };

  return (
    <ScreenShell withoutBottom backgroundColor="primary">
      <KeyboardAwareScrollView scrollEnabled={false} backgroundColor={'white'}>
        <NavigationHeader
          leftHeader={
            <TouchableOpacity
              onPress={() => navigation.navigate(NavigationElement.LoginScreen)}
            >
              <Text variant={stylesConstants.SMALL_FONT} color="grayDarker">
                {t('cancel')}
              </Text>
            </TouchableOpacity>
          }
          title={t('sign_up')}
          withoutBorder
        />
        <View
          flexGrow={1}
          marginTop={stylesConstants.NAV_HEADER_BOTTOM_MARGIN}
          paddingHorizontal="m"
          alignItems="center"
          gap="l"
          maxWidth={600}
          alignSelf="center"
        >
          <View>
            <View>
              <Image
                height={160}
                width={160}
                borderRadius="max"
                source={
                  image
                    ? {
                        uri: image?.path,
                      }
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
            bottom={16}
            width="100%"
            flexDirection="row"
            marginTop="m"
            paddingHorizontal="m"
          >
            <Button
              wide
              onPress={chooseProfilePic}
              label={t('upload')}
              gradientVariant="primary"
            />
          </View>
          <Text textAlign="center" variant={stylesConstants.HEADER_FONT}>
            {t('please_verify_email')}
          </Text>
          <Text textAlign="center" color="grayDark" marginTop="s">
            {t('code_sent_to')}:{'\n'}
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </ScreenShell>
  );
};
