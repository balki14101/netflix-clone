export const gotoMovieDetailsScreen = (navigation, MovieId) => {
  console.log(navigation);
  navigation.navigate('Details', {MovieId});
};
