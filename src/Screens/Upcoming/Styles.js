// library imports
import {StyleSheet} from 'react-native';

// styles
import {colors} from '../../Styles/index';

// utilities
import {screenHeight, screenWidth} from '../../Helpers/screenSize';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    height: screenHeight / 4,
    width: screenWidth,
  },
  mainView: {
    height: screenHeight / 2,
  },
});

export default styles;
