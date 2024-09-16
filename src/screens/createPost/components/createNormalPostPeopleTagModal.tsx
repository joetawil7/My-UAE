import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  BottomSheetModalWithTextInput,
  Icon,
  BottomSheetFlatList,
} from '@components/base';
import {
  useSearchTimeout,
  ProfileCard,
  BottomSheetTextInput,
} from '@components';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useTranslate } from '@localization';
import { SearchApi } from '@services';
import React, { forwardRef, useCallback, useState } from 'react';
import { UserInfo } from '@types';
import { ListRenderItem } from 'react-native';

interface Props {
  taggedUsers: UserInfo[];
  setTaggedUsers: (taggedUsers: UserInfo[]) => void;
  onDismiss: () => void;
}

const CreateNormalPostPeopleTagModal: React.ForwardRefRenderFunction<
  BottomSheetModalMethods,
  Props
> = ({ onDismiss, taggedUsers, setTaggedUsers }, ref) => {
  const { t } = useTranslate();
  const [usersList, setUsersList] = useState<UserInfo[]>();

  const searchUsers = async () => {
    try {
      const result = await SearchApi.searchUsersByUsername(
        textInputValue.toLowerCase()
      );
      setUsersList(result);
    } catch (e) {
      /* empty */
    }
  };

  const { textInputValue, setTextInputValue, loading } = useSearchTimeout(
    searchUsers,
    () => {
      setUsersList([]);
    }
  );

  const onTag = useCallback(
    (item: UserInfo) => {
      const copy = taggedUsers.slice(0);
      const index = copy.findIndex((e) => e.username === item.username);
      if (index !== -1) {
        copy.splice(index, 1);
      } else {
        copy.push(item);
      }
      setTaggedUsers(copy);
    },
    [setTaggedUsers, taggedUsers]
  );

  const renderItem = useCallback(
    // eslint-disable-next-line react/no-unused-prop-types
    ({ item }: { item: UserInfo }) => (
      <TouchableOpacity onPress={() => onTag(item)}>
        <ProfileCard
          userInfo={item}
          rightElement={
            taggedUsers.findIndex((e) => e.username === item.username) !==
            -1 ? (
              <Icon marginLeft='auto' name='check-mark' color='primary' />
            ) : undefined
          }
        />
      </TouchableOpacity>
    ),
    [onTag, taggedUsers]
  );

  return (
    <BottomSheetModalWithTextInput
      withBackDrop
      ref={ref}
      snapPoints={['85%']}
      onDismiss={onDismiss}
      index={0}
    >
      <View paddingHorizontal='m' gap='m' flex={1}>
        <Text textAlign='center' variant='poppins_m_medium'>
          {t('tag_people')}
        </Text>

        <BottomSheetTextInput
          height={40}
          value={textInputValue}
          onValueChange={setTextInputValue}
          placeholder={t('search')}
          search
          textInputProps={{
            autoFocus: true,
            blurOnSubmit: false,
          }}
        />

        {loading ? (
          <ActivityIndicator />
        ) : usersList?.length === 0 && textInputValue.length !== 0 ? (
          <Text textAlign='center' variant='poppins_m'>
            {t('no_users_found')}
          </Text>
        ) : (
          <BottomSheetFlatList
            style={{ flex: 1 }}
            data={
              loading
                ? []
                : usersList && usersList.length > 0
                ? usersList
                : taggedUsers
            }
            keyExtractor={(i: any) => i.id}
            renderItem={renderItem as ListRenderItem<unknown>}
            contentContainerStyle={{ paddingBottom: 'm' }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </BottomSheetModalWithTextInput>
  );
};

export default forwardRef(CreateNormalPostPeopleTagModal);
