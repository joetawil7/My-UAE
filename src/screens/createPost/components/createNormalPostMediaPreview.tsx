import { View } from '@components/base';
import React, { useCallback } from 'react';
import { FlatList } from 'react-native';
import { Media } from '@types';
import { CreateNormalPostMediaPreviewItem } from './createNormalPostMediaPreviewItem';

interface Props {
  media: Media[];
  setMedia: (media: Media[]) => void;
}

const CreateNormalPostMediaPreviewRaw = (props: Props) => {
  const { media, setMedia } = props;

  const checkIfMediaExists = useCallback(
    (mediaItem: Media) => {
      const index = media.findIndex((item) => item === mediaItem);
      return index;
    },
    [media]
  );

  const removeMedia = useCallback(
    (mediaItem: Media) => {
      const newMedia = media.slice(0);
      const index = checkIfMediaExists(mediaItem);
      if (index > -1) {
        newMedia.splice(index, 1);
      }
      setMedia(newMedia);
    },
    [media, setMedia, checkIfMediaExists]
  );

  const renderItem = useCallback(
    // eslint-disable-next-line react/no-unused-prop-types
    ({ item }: { item: Media }) => (
      <CreateNormalPostMediaPreviewItem
        uri={item.url}
        onRemove={() => removeMedia(item)}
        isSingleMedia={false}
        exists={checkIfMediaExists(item) !== -1}
      />
    ),
    [checkIfMediaExists, removeMedia]
  );

  const keyExtractor = (item: Media, index: number) => `${item.url}${index}`;

  return (
    <View marginTop='xs'>
      {media.length === 1 ? (
        <CreateNormalPostMediaPreviewItem
          uri={media[0].url}
          onRemove={() => removeMedia(media[0])}
          isSingleMedia
        />
      ) : (
        <FlatList
          data={media}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ marginTop: 16 }}
          keyboardShouldPersistTaps='always'
        />
      )}
    </View>
  );
};

export const CreateNormalPostMediaPreview = React.memo(
  CreateNormalPostMediaPreviewRaw
);
