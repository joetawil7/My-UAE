import React from 'react';
import { ICON_SIZE } from '@assets';
import { ChevronRight } from '@icons/rtl';
import { Icon, View, Text, ViewProps, TouchableOpacity } from './base';

type Props = ViewProps & {
  stars: number;
  count?: number;
  withNavigate?: boolean;
};

export const RatingStarsDisplay = (props: Props) => {
  const { stars, count, withNavigate } = props;

  const renderStarFilled = (key: number) => (
    <Icon
      key={`${key}filled`}
      name='star-filled'
      gradientVariant='secondary'
      size={ICON_SIZE.s}
    />
  );

  const renderStarEmpty = (key: number) => (
    <Icon
      key={`${key}empty`}
      name='star-empty'
      gradientVariant='secondary'
      size={ICON_SIZE.s}
    />
  );

  const filled = Math.floor(stars);

  const isDecimal = stars % 1 !== 0;

  const rest = 5 - stars < 1 ? 0 : Math.floor(5 - stars);

  return (
    <View
      flexDirection='row'
      marginBottom={count ? 's' : 'm'}
      alignItems='center'
      gap='3xs'
      {...props}
    >
      {Array.from(Array(filled).keys()).map((item) => renderStarFilled(item))}
      {isDecimal && (
        <Icon name='star-half' gradientVariant='secondary' size={ICON_SIZE.s} />
      )}
      {Array.from(Array(rest).keys()).map((item) => renderStarEmpty(item))}
      <Text
        variant='poppins_xs'
        color='white'
        marginLeft='3xs'
        paddingTop='2xs'
      >
        {count} Ratings
      </Text>
      {withNavigate && (
        <TouchableOpacity>
          <Icon name={ChevronRight} marginLeft='2xs' size={ICON_SIZE.s} />
        </TouchableOpacity>
      )}
    </View>
  );
};
