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
          activeColor="#e8e8e8"
          inactiveColor="#252632"
          barStyle={{backgroundColor: '#001'}}>
          <Tab.Screen
            name="Home"
            component={stackScreen}
            options={{
              title: ' Home',
              tabBarBadge: 9,
              tabBarIcon: ({color}) => (
                <MaterialIcons name="home" color={color} size={20} />
              ),
            }}
          />
          <Tab.Screen
            name="TopRated"
            component={TopRated}
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
