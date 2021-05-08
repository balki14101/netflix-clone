// library imports
import {StyleSheet} from 'react-native';
import {colors} from '../../Styles/index';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    height: 200,
    width: 400,
  },
  mainView: {
    backgroundColor: colors.bgBlack,
    height: 200,
    flexDirection: 'row',
  },
  posterImage: {
    width: 100,
    height: 150,
    margin: 30,
  },
  detailsView: {
    marginTop: 30,
    // marginRight: 30,
    alignSelf: 'center',
  },
  title: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 20,

    marginRight: 250,
  },
  ratingView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    color: colors.white,
    fontSize: 30,
  },
});

export default styles;
