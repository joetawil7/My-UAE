import React, { useEffect } from 'react';
import moment from 'moment';
import { GradientText } from '@components';
import { Text, TextProps } from '@components/base';
import { stylesConstants } from '@styles';
import { Theme } from '@theme';

type Props = TextProps & {
  seconds: number;
  onTimerEnd: () => void;
  gradientVariant?: keyof Theme['linearGradientVariants'];
};

const TimerRaw = (props: Props) => {
  const { onTimerEnd, seconds, gradientVariant } = props;
  const [time, setTime] = React.useState(seconds);
  const timerRef = React.useRef(time);

  useEffect(() => {
    const timerId = setInterval(() => {
      timerRef.current -= 1;
      if (timerRef.current < 0) {
        clearInterval(timerId);
      } else {
        setTime(timerRef.current);
      }
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  useEffect(() => {
    if (time === 0) {
      onTimerEnd();
    }
  }, [onTimerEnd, time]);

  return gradientVariant ? (
    <GradientText
      textProps={{ variant: stylesConstants.SMALL_FONT }}
      gradientVariant={gradientVariant}
      text={moment.utc(1000 * time).format('m[m] ss[s]')}
    />
  ) : (
    <Text variant={stylesConstants.SMALL_FONT} {...props}>
      {moment.utc(1000 * time).format('m[m] ss[s]')}
    </Text>
  );
};

export const Timer = React.memo(TimerRaw);
