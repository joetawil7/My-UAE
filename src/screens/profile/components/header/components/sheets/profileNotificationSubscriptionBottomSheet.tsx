import {
  BottomSheetModal,
  View,
  Text,
  TouchableOpacity,
  Icon,
} from '@components/base';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useTranslate } from '@localization';
import { NotificationSubscriptionApi, RequestQueue } from '@services';
import React, { forwardRef, useCallback, useEffect, useState } from 'react';

interface Props {
  userId: string;
}

const ProfileNotificationSubscriptionBottomSheetRaw: React.ForwardRefRenderFunction<
  BottomSheetModalMethods,
  Props
> = ({ userId }, ref) => {
  const [postSubbed, setPostSubbed] = useState<boolean>();

  const { t } = useTranslate();

  const getUserNotificationSubscription = useCallback(async () => {
    if (userId) {
      try {
        const response = await RequestQueue.executeInQueue(
          'notificationSubscriptionRequest',
          userId,
          () =>
            NotificationSubscriptionApi.getUserNotificationSubscription(userId)
        );

        setPostSubbed(response.post);
      } catch (e: any) {
        /* empty */
      }
    }
  }, [userId]);

  useEffect(() => {
    getUserNotificationSubscription();
  }, [getUserNotificationSubscription]);

  const subscribe = async (type: string) => {
    setPostSubbed(true);
    try {
      await RequestQueue.executeInQueue(
        'notificationSubscriptionRequest',
        userId,
        () =>
          NotificationSubscriptionApi.notificationSubscribeUser(userId, type)
      );
    } catch (e: any) {
      setPostSubbed(false);
    }
  };

  const unsubscribe = async (type: string) => {
    setPostSubbed(false);
    try {
      await RequestQueue.executeInQueue(
        'notificationSubscriptionRequest',
        userId,
        () =>
          NotificationSubscriptionApi.notificationUnsubscribeUser(userId, type)
      );
    } catch (e: any) {
      setPostSubbed(true);
    }
  };

  return (
    <BottomSheetModal withBackDrop ref={ref} index={0} snapPoints={['50%']}>
      <View paddingHorizontal='m'>
        <View borderBottomColor='secondary' borderBottomWidth={1}>
          <TouchableOpacity
            flexDirection='row'
            alignItems='center'
            justifyContent='space-between'
            paddingVertical='s'
            onPress={() =>
              postSubbed ? unsubscribe('Post') : subscribe('Post')
            }
          >
            <Text>{t('posts')}</Text>
            {postSubbed && <Icon name='check-mark' />}
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheetModal>
  );
};

const ProfileNotificationSubscriptionBottomSheetRef = forwardRef(
  ProfileNotificationSubscriptionBottomSheetRaw
);

export const ProfileNotificationSubscriptionBottomSheet = React.memo(
  ProfileNotificationSubscriptionBottomSheetRef
);
