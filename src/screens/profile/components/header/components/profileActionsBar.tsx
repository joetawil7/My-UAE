import { IconButton, LinearGradient, View } from '@components/base';
import { SmallButton } from '@components';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { UserInfo } from '@types';
import { UserFollowAPi } from '@services/api';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import {
  NavigationElement,
  useNavigation,
} from '@navigation/navigationElements';
import { useTranslate } from '@localization';
import { RequestQueue } from '@services';
import { Globals } from '@globals';
import ProfileFollowedModal from './profileFollowedModal';

interface Props {
  userInfo: UserInfo;
}

export const ProfileActionsBarRaw = (props: Props) => {
  const { userInfo } = props;

  const isOwnProfile = Globals.userId === userInfo.id;

  const [followed, setFollowed] = useState(
    userInfo.relationship?.isFollowed ?? false
  );
  const [subscribed, setSubscribed] = useState(false);

  const bottomSheetModalRef = useRef<BottomSheetModalMethods>(null);

  const navigation = useNavigation();
  const { t } = useTranslate();

  const followUser = useCallback(async () => {
    if (userInfo.id) {
      try {
        setFollowed((prev) => !prev);

        if (!followed) {
          await RequestQueue.executeInQueue('userFollow', userInfo.id, () =>
            UserFollowAPi.followUser(userInfo?.id)
          );
        }
      } catch (e: any) {
        /* empty */
        setFollowed((prev) => !prev);
      }
    }
  }, [followed, userInfo?.id]);

  const subscribeUser = useCallback(async () => {
    if (userInfo.id) {
      try {
        setSubscribed((prev) => !prev);
      } catch (e: any) {
        /* empty */
        setSubscribed((prev) => !prev);
      }
    }
  }, [userInfo.id]);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const renderSubscribeButton = useMemo(
    () =>
      !subscribed ? (
        <View
          borderRadius='max'
          height={32}
          width={32}
          alignItems='center'
          justifyContent='center'
        >
          <LinearGradient
            borderRadius='max'
            position='absolute'
            height='100%'
            width='100%'
            variant='secondary'
          />
          <IconButton
            name='star-filled'
            color='background'
            onPress={subscribeUser}
          />
        </View>
      ) : (
        <IconButton
          name='user-subscribe'
          withBorder
          borderRadius='max'
          onPress={subscribeUser}
        />
      ),
    [subscribeUser, subscribed]
  );

  const renderFollowButton = useMemo(
    () =>
      followed ? (
        <IconButton
          onPress={handlePresentModalPress}
          name='user-followed'
          withBorder
          borderRadius='max'
        />
      ) : (
        <SmallButton
          onPress={followUser}
          gradientVariant='primary'
          label={t('follow')}
          color='black'
        />
      ),
    [followUser, followed, handlePresentModalPress, t]
  );

  return (
    <View
      flexDirection='row'
      justifyContent='flex-end'
      alignItems='center'
      paddingVertical='s'
      gap='xs'
      marginBottom='2xs'
      minHeight={50}
    >
      {!isOwnProfile ? (
        <>
          <IconButton name='envelope' withBorder borderRadius='max' />
          {renderSubscribeButton}

          {renderFollowButton}
        </>
      ) : (
        <SmallButton
          onPress={() => navigation.push(NavigationElement.EditProfileStack)}
          color='white'
          borderColor='white'
          borderWidth={1}
          label={t('edit_profile')}
        />
      )}

      <ProfileFollowedModal
        ref={bottomSheetModalRef}
        userId={userInfo?.id}
        setFollowed={setFollowed}
      />
    </View>
  );
};

export const ProfileActionsBar = React.memo(ProfileActionsBarRaw);
