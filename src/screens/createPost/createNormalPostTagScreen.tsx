/* eslint-disable react/no-unused-prop-types */
import { ScreenShell, Text, View, TouchableOpacity } from '@components/base';
import { NavigationHeader } from '@components/navigationHeader';
import {
  NavigationElement,
  useNavigation,
} from '@navigation/navigationElements';
import { FlatList } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { PostTag } from '@types';
import { CustomTextInput } from '@components';
import { useTranslate } from '@localization';
import { RootStackScreenProps } from '@navigation/navigationRouteParams';
import { CreateNormalPostTagItem } from './components/createNormalPostTagItem';

export const CreateNormalPostTagScreen: React.FC<
  RootStackScreenProps<NavigationElement.CreateNormalPostTagScreen>
> = () => {
  const [selectedPostTags, setSelectedPostTags] = useState<PostTag[]>([]);
  const [searchPostTags, setSearchPostTags] = useState<PostTag[]>([]);
  const [textInputValue, setTextInputValue] = useState('');

  const { t } = useTranslate();
  const navigation = useNavigation();

  const search = useCallback(() => {
    if (textInputValue.length === 0) setSearchPostTags([]);

    const searchTags = Object.values(PostTag).filter((item) =>
      item.includes(textInputValue.toLocaleLowerCase())
    );

    setSearchPostTags(searchTags);
  }, [textInputValue]);

  useEffect(() => {
    search();
  }, [search]);

  const renderStickyHeader = useMemo(
    () => (
      <View
        backgroundColor='background'
        padding='m'
        gap='s'
        justifyContent='center'
        borderBottomColor='secondary'
        borderBottomWidth={1}
      >
        <Text textAlign='center'>{t('choose_at_least_one')} Reatag</Text>
        <CustomTextInput
          height={40}
          value={textInputValue}
          onValueChange={setTextInputValue}
          placeholder={t('search')}
          search
        />
      </View>
    ),
    [t, textInputValue]
  );

  const renderItem = useCallback(
    ({ item, index }: { item: PostTag; index: number }) => {
      return (
        <CreateNormalPostTagItem
          key={index}
          icon='eye'
          item={item}
          index={index}
          selectedPostTags={selectedPostTags}
          setSelectedPostTags={setSelectedPostTags}
        />
      );
    },
    [selectedPostTags]
  );

  return (
    <ScreenShell>
      <NavigationHeader
        withBack
        modalScreen
        centerHeader={<Text>{selectedPostTags.length} / 3</Text>}
        rightHeader={
          <TouchableOpacity
            disabled={selectedPostTags.length === 0}
            onPress={() =>
              navigation.push(NavigationElement.CreateNormalPostScreen, {
                postTags: selectedPostTags,
              })
            }
          >
            <Text color={selectedPostTags.length > 0 ? 'white' : 'grayDark'}>
              {t('next')}
            </Text>
          </TouchableOpacity>
        }
      />

      {renderStickyHeader}

      <FlatList
        data={
          searchPostTags.length === 0 ? Object.values(PostTag) : searchPostTags
        }
        numColumns={4}
        contentContainerStyle={{ padding: 16, gap: 10 }}
        style={{}}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item + index}`}
        keyboardShouldPersistTaps='handled'
      />
    </ScreenShell>
  );
};
