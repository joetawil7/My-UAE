import React from 'react';
import { View, ViewProps } from '../base';
import { PagingIndicatorItem } from './pagingIndicatorItem';

type Props = ViewProps & {
  totalPages: number;
  activePage: number;
};

export const PagingIndicator = (props: Props) => {
  const { totalPages, activePage } = props;

  return (
    <View
      flexDirection={'row'}
      justifyContent={'center'}
      alignItems={'center'}
      gap={'s'}
      {...props}
    >
      {[...Array(totalPages)].map((_, i) => (
        <PagingIndicatorItem active={i === activePage} />
      ))}
    </View>
  );
};
