import { ICON_SIZE } from '@assets';
import { IconButton } from '@components/base';
import React from 'react';
// import ImagePicker from 'react-native-image-crop-picker';
import { constants } from '@globals';
import { Media } from '@types';

interface Props {
  media: Media[];
  setMedia: (media: Media[]) => void;
}

const CreateNormalPostMediaAddRaw = (props: Props) => {
  const { media, setMedia } = props;

  const chooseMedia = async () => {
    try {
      // const assets =
      //   (await mediaHelpers.pickMedia()) as ImagePicker.ImagePickerAsset[];
      // const asset = await ImagePicker.openPicker({
      //   width: constants.MEDIA_IMAGE_SIZE,
      //   height: constants.MEDIA_IMAGE_SIZE,
      //   cropping: true,
      //   mediaType: 'photo',
      //   compressImageQuality: 0.7,
      // });
      // const fileInfo = await FileSystem.getInfoAsync(asset.path);
      // console.log((fileInfo as any).size / 1024, 'KB');
      // const newMedia = media.slice(0);
      // // const file = mediaHelpers.getImageFile(asset.path);
      // newMedia.push({
      //   filename: asset.filename,
      //   mimeType: asset.mime,
      //   url: asset.path,
      // });
      // setMedia(newMedia);
    } catch (e) {
      /* empty */
    }
  };

  return (
    <IconButton
      name="media"
      size={ICON_SIZE.l}
      color={media.length > 0 ? 'primary' : 'white'}
      onPress={chooseMedia}
    />
  );
};

export const CreateNormalPostMediaAdd = React.memo(CreateNormalPostMediaAddRaw);
