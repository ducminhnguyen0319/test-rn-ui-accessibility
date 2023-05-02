import React from 'react';

import {TextInput as PageTextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TextInput} from 'react-native';

// GG search location
import {
  GooglePlaceData,
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
  Place,
} from 'react-native-google-places-autocomplete';
import Config from 'react-native-config';
import useStyles from '../../styles';

interface CustomTextInputProps {
  value: string | undefined;
  placeholder: string | undefined;
}

const CustomTextInput = React.forwardRef<TextInput, CustomTextInputProps>(
  (props, ref) => {
    const styles = useStyles();

    return (
      <PageTextInput
        {...props}
        ref={ref}
        left={
          <PageTextInput.Icon
            accessibilityLabel="Press search location"
            // eslint-disable-next-line react/no-unstable-nested-components
            icon={() => <Icon name="map-marker" size={24} />}
          />
        }
        numberOfLines={1}
        accessibilityHint={props.value ?? 'Search location'}
        placeholder={props.placeholder ?? 'Search location'}
        style={styles.searchLocationInput}
      />
    );
  },
);

export interface GooglePlacesInputProps {
  predefinedPlaces: Place[];
  label: string;
  onSelected: (
    data: GooglePlaceData,
    details: GooglePlaceDetail | null,
  ) => void;
}

const GooglePlacesInput = React.forwardRef<
  GooglePlacesAutocompleteRef,
  GooglePlacesInputProps
>((props, ref) => {
  const {predefinedPlaces, label, onSelected} = props;
  // const [debugData, setDebugData] = useState<GooglePlaceData | null>(null);

  return (
    <>
      <GooglePlacesAutocomplete
        ref={ref}
        placeholder="Search location"
        onPress={(data, details = null) => {
          onSelected(data, details);
        }}
        query={{
          key: Config.GOOGLE_PLACES_API_KEY,
        }}
        minLength={2}
        debounce={500}
        fetchDetails={true}
        autoFillOnNotFound={true}
        enablePoweredByContainer={false}
        enableHighAccuracyLocation={true}
        predefinedPlaces={predefinedPlaces}
        currentLocation={true}
        currentLocationLabel="Current location"
        textInputProps={{
          InputComp: CustomTextInput,
          placeholder: label,
          clearButtonMode: 'while-editing',
        }}
        styles={{
          container: {
            flex: 0,
            zIndex: 0,
          },
        }}
      />
    </>
  );
});

export default GooglePlacesInput;
