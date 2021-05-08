import {StyleSheet} from 'react-native';
import {colors} from '../../Styles/index';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.listScreenBg,
  },

  items: {
    // flexDirection: 'row',
    justifyContent: 'center',
    height: 150,
    marginLeft: 40,
    marginTop: 8,
    marginRight: 40,
    borderRadius: 15,
    backgroundColor: colors.cardBg,
  },
  row: {flexDirection: 'row'},
  image: {
    height: 140,
    width: 90,
    marginLeft: 5,
    borderRadius: 5,
  },
  detailsView: {
    marginLeft: 10,
    justifyContent: 'space-evenly',
  },
  ratingView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  voteAverage: {
    color: colors.gold,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  title: {
    color: colors.white,
    fontSize: 18,
  },
  white: {
    color: colors.white,
  },
});
export default styles;
