import { View } from '@components/base';
import React from 'react';
import { Media, UserInfo } from '@types';
import { CreateNormalPostMediaAdd } from './createNormalPostMediaAdd';
import { CreateNormalPostPeopleTagButton } from './createNormalPostPeopleTagButton';

interface Props {
  media: Media[];
  setMedia: (media: Media[]) => void;
  onDismiss: () => void;
  taggedUsers: UserInfo[];
  setTaggedUsers: (taggedUsers: UserInfo[]) => void;
}

export const CreatePostKeyboardAccessoryRaw = (props: Props) => {
  const { media, setMedia, onDismiss, taggedUsers, setTaggedUsers } = props;

  return (
    <View
      backgroundColor='background'
      borderTopColor='secondary'
      flexDirection='row'
      alignItems='center'
      borderTopWidth={1}
      height={46}
      paddingHorizontal='s'
      gap='m'
    >
      <CreateNormalPostMediaAdd
        media={media}
        setMedia={(items) => {
          setMedia(items);
          onDismiss();
        }}
      />
      <CreateNormalPostPeopleTagButton
        taggedUsers={taggedUsers}
        setTaggedUsers={setTaggedUsers}
        onDismiss={onDismiss}
      />
    </View>
  );
};

export const CreatePostKeyboardAccessory = React.memo(
  CreatePostKeyboardAccessoryRaw
);
