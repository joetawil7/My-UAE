import { IconButton, View } from '@components/base';
import {
  NavigationElement,
  useNavigation,
} from '@navigation/navigationElements';
import React, { useState } from 'react';

export const HomeMessagesButton = () => {
  const navigation = useNavigation();

  const [unseenCount, setUnseenCount] = useState(0);

  return (
    <View>
      <IconButton
        name={unseenCount > 0 ? 'chat-filled' : 'chat'}
        size={28}
        onPress={() => navigation.navigate(NavigationElement.ChatScreen)}
      />
      {unseenCount > 0 && (
        <View
          position='absolute'
          right={-2}
          top={2}
          height={7}
          width={7}
          borderRadius='max'
          justifyContent='center'
          alignItems='center'
          backgroundColor='danger'
        />
      )}
    </View>
  );
};
