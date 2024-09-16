import { TextInput } from '@components/base';
import { TextInput as RNTextInput } from 'react-native';
import React from 'react';
import { useTranslate } from '@localization';

interface Props {
  text: string;
  setText: (text: string) => void;
}

const CreatePostTextFieldRaw = React.forwardRef<RNTextInput, Props>(
  (props, ref) => {
    const { text, setText } = props;

    const { t } = useTranslate();

    return (
      <TextInput
        value={text}
        onChangeText={setText}
        autoFocus
        blurOnSubmit={false}
        marginTop='xs'
        placeholder={t('create_post_text_placeholder')}
        multiline
        ref={ref}
      />
    );
  }
);

export const CreatePostTextField = React.memo(CreatePostTextFieldRaw);
