import React, { useRef, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  FadingView,
  Header,
  ScrollHeaderProps,
} from '@codeherence/react-native-header';
import { Text, IconButton } from '@components/base';
import { useNavigation } from '@navigation/navigationElements';
import { UserInfo } from '@types';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { ChevronLeft } from '@icons/rtl';
import { useTranslate } from '@localization';
import { UserOptionsBottomSheet } from './sheets/userOptionsBottomSheet';
import { ProfileNotificationSubscriptionBottomSheet } from './sheets/profileNotificationSubscriptionBottomSheet';
import { BlockConfirmationBottomSheet } from './sheets/blockConfirmationBottomSheet';

interface Props {
  userInfo: UserInfo;
}

const ROOT_HORIZONTAL_PADDING = 16;

const HeaderOptionsRaw: React.FC<ScrollHeaderProps & Props> = ({
  userInfo,
  showNavBar,
}) => {
  const { left, right } = useSafeAreaInsets();

  const navigation = useNavigation();
  const { t } = useTranslate();

  const userSettingsBottomSheetModalRef = useRef<BottomSheetModalMethods>(null);
  const notificationBottomSheetModalRef = useRef<BottomSheetModalMethods>(null);
  const blockConfirmationBottomSheetModalRef =
    useRef<BottomSheetModalMethods>(null);

  const handleNotificationPresentModalPress = useCallback(() => {
    notificationBottomSheetModalRef.current?.present();
  }, []);
  const handleBlockConfirmationPresentModalPress = useCallback(() => {
    blockConfirmationBottomSheetModalRef.current?.present();
  }, []);

  return (
    <>
      <Header
        showNavBar={showNavBar}
        headerCenterFadesIn={false}
        headerStyle={{ backgroundColor: 'transparent' }}
        noBottomBorder
        headerRight={
          <>
            <UserOptionsBottomSheet
              ref={userSettingsBottomSheetModalRef}
              onBlock={handleBlockConfirmationPresentModalPress}
            />
            {userInfo && (
              <IconButton
                name='notification-add'
                circle
                backgroundColor='grayTransparent'
                size={16}
                onPress={handleNotificationPresentModalPress}
              />
            )}
          </>
        }
        headerRightStyle={[
          styles.headerRightStyle,
          { paddingLeft: Math.max(right, ROOT_HORIZONTAL_PADDING) },
        ]}
        headerLeft={
          <>
            <IconButton
              name={ChevronLeft}
              onPress={() => navigation.canGoBack() && navigation.goBack()}
              circle
              backgroundColor='grayTransparent'
            />
            <FadingView opacity={showNavBar}>
              <Text variant='poppins_s_medium'>@{userInfo.username}</Text>
              <Text variant='poppins_xs'>
                {userInfo.stats?.followersCount ?? 0} {t('followers')}
              </Text>
            </FadingView>
          </>
        }
        headerLeftStyle={[
          styles.headerLeftStyle,
          { paddingLeft: Math.max(left, ROOT_HORIZONTAL_PADDING) },
        ]}
      />

      {userInfo && (
        <ProfileNotificationSubscriptionBottomSheet
          ref={notificationBottomSheetModalRef}
          userId={userInfo.id}
        />
      )}

      {userInfo && (
        <BlockConfirmationBottomSheet
          ref={blockConfirmationBottomSheetModalRef}
          userId={userInfo.id}
          username={userInfo.username as string}
          profilePicture={userInfo.profilePicture?.url}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  headerRightStyle: { gap: 6, paddingLeft: 16 },
  headerLeftStyle: { gap: 16, paddingLeft: 16 },
});

export const HeaderOptions = React.memo(HeaderOptionsRaw);
