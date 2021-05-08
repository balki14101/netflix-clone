import {StyleSheet} from 'react-native';
import {colors} from '../../Styles';

const styles = (StyleSheet.Create = {
  container: {
    flex: 1,
    backgroundColor: colors.cardBg,
  },
  marginLeft: {
    marginLeft: 10,
  },
  alignItems: {
    alignItems: 'center',
  },
  info: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 25,
    fontFamily: 'sans-serif',
  },
  headerText: {
    fontFamily: 'sans-serif-medium',
    color: colors.white,
    fontSize: 15,
    marginTop: 10,
  },
  text: {
    fontFamily: 'sans-serif',
    color: colors.overview,
  },
  viewMoreText: {
    color: colors.overview,
  },
});

export default styles;
