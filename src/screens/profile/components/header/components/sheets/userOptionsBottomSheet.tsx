/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  BottomSheetModal,
  Icon,
  IconButton,
  TouchableOpacity,
  View,
  Text,
} from '@components/base';
import React from 'react';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { ICON_SIZE } from '@assets';
import { useTranslate } from '@localization';

interface Props {
  onBlock: () => void;
}

export const UserOptionsBottomSheet = React.forwardRef<
  BottomSheetModalMethods,
  Props
>((props, ref) => {
  const { onBlock } = props;

  const { t } = useTranslate();

  const onPress = () => {
    // @ts-ignore
    ref.current.present();
  };

  return (
    <>
      <IconButton
        name='3-dots-horizontal'
        circle
        backgroundColor='grayTransparent'
        size={17}
        onPress={onPress}
      />
      <BottomSheetModal ref={ref} snapPoints={['40%']} withBackDrop>
        <View
          flex={1}
          backgroundColor='secondary'
          marginTop='m'
          marginBottom='2xl'
          marginHorizontal='m'
          borderRadius='m'
          paddingHorizontal='m'
        >
          <TouchableOpacity
            flexDirection='row'
            alignItems='center'
            gap='s'
            paddingVertical='m'
            onPress={() => {
              // @ts-ignore
              ref.current.dismiss();
              onBlock();
            }}
          >
            <Icon name='user-block' size={ICON_SIZE.l} color='danger' />
            <Text variant='poppins_l' color='danger'>
              {t('block')}
            </Text>
          </TouchableOpacity>
          <View height={1} backgroundColor='grayDarker' />
        </View>
      </BottomSheetModal>
    </>
  );
});
