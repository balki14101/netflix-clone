import React from 'react';

import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

import List from './Screens/List';
import Details from './Screens/Details';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
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
          <Stack.Screen name="Details" component={Details} />
        </Stack.Navigator>
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
