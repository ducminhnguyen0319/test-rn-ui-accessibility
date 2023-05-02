import React, {useState} from 'react';

import {View, Platform} from 'react-native';
import useStyles from '../../styles';

import DateTimePickerInputTextField from './DateTimePickerInputTextField';
import {Button as PaperButton} from 'react-native-paper';

// Request location permission
import {GooglePlacesAutocompleteRef} from 'react-native-google-places-autocomplete';
import {PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
navigator.geolocation = require('react-native-geolocation-service');
import GooglePlacesInput from './GooglePlacesInput';

// Pre-define locations
const homePlace = {
  description: 'Home',
  geometry: {location: {lat: 63.8372135, lng: 23.1434579}},
};

const workPlace = {
  description: 'Work',
  geometry: {location: {lat: 63.8351629, lng: 23.1154922}},
};

const requestCameraPermission = async () => {
  if (Platform.OS === 'ios') {
    Geolocation.requestAuthorization('whenInUse');
  } else {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'App Location Permission',
          message:
            'App needs access to your location' +
            'so you can get better search location results.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }
};

const HomeScreen = () => {
  const styles = useStyles();
  const ref1 = React.createRef<GooglePlacesAutocompleteRef>();
  const ref2 = React.createRef<GooglePlacesAutocompleteRef>();

  const [disableBt1, setDisableBt1] = useState(true);
  const [disableBt2, setDisableBt2] = useState(true);

  requestCameraPermission();

  const onSelectedDateTime = (date: any) => {
    console.log(date);
    ref1?.current?.focus();
    setDisableBt1(false);
  };

  const onSelectedPickUpPoint = (data: any, details: any) => {
    console.log(data, details);
    ref2?.current?.focus();
    setDisableBt1(false);
  };

  const onSelectedDropoffPoint = (data: any, details: any) => {
    console.log(data, details);
    setDisableBt1(false);
    setDisableBt2(false);
  };

  return (
    <View style={styles.container}>
      <DateTimePickerInputTextField onSelected={onSelectedDateTime} />
      <GooglePlacesInput
        ref={ref1}
        label="Select pickup point"
        predefinedPlaces={[homePlace, workPlace]}
        onSelected={onSelectedPickUpPoint}
      />
      <GooglePlacesInput
        ref={ref2}
        label="Select dropoff point"
        predefinedPlaces={[homePlace, workPlace]}
        onSelected={onSelectedDropoffPoint}
      />
      <View style={styles.horizontalContainer}>
        <PaperButton
          disabled={disableBt1}
          onPress={() => {
            console.log('press reset');
          }}
          accessibilityLabel="Press to reset all input fields"
          mode="outlined">
          Reset
        </PaperButton>
        <PaperButton
          disabled={disableBt2}
          onPress={() => {
            console.log('press confirm');
          }}
          accessibilityLabel="Press to confirm booking"
          mode="contained">
          Confirm
        </PaperButton>
      </View>
    </View>
  );
};

export default HomeScreen;
