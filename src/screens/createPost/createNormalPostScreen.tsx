import { ICON_SIZE } from '@assets';
import {
  ScreenShell,
  IconButton,
  View,
  KeyboardAwareScrollView,
} from '@components/base';
import { NavigationHeader, KeyboardAccessory } from '@components';
import {
  NavigationElement,
  useNavigation,
} from '@navigation/navigationElements';
import { RootStackScreenProps } from '@navigation/navigationRouteParams';
import React, { useRef, useState } from 'react';
import { TextInput } from 'react-native';
import { GoogleLocation, Media, NormalPostRequest, UserInfo } from '@types';
import { PostApi } from '@services/api';
import { PostProfileLocation } from './components/postProfileLocation';
import { CreatePostTextField } from './components/createPostTextField';
import { CreatePostKeyboardAccessory } from './components/createPostKeyboardAccessory';
import { CreateNormalPostMediaPreview } from './components/createNormalPostMediaPreview';

export const CreateNormalPostScreen: React.FC<
  RootStackScreenProps<NavigationElement.CreateNormalPostScreen>
> = ({ route }) => {
  const { postTags } = route.params;

  const [text, setText] = useState('');
  const [location, setLocation] = useState<GoogleLocation>();
  const [media, setMedia] = useState<Media[]>([]);
  const [taggedUsers, setTaggedUsers] = useState<UserInfo[]>([]);
  const textInputRef = useRef<TextInput>(null);

  const navigation = useNavigation();

  const postEnabled = text.length > 0 && postTags.length > 0;

  const onDismiss = () => textInputRef.current?.focus();

  const onCreatePost = async () => {
    const mentions = taggedUsers.map((item) => item.id);

    const post: NormalPostRequest = {
      content: text,
      postTags,
      location,
      media,
      mentions,
    };

    try {
      PostApi.createPost(post);

      navigation.push('HomeScreen');
    } catch (e: any) {
      /* empty */
    }
  };

  return (
    <ScreenShell>
      <NavigationHeader
        withBack
        rightHeader={
          <IconButton
            size={ICON_SIZE.bottomNav}
            name="create-post"
            color={postEnabled ? undefined : 'grayDark'}
            gradientVariant={postEnabled ? 'primary' : undefined}
            disabled={!postEnabled}
            onPress={onCreatePost}
          />
        }
      />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{
          padding: 12,
        }}
      >
        <View flexDirection="row" justifyContent="space-between">
          <PostProfileLocation
            location={location}
            setLocation={setLocation}
            onDismiss={onDismiss}
          />
        </View>

        <CreatePostTextField text={text} setText={setText} ref={textInputRef} />

        {media.length > 0 && (
          <CreateNormalPostMediaPreview setMedia={setMedia} media={media} />
        )}
      </KeyboardAwareScrollView>
      <KeyboardAccessory>
        <CreatePostKeyboardAccessory
          media={media}
          setMedia={setMedia}
          onDismiss={onDismiss}
          taggedUsers={taggedUsers}
          setTaggedUsers={setTaggedUsers}
        />
      </KeyboardAccessory>
    </ScreenShell>
  );
};
