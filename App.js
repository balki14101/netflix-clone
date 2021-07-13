// library imports
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {store} from './src/store';
import {Provider} from 'react-redux';

// screens imports
import Navigator from './src/Navigator';
import { colors } from './src/Styles';

/**
 * @function App
 * @description This is the starting point of App
 * @returns {JSX}
 */
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
          <Navigator />
        </SafeAreaView>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgBlack
  },
});

export default App;
