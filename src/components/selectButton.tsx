import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { LinearGradient, Text, TouchableOpacity, View } from './base';

interface Props {
  style?: StyleProp<ViewStyle>;
  options: string[];
  selectedValue: string;
  onSelectionChange: (value: string) => void;
  disabled?: boolean;
}

export const SelectButton = (props: Props): JSX.Element => {
  const { style, options, selectedValue, onSelectionChange, disabled } = props;
  const renderOption = (option: string, index: number) => {
    const isSelected = option === selectedValue && !disabled;
    const firstElement = index === 0;
    const lastElement = index === options.length - 1;

    return (
      <TouchableOpacity
        style={{ margin: 1 }}
        key={index}
        flex={1}
        height={47}
        justifyContent='center'
        alignItems='center'
        backgroundColor='secondary'
        borderTopLeftRadius={firstElement ? 'm' : undefined}
        borderBottomLeftRadius={firstElement ? 'm' : undefined}
        borderTopRightRadius={lastElement ? 'm' : undefined}
        borderBottomRightRadius={lastElement ? 'm' : undefined}
        onPress={() => onSelectionChange(option)}
        activeOpacity={0.9}
        disabled={disabled}
      >
        {isSelected && (
          <LinearGradient
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}
            variant='primary'
          />
        )}
        <Text
          textAlign='center'
          variant='poppins_m_medium'
          color={isSelected ? 'black' : 'grayDark'}
        >
          {option}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={style} borderRadius='m' flexDirection='row' overflow='hidden'>
      <LinearGradient
        style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}
        variant='primary'
        start={[0, 1]}
      />

      {options.map((option, index) => renderOption(option, index))}
    </View>
  );
};
