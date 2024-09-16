import {
  BottomSheetModal,
  View,
  Text,
  TouchableOpacity,
} from '@components/base';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useTranslate } from '@localization';
import { RequestQueue, UserFollowAPi } from '@services';
import React, { MutableRefObject, forwardRef } from 'react';

interface Props {
  userId?: string;
  setFollowed: (followed: boolean) => void;
}

const ProfileFollowedModal: React.ForwardRefRenderFunction<
  BottomSheetModalMethods,
  Props
> = ({ userId, setFollowed }, ref) => {
  const { t } = useTranslate();

  const unfollowUser = async () => {
    if (userId) {
      try {
        (ref as MutableRefObject<BottomSheetModalMethods>).current?.dismiss();
        setFollowed(false);
        await RequestQueue.executeInQueue('userFollow', userId, () =>
          UserFollowAPi.unfollowUser(userId)
        );
      } catch (e: any) {
        setFollowed(true);
      }
    }
  };

  return (
    <BottomSheetModal withBackDrop ref={ref} index={0} snapPoints={['50%']}>
      <View paddingHorizontal='m'>
        <View borderBottomColor='secondary' borderBottomWidth={1}>
          <TouchableOpacity onPress={unfollowUser} paddingVertical='s'>
            <Text>{t('unfollow')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheetModal>
  );
};

export default forwardRef(ProfileFollowedModal);
