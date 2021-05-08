import {StyleSheet} from 'react-native';
import {colors} from '../../Styles/index';

const styles = StyleSheet.create({
  // <renderStyles>
  container: {
    flex: 1,
    backgroundColor: colors.cardBg,
  },
  imageBackGround: {height: 200, justifyContent: 'flex-end'},
  titleView: {
    backgroundColor: colors.bgBlack,
    height: 200,
    justifyContent: 'flex-end',
  },
  title: {
    color: colors.white,
    fontSize: 40,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  view: {
    marginLeft: 20,
    marginRight: 20,
  },
  ratingView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    color: colors.gold,
    marginLeft: 5,
  },
  genreView: {
    color: colors.white,
    marginTop: 5,
  },
  overview: {
    color: colors.overview,
    marginTop: 10,
    fontSize: 12,
    lineHeight: 20,
  },
  top10: {marginTop: 10},
  header: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  top20: {marginTop: 20},

  //</renderStyles>

  //<similarMoviesStyles>
  center: {
    alignItems: 'center',
  },
  movieImage: {
    height: 150,
    width: 100,
    borderRadius: 8,
  },
  movieTitle: {
    color: colors.white,
    marginLeft: 10,
  },

  //</similarMoviesStyles>

  //<castStyles>
  castView: {
    backgroundColor: colors.castCard,
    borderRadius: 8,
    margin: 5,
  },
  insideCastView: {
    margin: 5,
    alignItems: 'center',
  },
  castImage: {
    height: 150,
    width: 100,
    borderRadius: 8,
  },
  textColor: {
    color: colors.black,
  },

  //</castStyles>
});

export default styles;
