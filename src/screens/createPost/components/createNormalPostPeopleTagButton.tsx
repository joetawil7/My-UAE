import { ICON_SIZE } from '@assets';
import { IconButton } from '@components/base';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import React, { useCallback, useRef } from 'react';
import { Keyboard } from 'react-native';
import { UserInfo } from '@types';
import CreateNormalPostPeopleTagModal from './createNormalPostPeopleTagModal';

interface Props {
  onDismiss: () => void;
  taggedUsers: UserInfo[];
  setTaggedUsers: (taggedUsers: UserInfo[]) => void;
}

const CreateNormalPostPeopleTagButtonRaw = (props: Props) => {
  const { onDismiss, taggedUsers, setTaggedUsers } = props;
  const bottomSheetModalRef = useRef<BottomSheetModalMethods>(null);

  const handlePresentModalPress = useCallback(() => {
    Keyboard.dismiss();
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <>
      <IconButton
        name='tag_people'
        size={ICON_SIZE.l}
        color={taggedUsers.length > 0 ? 'primary' : 'white'}
        onPress={handlePresentModalPress}
      />
      <CreateNormalPostPeopleTagModal
        taggedUsers={taggedUsers}
        setTaggedUsers={setTaggedUsers}
        onDismiss={onDismiss}
        ref={bottomSheetModalRef}
      />
    </>
  );
};

export const CreateNormalPostPeopleTagButton = React.memo(
  CreateNormalPostPeopleTagButtonRaw
);
