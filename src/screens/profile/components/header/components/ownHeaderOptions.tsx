import React, { useRef, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header, ScrollHeaderProps } from '@codeherence/react-native-header';
import { IconButton } from '@components/base';
import { UserInfo } from '@types';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { UserMenuBottomSheet } from './sheets/userMenuBottomSheet';

interface Props {
  userInfo: UserInfo;
}

const ROOT_HORIZONTAL_PADDING = 16;

const OwnHeaderOptionsRaw: React.FC<ScrollHeaderProps & Props> = ({
  userInfo,
  showNavBar,
}) => {
  const { right } = useSafeAreaInsets();

  const userMenuBottomSheetModalRef = useRef<BottomSheetModalMethods>(null);

  const openUserMenu = useCallback(() => {
    userMenuBottomSheetModalRef.current?.present();
  }, []);

  return (
    <>
      <Header
        showNavBar={showNavBar}
        headerCenterFadesIn={false}
        headerStyle={{ backgroundColor: 'transparent' }}
        noBottomBorder
        headerRight={
          <IconButton
            name='hamburger'
            circle
            backgroundColor='grayTransparent'
            size={16}
            onPress={openUserMenu}
          />
        }
        headerRightStyle={[
          styles.headerRightStyle,
          { paddingLeft: Math.max(right, ROOT_HORIZONTAL_PADDING) },
        ]}
      />

      {userInfo && <UserMenuBottomSheet ref={userMenuBottomSheetModalRef} />}
    </>
  );
};

const styles = StyleSheet.create({
  headerRightStyle: { gap: 6, paddingLeft: 16 },
  headerLeftStyle: { gap: 16, paddingLeft: 16 },
});

export const OwnHeaderOptions = React.memo(OwnHeaderOptionsRaw);
