// library imports
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

// screens imports
import List from './src/Screens/List';
import Details from './src/Screens/Details';
import TopRated from './src/Screens/TopRated';

// icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Cast from './src/Screens/Cast/index.js';
import colors from './src/Styles/index';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

/**
 * @function stackScreen
 * @description this is the stack screen container
 */
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
      <Stack.Screen
        name="Cast"
        component={Cast}
        options={{
          headerTintColor: '#808080',
          headerStyle: {
            backgroundColor: '#252632',
          },
        }}
      />
    </Stack.Navigator>
  );
};

/**
 * @function App
 * @description This is the starting point of A;pp
 * @returns {JSX}
 */
const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <Tab.Navigator
          activeColor={colors.white}
          inactiveColor={colors.tabBarInActive}
          barStyle={{backgroundColor: '#001'}}>
          <Tab.Screen
            name="Home"
            component={stackScreen}
            options={{
              title: ' Home',
              tabBarIcon: ({color}) => (
                <MaterialIcons name="home" color={color} size={20} />
              ),
            }}
          />
          <Tab.Screen
            name="TopRated"
            component={TopRated}
            options={{
              tabBarIcon: ({color}) => (
                <MaterialCommunityIcons
                  name="certificate"
                  color={color}
                  size={20}
                />
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
