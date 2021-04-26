import React from 'react';

import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

import List from './Screens/List';
import Details from './Screens/Details';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <stack.Navigator>
          <stack.Screen name="LIST" Component={List} />
          <stack.Screen name="Details" component={Details} />
        </stack.Navigator>
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
