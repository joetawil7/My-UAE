import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import React, { forwardRef, useCallback, useState } from 'react';
import { GoogleApi } from '@services';
import { GoogleLocation } from '@types';
import { useTranslate } from '@localization';
import { ListRenderItem } from 'react-native';
import { BottomSheetTextInput } from '../textInput/bottomSheetTextInput';
import { useSearchTimeout } from '../hooks/useSearchTimeout';
import {
  View,
  Text,
  ActivityIndicator,
  BottomSheetModalWithTextInput,
  BottomSheetFlatList,
} from '../base';
import { LocationSelectionItem } from './locationSelectionItem';

interface Props {
  onDismiss: () => void;
  setSelectedLocation: (location: GoogleLocation) => void;
}

const LocationSelectionRaw: React.ForwardRefRenderFunction<
  BottomSheetModalMethods,
  Props
> = ({ onDismiss, setSelectedLocation }, ref) => {
  const [predictions, setPredictions] = useState<GoogleLocation[]>([]);
  const [noResults, setNoResults] = useState(false);

  const { t } = useTranslate();

  const searchLocations = () => {
    GoogleApi.searchPlaces(textInputValue).then((newPlace) => {
      const newPredictions = newPlace.predictions;
      setNoResults(newPredictions.length === 0);
      setPredictions(newPredictions);
    });
  };

  const { textInputValue, setTextInputValue, loading } = useSearchTimeout(
    searchLocations,
    () => setPredictions([])
  );

  const renderItem = useCallback(
    // eslint-disable-next-line react/no-unused-prop-types
    ({ item }: { item: GoogleLocation }) => (
      <LocationSelectionItem
        location={item}
        setLocation={() => setSelectedLocation(item)}
      />
    ),
    [setSelectedLocation]
  );

  return (
    <BottomSheetModalWithTextInput
      withBackDrop
      ref={ref}
      index={0}
      snapPoints={['85%']}
      onDismiss={onDismiss}
    >
      <View paddingHorizontal='m' gap='m' flex={1}>
        <Text textAlign='center' variant='poppins_m_medium'>
          {t('select_location')}
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

        {loading && <ActivityIndicator />}

        {noResults && !loading ? (
          <Text textAlign='center' variant='poppins_m'>
            {t('no_results_found')}
          </Text>
        ) : (
          <BottomSheetFlatList
            style={{ flex: 1 }}
            data={predictions}
            keyExtractor={(i: any) => i.place_id}
            renderItem={renderItem as ListRenderItem<unknown>}
            contentContainerStyle={{ paddingBottom: 'm' }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </BottomSheetModalWithTextInput>
  );
};

export const LocationSelection = forwardRef(LocationSelectionRaw);
