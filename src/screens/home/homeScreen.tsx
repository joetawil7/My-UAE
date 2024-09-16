import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  LinearGradient,
  TouchableOpacity,
  ScreenShell,
  TextInput,
  IconButton,
} from '@components/base';
import {
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  TextInput as ReactNativeTextInput,
  Animated,
} from 'react-native';
import {
  NavigationElement,
  // useNavigation,
} from '@navigation/navigationElements';
import { stylesConstants } from '@styles';
import { GradientText } from '@components/gradientText';
import { useNavigation } from '@react-navigation/native';
import { UserApi } from '@services/api/user.api';
import { useTranslate } from '@localization';
import { EventRegister } from 'react-native-event-listeners';
import { Events, NormalPost, PostIsUploadingEvent } from '@types';
import { UserFeedApi } from '@services/api';
import { SmallButton } from '@components/customButton';
import { RequestQueue } from '@services';
import { NavigationHeader } from '@components/navigationHeader';
import { ICON_SIZE } from '@assets';
import { FlashList } from '@shopify/flash-list';
import { HomeFeed } from './homeFeed/homeFeed';

export const HomeScreen = ({ navigation }: any) => {
  const { t } = useTranslate();

  const navigateToUser = async () => {
    try {
      navigation.push(NavigationElement.UserProfileScreen, {
        user: {
          name: 'ribal',
          username: 'ribalo9',
          id: 'a0399c42-a5cf-4bc4-b2d0-61bf0730924f',
        },
      });
    } catch (e) {
      /* empty */
    }
  };

  return (
    <ScreenShell backgroundColor="background" withoutBottom withoutTop>
      <HomeFeed />

      <View position="absolute" flexDirection="row" bottom={0}>
        <SmallButton
          gradientVariant="primary"
          label="click me"
          onPress={navigateToUser}
          width={100}
        />

        <SmallButton
          margin="m"
          gradientVariant="primary"
          label="emit"
          onPress={() => {
            const postIsUploading: PostIsUploadingEvent = {
              normalPost: {
                content:
                  'I can only suggest that you add this exercise to your plan along with the right amount of protein and sleep schedule..',
                media: [
                  {
                    filename: 'ho',
                    mimeType: 'image/jpeg',
                    url: 'https://pocdev2.azureedge.net/test/fd98f948-78d5-4940-abf8-fd0c86eef78a?sv=2022-11-02&se=2023-10-13T15%3A04%3A34Z&sr=b&sp=r&sig=28ZV7Qm5ZMNJvaMGSNwm2kX1%2F0cmipXKaeCjPgNx2h4%3D',
                  },
                ],
              },
            };
            EventRegister.emit(Events.POST_IS_UPLOADING, postIsUploading);
          }}
          width={100}
        />

        <SmallButton
          margin="s"
          gradientVariant="primary"
          label="remove"
          onPress={() => {
            const postIsUploading: PostIsUploadingEvent = {
              normalPost: {
                content:
                  'I can only suggest that you add this exercise to your plan along with the right amount of protein and sleep schedule..',
                media: [
                  {
                    filename: 'ho',
                    mimeType: 'image/jpeg',
                    url: 'https://pocdev2.azureedge.net/test/fd98f948-78d5-4940-abf8-fd0c86eef78a?sv=2022-11-02&se=2023-10-13T15%3A04%3A34Z&sr=b&sp=r&sig=28ZV7Qm5ZMNJvaMGSNwm2kX1%2F0cmipXKaeCjPgNx2h4%3D',
                  },
                ],
              },
            };
            EventRegister.emit(Events.POST_UPLOADED, postIsUploading);
          }}
          width={100}
        />
      </View>
    </ScreenShell>
  );
};
