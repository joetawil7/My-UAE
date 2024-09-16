import { IconsId } from '@assets/icons/icons';
import { I18nManager } from 'react-native';

const { isRTL } = I18nManager;

export const ChevronLeft: IconsId = isRTL ? 'chevron-right' : 'chevron-left';
export const ChevronRight: IconsId = isRTL ? 'chevron-left' : 'chevron-right';
