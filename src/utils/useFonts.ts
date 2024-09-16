import { useFonts } from 'expo-font';
import { PaytoneOne_400Regular } from '@expo-google-fonts/paytone-one';
import {
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
  Poppins_800ExtraBold,
} from '@expo-google-fonts/poppins';

import { Roboto_400Regular } from '@expo-google-fonts/roboto';

export const useAppFonts = () =>
  useFonts({
    'Poppins-Light': Poppins_300Light,
    'Poppins-Regular': Poppins_400Regular,
    'Poppins-Medium': Poppins_500Medium,
    'Poppins-Bold': Poppins_700Bold,
    'Poppins-ExtraBold': Poppins_800ExtraBold,
    'Roboto-Regular': Roboto_400Regular,
    'PaytoneOne-Regular': PaytoneOne_400Regular,
    Icons: require('@assets/icons/icons.ttf'),
  });
