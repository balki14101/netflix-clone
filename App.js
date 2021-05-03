import React from 'react';

import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

import List from './Screens/List';
import Details from './Screens/Details';
import Screen1 from './Screens/Screen1';

import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {Image} from 'react-native';
import color from 'color';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

stackScreen = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={List}
        options={{
          title: 'List',
          headerTintColor: '#808080',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerStyle: {backgroundColor: '#000'},
        }}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{
          title: ' ',
          headerTintColor: '#808080',
          headerStyle: {
            backgroundColor: '#252632',
          },
        }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <Tab.Navigator
          activeColor="#e8e8e8"
          inactiveColor="#252632"
          barStyle={{backgroundColor: '#001'}}>
          <Tab.Screen
            name="Home"
            component={stackScreen}
            options={{
              title: ' sdf',
              tabBarBadge: 9,
              tabBarIcon: ({color}) => (
                <MaterialIcons name="home" color={color} size={20} />
              ),
            }}
          />
          <Tab.Screen
            name="Settings"
            component={Screen1}
            options={{
              tabBarBadge: 5,
              tabBarIcon: ({color}) => (
                <MaterialIcons name="settings" color={color} size={20} />
              ),
            }}
          />
        </Tab.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
