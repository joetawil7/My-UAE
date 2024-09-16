/* eslint-disable react/no-array-index-key */
import { View, Text, ScrollView } from '@components/base';
// import { HeightIcon, WeightIcon } from '@icons';
import { Picker } from '@react-native-picker/picker';
import { stylesConstants } from '@styles';
import React from 'react';
import { Dimensions } from 'react-native';

// interface Props {
// }

export const CreateAccountUserSize = () => {
  const { width } = Dimensions.get('window');

  return (
    <ScrollView
      contentContainerStyle={{ flex: 1 }}
      nestedScrollEnabled
      flex={1}
      paddingHorizontal='l'
      width={width > 600 ? 600 : width}
    >
      <View
        flexDirection='row'
        alignItems='center'
        justifyContent='space-between'
        style={{ marginBottom: 84 }}
      >
        <Picker
          style={{ width: 100 }}
          selectedValue={176}
          onValueChange={() => {}}
          enabled
          itemStyle={{ flex: 1 }}
        >
          {Array.from(Array(220).keys()).map((index, key) => (
            <Picker.Item
              label={index.toString()}
              value={index}
              color='white'
              key={key}
            />
          ))}
        </Picker>
        {/* <HeightIcon /> */}
        <Picker
          style={{ width: 100 }}
          selectedValue={176}
          onValueChange={() => {}}
          enabled
          itemStyle={{ flex: 1 }}
        >
          {Array.from(['cm', 'in']).map((index, key) => (
            <Picker.Item
              label={index.toString()}
              value={index}
              color='white'
              key={key}
            />
          ))}
        </Picker>

        <View position='absolute' bottom={-40} width='100%' alignItems='center'>
          <Text variant={stylesConstants.HEADER_FONT}>Height</Text>
        </View>
      </View>

      <View
        flexDirection='row'
        alignItems='center'
        justifyContent='space-between'
      >
        <Picker
          style={{ width: 100 }}
          selectedValue={176}
          onValueChange={() => {}}
          enabled
          itemStyle={{ flex: 1 }}
        >
          {Array.from(Array(220).keys()).map((index, key) => (
            <Picker.Item
              label={index.toString()}
              value={index}
              color='white'
              key={key}
            />
          ))}
        </Picker>
        {/* <WeightIcon /> */}
        <Picker
          style={{ width: 100 }}
          selectedValue={176}
          onValueChange={() => {}}
          enabled
          itemStyle={{ flex: 1 }}
        >
          {Array.from(['kg', 'lb']).map((index, key) => (
            <Picker.Item
              label={index.toString()}
              value={index}
              color='white'
              key={key}
            />
          ))}
        </Picker>

        <View position='absolute' bottom={-40} width='100%' alignItems='center'>
          <Text variant={stylesConstants.HEADER_FONT}>Weight</Text>
        </View>
      </View>

      <View height={1000} backgroundColor='primary' />
    </ScrollView>
  );
};
