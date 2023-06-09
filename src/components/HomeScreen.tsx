import React, {Key, useState} from 'react';

import uuid from 'react-native-uuid';
import {
  View,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
} from 'react-native';
import useStyles from '../../styles';

import BlankView from './BlankView';
import DateTimePickerInputTextField from './DateTimePickerInputTextField';
import {Button as PaperButton, Text} from 'react-native-paper';

// Request location permission
import {
  GooglePlaceData,
  GooglePlaceDetail,
  GooglePlacesAutocompleteRef,
} from 'react-native-google-places-autocomplete';
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

interface SelectedPointProps {
  value: string | undefined;
  key: Key;
  ref: React.RefObject<GooglePlacesAutocompleteRef>;
}

const HomeScreen = () => {
  const styles = useStyles();
  const ref1 = React.createRef<GooglePlacesAutocompleteRef>();
  const ref2 = React.createRef<GooglePlacesAutocompleteRef>();

  const [disableBt1, setDisableBt1] = useState(true);
  const [disableBt2, setDisableBt2] = useState(true);

  const firstPoint = {
    value: undefined,
    key: uuid.v4() as Key,
    ref: ref1,
  };
  const lastPoint = {
    value: undefined,
    key: uuid.v4() as Key,
    ref: ref2,
  };

  const [pickupDate, setPickupDate] = useState<Date | undefined>();
  const [points, setPoints] = useState<SelectedPointProps[]>([
    firstPoint,
    lastPoint,
  ]);

  requestCameraPermission();

  const onSelectedDateTime = (date: any) => {
    console.log(date);
    setPickupDate(date);
    setDisableBt1(false);

    if (points[0].value === undefined) {
      const ref = points[0].ref;
      ref.current?.focus();
    }
  };

  const onSelectedPoint = (
    data: GooglePlaceData,
    details: GooglePlaceDetail | null,
    index: number,
  ) => {
    const newArray = [...points];
    newArray[index].value = data.description ?? details?.name;
    setPoints([]);
    setPoints(newArray);

    if (index < points.length - 1) {
      if (points[index + 1].value === undefined) {
        const ref = points[index + 1].ref;
        ref.current?.focus();
      }
      setDisableBt1(false);
    } else {
      Keyboard.dismiss();
      setDisableBt2(false);
    }
  };

  const onAddedPoint = (afterIndex: number) => {
    const ref = React.createRef<GooglePlacesAutocompleteRef>();
    const newpoint = {
      value: undefined,
      ref: ref,
      key: uuid.v4() as Key,
    };
    const arr = [...points];

    setPoints([
      ...arr.slice(0, afterIndex + 1),
      newpoint,
      ...arr.slice(afterIndex + 1),
    ]);
  };

  const onDeletedPoint = (atIndex: number) => {
    console.log('delete at', atIndex);
    setPoints([...points.slice(0, atIndex), ...points.slice(atIndex + 1)]);
  };

  console.log(points.map(item => item.value));

  return (
    <ScrollView
      contentContainerStyle={styles.scrollviewContentContainer}
      keyboardShouldPersistTaps="always"
      style={styles.scrollviewBottomUp}>
      <Text>Some predefine properties go here.</Text>
      <BlankView display={pickupDate === undefined} />
      <DateTimePickerInputTextField onSelected={onSelectedDateTime} />
      {points.map((point, index) => {
        const checkFirstPoint = index === 0;
        const checkLastPoint = index === points.length - 1;
        const placeholder =
          index === 0
            ? 'Select pickup point'
            : index === points.length - 1
            ? 'Select dropoff point'
            : 'Select next point';
        const hint = `press to add a point after ${point.value}`;

        var showBlankView = false;
        if (pickupDate !== undefined) {
          if (point.value === undefined) {
            showBlankView = true;
          }

          for (let i = 0; i < index; i++) {
            const pointX = points[i];
            if (pointX.value === undefined) {
              showBlankView = false;
              break;
            }
          }
        }

        return [
          <BlankView display={showBlankView} key={`${point.ref}-blank`} />,
          <KeyboardAvoidingView
            keyboardVerticalOffset={20}
            behavior="padding"
            key={point.key}>
            <GooglePlacesInput
              key={point.key}
              ref={point.ref}
              placeholder={placeholder}
              hintAdd={hint}
              value={point.value}
              predefinedPlaces={[homePlace, workPlace]}
              onSelected={onSelectedPoint}
              index={index}
              firstPoint={checkFirstPoint}
              lastPoint={checkLastPoint}
              onAdded={onAddedPoint}
              onDeleted={onDeletedPoint}
            />
          </KeyboardAvoidingView>,
        ];
      })}
      {/* Buttons */}
      <View style={styles.horizontalContainer1}>
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
    </ScrollView>
    // </KeyboardAvoidingView>
  );
};

export default HomeScreen;
