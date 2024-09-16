import { SmallButton } from '@components/customButton';
import { ProfileCard } from '@components/profileCard';
import { useTranslate } from '@localization';
import { UserInfo } from '@types';
import React from 'react';

interface Props {
  user: UserInfo;
  onUnblock: () => void;
}

const BlockedUserListItemRaw = (props: Props) => {
  const { user, onUnblock } = props;

  const { t } = useTranslate();

  const renderUnblockButton = (
    <SmallButton
      width={90}
      borderRadius='s'
      backgroundColor='primary'
      onPress={onUnblock}
      label={t('unblock')}
    />
  );

  return <ProfileCard userInfo={user} rightElement={renderUnblockButton} />;
};

export const BlockedUserListItem = React.memo(BlockedUserListItemRaw);
