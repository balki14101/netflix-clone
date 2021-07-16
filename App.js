// library imports
import React from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import {store} from './src/store';
import {Provider} from 'react-redux';

// screens imports
import Navigator from './src/Navigator';
import {colors} from './src/Styles';

/**
 * @function App
 * @description This is the starting point of App
 * @returns {JSX}
 */

const MyTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.bgBlack,
  },
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer theme={MyTheme}>
        <Navigator />
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
