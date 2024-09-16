import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native';
// import * as FileSystem from 'expo-file-system';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
// import * as CropPicker from 'react-native-image-crop-picker';
import { Events, Media } from '@types';
import { EventRegister } from 'react-native-event-listeners';
import { constants } from '../globals';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const mime = require('mime');

const pickProfileImage = async (): Promise<string | undefined> => {
  const asset = (await pickMedia(
    false,
    ImagePicker.MediaTypeOptions.Images,
  )) as ImagePicker.ImagePickerAsset;

  if (!asset) {
    return asset;
  }

  const imageWidth = asset.width;
  const imageHeight = asset.height;

  const cropConfig = cropImageInSquare(imageWidth, imageHeight);

  const manipulationResult = await manipulateAsync(
    asset.uri,
    [
      { crop: cropConfig },
      { resize: { width: constants.PROFILE_PICTURE_SIZE } },
    ],
    { compress: 0.7, format: SaveFormat.JPEG },
  );

  // can be deleted later
  // const fileInfo = await FileSystem.getInfoAsync(manipulationResult.uri);
  // console.log((fileInfo as any).size / 1024, 'KB');

  return manipulationResult.uri;
};

const pickMedia = async (
  allowsMultipleSelection = true,
  mediaType = ImagePicker.MediaTypeOptions.All,
): Promise<
  ImagePicker.ImagePickerAsset[] | ImagePicker.ImagePickerAsset | undefined
> => {
  await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (await ImagePicker.getMediaLibraryPermissionsAsync()) {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: mediaType,
      quality: 1,
      allowsMultipleSelection,
    });

    if (!result.canceled && result.assets?.length > 0) {
      const asset = allowsMultipleSelection ? result.assets : result.assets[0];
      return asset;
    }
  }

  return undefined;
};

const getImageFile = (image: string) => {
  const newImageUri =
    Platform.OS === 'android' ? image : image.replace('file://', '');

  const file = {
    name: image.split('/').pop(),
    type: mime.getType(newImageUri),
    uri: newImageUri,
  };

  return file;
};

const cropImageInSquare = (width: number, height: number) => {
  if (height > width) {
    const size = width;
    const originX = 0;
    const diff = height - width;
    const originY = diff / 2;
    return { originX, originY, width: size, height: size };
  }
  if (width > height) {
    const size = height;
    const originY = 0;
    const diff = width - height;
    const originX = diff / 2;
    return { originX, originY, width: size, height: size };
  }
  return { originX: 0, originY: 0, width, height };
};

interface MediaPickerProps {
  size?: number;
  type?: 'photo' | 'video' | 'any';
  compressQuality?: number;
  cropping?: boolean;
  multiple?: boolean;
  useFrontCamera?: boolean;
}

const mediaPicker = async (
  props: MediaPickerProps,
): Promise<Media | Media[] | undefined> => {
  const { size, type, compressQuality, cropping, multiple } = props;

  try {
    // const asset = await CropPicker.openPicker({
    //   width: size ?? constants.MEDIA_IMAGE_SIZE,
    //   height: size ?? constants.MEDIA_IMAGE_SIZE,
    //   cropping: cropping ?? true,
    //   mediaType: type ?? 'photo',
    //   compressImageQuality: compressQuality ?? 0.7,
    //   multiple: multiple ?? false,
    // });
    // return multiple === true
    //   ? (asset as any).map((item: any) => {
    //       return {
    //         filename: item.filename,
    //         url: item.path,
    //         mimeType: item.mime,
    //       };
    //     })
    //   : {
    //       filename: asset.filename,
    //       url: asset.path,
    //       mimeType: asset.mime,
    //     };
  } catch (e: any) {
    EventRegister.emit(Events.MEDIA_PERMISSION_REMINDER);
  }

  return undefined;
};

const cameraPicker = async (
  props: MediaPickerProps,
): Promise<Media | undefined> => {
  const { size, type, compressQuality, cropping, useFrontCamera } = props;
  try {
    // const asset = await CropPicker.openCamera({
    //   width: size ?? constants.MEDIA_IMAGE_SIZE,
    //   height: size ?? constants.MEDIA_IMAGE_SIZE,
    //   cropping: cropping ?? true,
    //   mediaType: type ?? 'photo',
    //   compressImageQuality: compressQuality ?? 0.7,
    //   useFrontCamera: useFrontCamera ?? true,
    // });
    // return {
    //   filename: asset.filename,
    //   url: asset.path,
    //   mimeType: asset.mime,
    // };
  } catch (e: any) {
    EventRegister.emit(Events.CAMERA_PERMISSION_REMINDER);
  }

  return undefined;
};

export const mediaHelpers = {
  pickProfileImage,
  pickMedia,
  getImageFile,
  mediaPicker,
  cameraPicker,
};
