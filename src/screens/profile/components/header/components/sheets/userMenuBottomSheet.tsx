import { ICON_SIZE } from '@assets';
import { IconsId } from '@assets/icons/icons';
import {
  BottomSheetModal,
  Icon,
  View,
  Text,
  TouchableOpacity,
} from '@components/base';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useTranslate } from '@localization';
import {
  NavigationElement,
  useNavigation,
} from '@navigation/navigationElements';
import React, { forwardRef, useCallback } from 'react';

const UserMenuBottomSheetRaw: React.ForwardRefRenderFunction<
  BottomSheetModalMethods
> = (_props, ref) => {
  const { t } = useTranslate();

  const navigation = useNavigation();

  const openScreen = useCallback(
    (screen: NavigationElement) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line react/destructuring-assignment
      ref.current.dismiss();
      navigation.push(screen as any);
    },
    [navigation, ref]
  );

  const renderItem = useCallback(
    (title: string, icon: IconsId, screen: NavigationElement) => {
      return (
        <TouchableOpacity onPress={() => openScreen(screen)}>
          <View
            paddingVertical='m'
            flexDirection='row'
            alignItems='center'
            gap='m'
            borderBottomColor='secondary'
            borderBottomWidth={1}
          >
            <Icon name={icon} size={ICON_SIZE.xl} />
            <Text>{title}</Text>
          </View>
        </TouchableOpacity>
      );
    },
    [openScreen]
  );

  return (
    <BottomSheetModal withBackDrop ref={ref} index={0} snapPoints={['70%']}>
      <View paddingHorizontal='l'>
        {renderItem(
          t('settings'),
          'settings',
          NavigationElement.ProfileSettingsScreen
        )}
        {renderItem(t('saved'), 'history', NavigationElement.BookmarksScreen)}
      </View>
    </BottomSheetModal>
  );
};

const UserMenuBottomSheetRef = forwardRef(UserMenuBottomSheetRaw);

export const UserMenuBottomSheet = React.memo(UserMenuBottomSheetRef);
