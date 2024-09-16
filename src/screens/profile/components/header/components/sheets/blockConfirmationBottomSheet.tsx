import { ICON_SIZE } from '@assets';
import { BottomSheetModal, View, Text, Icon, Image } from '@components/base';
import { WideButton } from '@components';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useTranslate } from '@localization';
import { UserBlockApi } from '@services';
import React, { forwardRef } from 'react';

interface Props {
  userId: string;
  username: string;
  profilePicture?: string;
}

const BlockConfirmationBottomSheetRaw: React.ForwardRefRenderFunction<
  BottomSheetModalMethods,
  Props
> = ({ userId, username, profilePicture }, ref) => {
  const { t } = useTranslate();

  const onBlock = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line react/destructuring-assignment
      ref.current.dismiss();
      await UserBlockApi.blockUser(userId);
    } catch {
      /* empty */
    }
  };

  return (
    <BottomSheetModal withBackDrop ref={ref} index={0} snapPoints={['70%']}>
      <View
        alignItems='center'
        paddingHorizontal='xl'
        paddingVertical='m'
        gap='m'
      >
        <Image
          height={100}
          width={100}
          source={
            profilePicture
              ? { uri: profilePicture }
              : require('@assets/img/defaultProfile.png')
          }
          borderRadius='max'
        />

        <Text variant='poppins_xl_bold' textAlign='center'>
          {t('block')} {username}?
        </Text>

        <Text variant='poppins_s' textAlign='center' color='gray'>
          {t('will_block_all_accounts')}
        </Text>

        <View paddingLeft='m' paddingRight='s' gap='s' marginTop='xs'>
          <View alignSelf='flex-start' flexDirection='row' gap='s'>
            <Icon name='user-dismiss' size={ICON_SIZE.xl} />
            <Text variant='poppins_s'>{t('wont_message_or_find_you')}</Text>
          </View>
          <View
            alignSelf='flex-start'
            flexDirection='row'
            alignItems='center'
            gap='s'
          >
            <Icon name='notifications-off' size={ICON_SIZE.xl} />
            <Text variant='poppins_s'>{t('wont_notify_block')}</Text>
          </View>
          <View
            alignSelf='flex-start'
            flexDirection='row'
            alignItems='center'
            gap='s'
          >
            <Icon name='settings' size={ICON_SIZE.xl} />
            <Text variant='poppins_s'>{t('unblock_anytime_settings')}</Text>
          </View>
        </View>

        <WideButton
          marginTop='s'
          backgroundColor='primary'
          width='100%'
          onPress={onBlock}
          height={45}
          label={t('block')}
        />
      </View>
    </BottomSheetModal>
  );
};

const BlockConfirmationBottomSheetRef = forwardRef(
  BlockConfirmationBottomSheetRaw
);

export const BlockConfirmationBottomSheet = React.memo(
  BlockConfirmationBottomSheetRef
);
