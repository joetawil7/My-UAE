import React from 'react';
import { TextInput as RNTextInput } from 'react-native';
import { IconButton, Image, TextInput, View } from '@components/base';
import { ICON_SIZE } from '@assets';
import { Media } from '@types';
import { useTranslate } from '@localization';
import { mediaHelpers } from '@utils/mediaHelpers';
import { CustomTextInputProps } from './customTextInput';

type Props = CustomTextInputProps & {
  onSubmit: () => void;
  media?: Media;
  setMedia: (media: Media | undefined) => void;
};

const ChatTextInputRaw = React.forwardRef<RNTextInput, Props>((props, ref) => {
  const { onSubmit, onValueChange, value, media, setMedia } = props;

  const { t } = useTranslate();

  const chooseMedia = async () => {
    const asset = (await mediaHelpers.mediaPicker({})) as Media;

    setMedia(asset);
  };

  const openCamera = async () => {
    const asset = (await mediaHelpers.cameraPicker({})) as Media;

    setMedia(asset);
  };

  const renderPrefix = (
    <View flexDirection='row' gap='m' marginRight='m'>
      <IconButton name='camera' size={ICON_SIZE.xl} onPress={openCamera} />
    </View>
  );

  const renderSuffix = (
    <View
      flexDirection='row'
      gap='m'
      position='absolute'
      right={16}
      bottom={media ? 12 : 0}
    >
      <IconButton name='media' size={ICON_SIZE.xl} onPress={chooseMedia} />
      <IconButton name='chevron-right' size={ICON_SIZE.l} onPress={onSubmit} />
    </View>
  );

  return (
    <View flexDirection='row'>
      {renderPrefix}
      <View backgroundColor='secondary' flex={1} borderRadius='m'>
        <View flexDirection='row'>
          <TextInput
            value={value}
            onChangeText={onValueChange}
            minHeight={36}
            maxHeight={100}
            multiline
            borderRadius='s'
            backgroundColor='secondary'
            paddingHorizontal='m'
            placeholder={t('message')}
            flexGrow={1}
            ref={ref}
          />
        </View>
        {renderSuffix}

        {media && (
          <View height={157} width={157} padding='m'>
            <Image
              height='100%'
              width='100%'
              source={{ uri: media.url }}
              borderRadius='m'
            />

            <IconButton
              name='x'
              circle
              backgroundColor='black'
              position='absolute'
              top={24}
              right={24}
              height={24}
              width={24}
              size={ICON_SIZE.xs}
              onPress={() => setMedia(undefined)}
            />
          </View>
        )}
      </View>
    </View>
  );
});

export const ChatTextInput = React.memo(ChatTextInputRaw);
