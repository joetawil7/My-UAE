import React, { PropsWithChildren, useState } from 'react';
import { stylesConstants } from '@styles';
import { useTranslate } from '@localization';
import { RequestQueue, UserFollowAPi } from '@services';
import { Button, ButtonProps } from './base';

type Props = PropsWithChildren<ButtonProps>;

export const WideButton = (props: Props) => {
  const { children, labelProps, disabled } = props;
  return (
    <Button
      borderRadius='s'
      height={50}
      opacity={disabled ? 0.4 : 1}
      overflow='hidden'
      labelProps={{
        variant: stylesConstants.WIDE_BUTTON_FONT,
        ...labelProps,
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export const MediumButton = (props: Props) => {
  const { children, labelProps, ...rest } = props;
  return (
    <Button
      borderRadius='m'
      height={50}
      width={175}
      opacity={rest.disabled ? 0.4 : 1}
      overflow='hidden'
      labelProps={{
        variant: stylesConstants.MEDIUM_BUTTON_FONT,
        ...labelProps,
      }}
      {...rest}
    >
      {children}
    </Button>
  );
};

export const SmallButton = (props: Props) => {
  const { children, labelProps, ...rest } = props;
  return (
    <Button
      borderRadius='l'
      height={32}
      width={110}
      opacity={rest.disabled ? 0.4 : 1}
      overflow='hidden'
      labelProps={{
        variant: stylesConstants.SMALL_BUTTON_FONT,
        ...labelProps,
      }}
      {...rest}
    >
      {children}
    </Button>
  );
};

export const FollowButton = (
  props: Props & { userId: string; followed?: boolean }
) => {
  const { children, labelProps, onPress, userId, followed, ...rest } = props;

  const [thisFollowed, setThisFollowed] = useState(followed ?? false);

  const { t } = useTranslate();

  const onFollow = async () => {
    setThisFollowed((prev) => !prev);
    try {
      if (thisFollowed) {
        await RequestQueue.executeInQueue('userFollow', userId, () =>
          UserFollowAPi.unfollowUser(userId)
        );
      } else {
        await RequestQueue.executeInQueue('userFollow', userId, () =>
          UserFollowAPi.followUser(userId)
        );
      }
    } catch (e: any) {
      setThisFollowed((prev) => !prev);
    }
  };

  return (
    <SmallButton
      backgroundColor={thisFollowed ? 'background' : 'primary'}
      width={100}
      borderRadius='s'
      onPress={onFollow}
      label={thisFollowed ? t('unfollow') : t('follow')}
      borderWidth={thisFollowed ? 1 : 0}
      borderColor={thisFollowed ? 'white' : undefined}
      labelProps={{ color: thisFollowed ? 'white' : 'black' }}
      {...rest}
    />
  );
};
