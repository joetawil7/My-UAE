import { ICON_SIZE } from '@assets';
import { IconsId } from '@assets/icons/icons';
import { Icon, TouchableOpacity, Text, View } from '@components/base';
import { Translation, useTranslate } from '@localization';
import { buttonShadow } from '@theme';
import { PostTag } from '@types';
import React from 'react';
import { useWindowDimensions } from 'react-native';

interface Props {
  item: PostTag;
  icon: IconsId;
  index: number;
  selectedPostTags: PostTag[];
  setSelectedPostTags: (postTags: PostTag[]) => void;
}

const CreateNormalPostTagItemRaw = (props: Props) => {
  const { item, icon, index, selectedPostTags, setSelectedPostTags } = props;

  const { t } = useTranslate();
  const { width } = useWindowDimensions();

  const isSelected = Boolean(selectedPostTags.find((_item) => _item === item));

  const updateList = () => {
    const selectedPostTagsCopy = selectedPostTags.slice(0);

    const foundItemIndex = selectedPostTags.findIndex(
      (_item) => _item === item
    );

    if (foundItemIndex > -1) {
      selectedPostTagsCopy.splice(foundItemIndex, 1);
    } else if (selectedPostTags.length < 3) {
      selectedPostTagsCopy.push(item);
    }

    setSelectedPostTags(selectedPostTagsCopy);
  };

  return (
    <TouchableOpacity
      justifyContent='center'
      alignItems='center'
      height={(width - 62) / 4}
      width={(width - 62) / 4}
      style={{
        marginRight: index !== 0 && index % 3 === 0 ? 0 : 10,
      }}
      borderRadius='max'
      backgroundColor='secondary'
      gap='2xs'
      activeOpacity={0.6}
      {...buttonShadow}
      shadowColor='black'
      onPress={updateList}
    >
      <Icon size={ICON_SIZE.l} name={icon} />
      <Text variant='poppins_xs'>
        {t(item as unknown as keyof Translation)}
      </Text>

      {isSelected && (
        <View
          position='absolute'
          height={17}
          width={17}
          top={10}
          right={10}
          backgroundColor='primary'
          borderRadius='max'
          alignItems='center'
          justifyContent='center'
        >
          <Icon name='check-mark' color='black' size={ICON_SIZE.xxs} />
        </View>
      )}
    </TouchableOpacity>
  );
};

export const CreateNormalPostTagItem = React.memo(CreateNormalPostTagItemRaw);
