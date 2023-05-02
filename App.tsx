/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';
import useStyles, {usePaperScheme} from './styles';
import {Provider as PaperProvider} from 'react-native-paper';
import {BottomNavigation} from 'react-native-paper';
import {CommonActions, NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './src/components/HomeScreen';
import LocationPicker from './src/components/LocationPicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

function App(): JSX.Element {
  const styles = useStyles();
  const paperScheme = usePaperScheme();

  return (
    <PaperProvider theme={paperScheme}>
      <SafeAreaView style={styles.safeArea}>
        <NavigationContainer>
          <StatusBar barStyle={styles.statusBar.barStyle} />
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
            }}
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBar={({navigation, state, descriptors, insets}) => (
              <BottomNavigation.Bar
                navigationState={state}
                safeAreaInsets={insets}
                onTabPress={({route, preventDefault}) => {
                  const event = navigation.emit({
                    type: 'tabPress',
                    target: route.key,
                    canPreventDefault: true,
                  });

                  if (event.defaultPrevented) {
                    preventDefault();
                  } else {
                    navigation.dispatch({
                      ...CommonActions.navigate(route.name, route.params),
                      target: state.key,
                    });
                  }
                }}
                renderIcon={({route, focused, color}) => {
                  const {options} = descriptors[route.key];
                  if (options.tabBarIcon) {
                    return options.tabBarIcon({focused, color, size: 24});
                  }

                  return null;
                }}
                getLabelText={({route}) => {
                  const {options} = descriptors[route.key];
                  const label =
                    options.tabBarLabel !== undefined
                      ? options.tabBarLabel
                      : options.title !== undefined
                      ? options.title
                      : undefined;

                  return label;
                }}
              />
            )}>
            <Tab.Screen
              name="Booking"
              component={HomeScreen}
              options={{
                tabBarLabel: 'Booking',
                // eslint-disable-next-line react/no-unstable-nested-components
                tabBarIcon: ({color, size}) => {
                  return <Icon name="car" size={size} color={color} />;
                },
              }}
            />
            <Tab.Screen
              name="DateTimePickerPage"
              component={LocationPicker}
              options={{
                tabBarLabel: 'Receipt',
                // eslint-disable-next-line react/no-unstable-nested-components
                tabBarIcon: ({color, size}) => {
                  return <Icon name="receipt" size={size} color={color} />;
                },
              }}
            />
            <Tab.Screen
              name="Phone"
              component={LocationPicker}
              options={{
                tabBarLabel: 'phone',
                // eslint-disable-next-line react/no-unstable-nested-components
                tabBarIcon: ({color, size}) => {
                  return <Icon name="phone" size={size} color={color} />;
                },
              }}
            />
            <Tab.Screen
              name="Profile"
              component={LocationPicker}
              options={{
                tabBarLabel: 'Profile',
                // eslint-disable-next-line react/no-unstable-nested-components
                tabBarIcon: ({color, size}) => {
                  return <Icon name="account" size={size} color={color} />;
                },
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </PaperProvider>
  );
}

export default App;
