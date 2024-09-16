import { Animated } from 'react-native';
import React from 'react';

import {
  CodeField,
  Cursor,
  RenderCellOptions,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { View } from './base';

const { Value, Text: AnimatedText } = Animated;

const CELL_COUNT = 4;
const CELL_SIZE = 55;
const DEFAULT_CELL_BG_COLOR = '#fff';
const NOT_EMPTY_CELL_BG_COLOR = '#1C94B7';
const ACTIVE_CELL_BG_COLOR = '#f7fafe';

const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));
const animateCell = ({
  hasValue,
  index,
  isFocused,
}: {
  hasValue: any;
  index: any;
  isFocused: any;
}) => {
  Animated.parallel([
    Animated.timing(animationsColor[index], {
      useNativeDriver: false,
      toValue: isFocused ? 1 : 0,
      duration: 250,
    }),
    Animated.spring(animationsScale[index], {
      useNativeDriver: false,
      toValue: hasValue ? 0 : 1,
      //   duration: hasValue ? 300 : 250,
    }),
  ]).start();
};

interface Props {
  code: string;
  setCode: (code: string) => void;
}

export const CodeInputField = (props: Props) => {
  const { code, setCode } = props;
  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
  const [prop, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  const renderCell = ({ index, symbol, isFocused }: RenderCellOptions) => {
    const hasValue = Boolean(symbol);
    const animatedCellStyle = {
      backgroundColor: hasValue
        ? animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          })
        : animationsColor[index].interpolate({
            inputRange: [0, 1],
            outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          }),
      borderRadius: animationsScale[index].interpolate({
        inputRange: [0, 1],
        outputRange: [26, 16],
      }),
      transform: [
        {
          scale: animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.2, 1],
          }),
        },
      ],
    };

    // Run animation on next event loop tik
    // Because we need first return new style prop and then animate this value
    setTimeout(() => {
      animateCell({ hasValue, index, isFocused });
    }, 0);

    return (
      <View
        key={index}
        borderRadius={'m'}
        height={CELL_SIZE}
        width={CELL_SIZE}
        marginHorizontal={'xs'}
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.1,
          shadowRadius: 2.22,
          elevation: 3,
        }}
      >
        <AnimatedText
          style={[
            {
              height: CELL_SIZE,
              width: CELL_SIZE,
              lineHeight: CELL_SIZE - 5,
              fontSize: 30,
              textAlign: 'center',
              borderRadius: 8,
              color: '#1C94B7',
              overflow: 'hidden',
            },
            animatedCellStyle,
          ]}
          onLayout={getCellOnLayoutHandler(index)}
        >
          {symbol || (isFocused ? <Cursor /> : null)}
        </AnimatedText>
      </View>
    );
  };

  return (
    <CodeField
      ref={ref}
      {...prop}
      value={code}
      onChangeText={setCode}
      cellCount={CELL_COUNT}
      rootStyle={{
        paddingHorizontal: 20,
        justifyContent: 'center',
        borderRadius: 50,
      }}
      keyboardType="number-pad"
      textContentType="oneTimeCode"
      keyboardAppearance={'light'}
      autoFocus
      renderCell={renderCell}
    />
  );
};
