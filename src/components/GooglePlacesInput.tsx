import React from 'react';

import {TextInput as PageTextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet, TextInput, TouchableHighlight, View} from 'react-native';

// GG search location
import {
  GooglePlaceData,
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
  Place,
} from 'react-native-google-places-autocomplete';
import Config from 'react-native-config';
import useStyles, {usePaperScheme} from '../../styles';

interface CustomTextInputProps {
  value: string | undefined;
  label: string | undefined;
  hintAdd?: string;
  placeholder: string | undefined;
  firstPoint: boolean;
  lastPoint: boolean;
  onAdded?: () => void;
  onDeleted?: () => void;
}

const CustomTextInput = React.forwardRef<TextInput, CustomTextInputProps>(
  (props, ref) => {
    const styles = useStyles();
    const paperScheme = usePaperScheme();

    const innerStyles = StyleSheet.create({
      point: {
        width: 44,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: paperScheme.colors.surfaceVariant,
      },
      underline: {
        bottom: 2,
        position: 'absolute',
        height: 1,
        width: 44,
        backgroundColor: paperScheme.colors.onSurfaceVariant,
      },
    });

    const iconName = props.lastPoint
      ? 'map-marker-down'
      : props.firstPoint
      ? 'map-marker-up'
      : 'map-marker-path';

    return (
      <View style={styles.horizontalContainer}>
        <View
          style={styles.searchLocationInput}
          accessible={true}
          accessibilityLabel={props.label ?? 'press to search location'}
          accessibilityValue={{
            text:
              (props.value?.length ?? 0) > 0
                ? props.value
                : 'not set, double tap to edit and search or use these items in below list',
          }}>
          <PageTextInput
            {...props}
            ref={ref}
            label={props.label}
            placeholder={props.placeholder}
            left={
              <PageTextInput.Icon
                accessible={false}
                disabled={true}
                // eslint-disable-next-line react/no-unstable-nested-components
                icon={() => (
                  <Icon
                    name={iconName}
                    size={24}
                    color={paperScheme.colors.onSurfaceVariant}
                  />
                )}
              />
            }
            numberOfLines={1}
            style={styles.searchLocationInput}
          />
        </View>
        {!props.firstPoint && !props.lastPoint && (
          <TouchableHighlight>
            <View style={innerStyles.point}>
              <Icon
                accessibilityLabel="press to remove this point on route"
                name="map-marker-minus"
                size={28}
                color={paperScheme.colors.error}
                onPress={() => {
                  if (props.onDeleted) {
                    props.onDeleted();
                  }
                }}
              />
              <View style={innerStyles.underline} />
            </View>
          </TouchableHighlight>
        )}
        {!props.lastPoint && (
          <TouchableHighlight
            accessibilityLabel={props.hintAdd ?? 'add one location on route'}>
            <View style={innerStyles.point}>
              <Icon
                name="map-marker-plus"
                size={28}
                color={paperScheme.colors.onSurfaceVariant}
                onPress={() => {
                  if (props.onAdded) {
                    props.onAdded();
                  }
                }}
              />
              <View style={innerStyles.underline} />
            </View>
          </TouchableHighlight>
        )}
      </View>
    );
  },
);

export interface GooglePlacesInputProps {
  predefinedPlaces: Place[];
  placeholder: string | undefined;
  firstPoint?: boolean;
  lastPoint?: boolean;
  onSelected: (
    data: GooglePlaceData,
    details: GooglePlaceDetail | null,
    index: number,
  ) => void;
  index: number;
  hintAdd?: string;
  onAdded?: (afterIndex: number) => void;
  onDeleted?: (atIndex: number) => void;
}

const GooglePlacesInput = React.forwardRef<
  GooglePlacesAutocompleteRef,
  GooglePlacesInputProps
>((props, ref) => {
  const {
    predefinedPlaces,
    placeholder,
    firstPoint,
    lastPoint,
    onSelected,
    index,
    hintAdd,
    onAdded,
    onDeleted,
  } = props;
  // const [debugData, setDebugData] = useState<GooglePlaceData | null>(null);

  const handleAdded = () => {
    if (onAdded) {
      onAdded(index);
    }
  };

  const handleDeleted = () => {
    if (onDeleted) {
      onDeleted(index);
    }
  };

  return (
    <>
      <GooglePlacesAutocomplete
        ref={ref}
        placeholder="Search location"
        onPress={(data, details = null) => {
          onSelected(data, details, index);
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
          placeholder: placeholder,
          lastPoint,
          firstPoint,
          index,
          hintAdd,
          onAdded: handleAdded,
          onDeleted: handleDeleted,
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
