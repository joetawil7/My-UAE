import { ICON_SIZE } from '@assets';
import { View, Image, Text, TouchableOpacity, Icon } from '@components/base';
import { LocationSelection } from '@components';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useTranslate } from '@localization';
import { stylesConstants } from '@styles';
import { GoogleLocation } from '@types';
import React, { useRef } from 'react';
import { useAuthentication } from '@services';

interface Props {
  location?: GoogleLocation;
  setLocation: (location: GoogleLocation) => void;
  onDismiss: () => void;
}

const PostProfileLocationRaw = (props: Props) => {
  const { location, setLocation, onDismiss } = props;

  const bottomSheetModalRef = useRef<BottomSheetModalMethods>(null);

  const { authenticatedUser } = useAuthentication();
  const { t } = useTranslate();

  const handlePresentModalPress = () => {
    bottomSheetModalRef.current?.present();
  };

  return (
    <View flex={1} flexDirection='row'>
      <Image
        source={require('@assets/img/profile.png')}
        height={stylesConstants.OUTER_PROFILE_PICTURE_SIZE}
        width={stylesConstants.OUTER_PROFILE_PICTURE_SIZE}
        borderRadius='max'
        marginRight='xs'
      />

      <View>
        <Text variant={stylesConstants.OUTER_USERNAME_FONT}>
          {authenticatedUser?.username}
        </Text>
        <TouchableOpacity
          flexDirection='row'
          alignItems='center'
          onPress={handlePresentModalPress}
        >
          <Text
            variant={stylesConstants.SMALL_FONT}
            color='primary'
            marginRight='2xs'
          >
            {location ? location.terms[0].value : t('location')}
          </Text>
          {!location && (
            <Icon size={ICON_SIZE.s} color='primary' name='location' />
          )}
        </TouchableOpacity>
      </View>

      <LocationSelection
        ref={bottomSheetModalRef}
        onDismiss={onDismiss}
        setSelectedLocation={(_location) => {
          bottomSheetModalRef.current?.close();
          onDismiss();
          setLocation(_location);
        }}
      />
    </View>
  );
};

export const PostProfileLocation = React.memo(PostProfileLocationRaw);
