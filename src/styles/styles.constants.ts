import { Theme, fontFamilies } from '@theme';

// size
const TEXT_FIELD_HEIGHT = 55;
const OUTER_PROFILE_PICTURE_SIZE = 35;
const OUTER_PROFILE_PICTURE_SIZE_L = 55;

// spacing
const HEADER_TOP_MARGIN: keyof Theme['spacing'] = 'xl';
const FOOTER_BOTTOM_MARGIN: keyof Theme['spacing'] = 'xl';
const NAV_HEADER_BOTTOM_MARGIN: keyof Theme['spacing'] = 'xl';

// border radius
const CONTAINER_BORDER_RADIUS_MAX: keyof Theme['borderRadii'] = 's';

// font families
const PRIMARY_FONT_FAMILY = fontFamilies.poppins_regular;
const SECONDARY_FONT_FAMILY = fontFamilies.roboto_regular;

// font variant
const MAIN_HEADER_FONT: keyof Theme['textVariants'] = 'paytoneOne_xxl';
const HEADER_FONT: keyof Theme['textVariants'] = 'poppins_xl_bold';
const WIDE_BUTTON_FONT: keyof Theme['textVariants'] = 'poppins_l_medium';
const MEDIUM_BUTTON_FONT: keyof Theme['textVariants'] = 'poppins_m_medium';
const SMALL_BUTTON_FONT: keyof Theme['textVariants'] = 'poppins_s_medium';
const DEFAULT_FONT: keyof Theme['textVariants'] = 'default';
const SMALL_FONT: keyof Theme['textVariants'] = 'poppins_s';
const OUTER_USERNAME_FONT: keyof Theme['textVariants'] = 'poppins_s_medium';
const NAVIGATION_HEADER_FONT: keyof Theme['textVariants'] = 'poppins_l_medium';

export const stylesConstants = {
  TEXT_FIELD_HEIGHT,
  HEADER_TOP_MARGIN,
  FOOTER_BOTTOM_MARGIN,
  CONTAINER_BORDER_RADIUS_MAX,
  PRIMARY_FONT_FAMILY,
  SECONDARY_FONT_FAMILY,
  MAIN_HEADER_FONT,
  HEADER_FONT,
  WIDE_BUTTON_FONT,
  MEDIUM_BUTTON_FONT,
  SMALL_BUTTON_FONT,
  DEFAULT_FONT,
  SMALL_FONT,
  OUTER_USERNAME_FONT,
  OUTER_PROFILE_PICTURE_SIZE,
  OUTER_PROFILE_PICTURE_SIZE_L,
  NAVIGATION_HEADER_FONT,
  NAV_HEADER_BOTTOM_MARGIN,
};
