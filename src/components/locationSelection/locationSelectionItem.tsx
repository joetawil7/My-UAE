import { Text, TouchableOpacity } from '@components/base';
import { GoogleLocation } from '@types';
import React from 'react';

interface Props {
  location: GoogleLocation;
  setLocation: () => void;
}

const LocationSelectionItemRaw = (props: Props) => {
  const { location, setLocation } = props;

  return (
    <TouchableOpacity padding='s' onPress={setLocation}>
      <Text>{location.description}</Text>
    </TouchableOpacity>
  );
};

export const LocationSelectionItem = React.memo(LocationSelectionItemRaw);
