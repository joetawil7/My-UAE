import React from 'react';
import { useNavigation } from '@navigation/navigationElements';
import { ICON_SIZE } from '@assets';
import { stylesConstants } from '@styles';
import { ChevronLeft } from '@icons/rtl';
import {
  IconButton,
  View,
  ViewProps,
  Text,
  ActivityIndicator,
  TextInputProps,
} from './base';
import { Theme } from '../theme';

type Props = ViewProps & {
  leftHeader?: JSX.Element;
  centerHeader?: JSX.Element;
  rightHeader?: JSX.Element;
  withoutBorder?: boolean;
  withBack?: boolean;
  modalScreen?: boolean;
  title?: string;
  titleProps?: TextInputProps;
  rightLoading?: boolean;
  color?: keyof Theme['colors'];
};

export const NavigationHeader = (props: Props) => {
  const {
    title,
    titleProps,
    leftHeader,
    centerHeader,
    rightHeader,
    withoutBorder,
    withBack,
    modalScreen,
    rightLoading,
    color,
  } = props;

  const navigation = useNavigation();

  return (
    <View
      height={50}
      backgroundColor="primary"
      paddingHorizontal="m"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      borderBottomColor="secondary"
      borderBottomWidth={withoutBorder ? 0 : 1}
      {...props}
    >
      <View flex={1} alignItems="flex-start">
        {withBack ? (
          modalScreen ? (
            <IconButton
              size={ICON_SIZE.l}
              name="chevron-down"
              onPress={navigation.goBack}
              color={color ?? 'grayDarker'}
            />
          ) : (
            <IconButton
              size={ICON_SIZE.l}
              name={ChevronLeft}
              onPress={navigation.goBack}
              color={color ?? 'grayDarker'}
            />
          )
        ) : (
          leftHeader
        )}
      </View>
      {title ? (
        <Text
          color={color ?? 'grayDarker'}
          variant={stylesConstants.NAVIGATION_HEADER_FONT}
          {...titleProps}
        >
          {title}
        </Text>
      ) : (
        <View flex={1} alignItems="center">
          {centerHeader}
        </View>
      )}
      <View flex={1} alignItems="flex-end">
        {rightLoading ? <ActivityIndicator /> : rightHeader}
      </View>
    </View>
  );
};
