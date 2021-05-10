// library imports
import React from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

// UI components
import Loader from '../../Components/Loader';

// styles
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../Styles';

// constants
import {url} from '../../Constants';
import styles from './Styles';

// destructuring
const {posterPath, backdropPath} = url;

const Movies = ({data, onMoviePress}) => {
  const backGroundImage = backdropPath + data.backdrop_path;
  const image = posterPath + data.poster_path;
  const {id} = data;
  return (
    <TouchableOpacity
      onPress={() => {
        onMoviePress(id);
      }}>
      <View style={styles.container}>
        <ImageBackground source={{uri: backGroundImage}} style={styles.bgImage}>
          <View style={styles.mainView}>
            <Image source={{uri: image}} style={styles.posterImage} />
            <View style={styles.detailsView}>
              <Text style={styles.title}>
                {/**doubt right here
                 *title margin */}

                {data.title}
              </Text>
              <View style={styles.ratingView}>
                <MaterialIcons name="star" size={30} color={colors.gold} />
                <Text style={styles.rating}>{data.vote_average}</Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

class TopRated extends React.Component {
  state = {
    topRatedData: null,
  };

  fetchTopRated = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=628f811dd14b86f8fea17c431c364235&language=en-US&page=1`,
    )
      .then(response => response.json())
      .then(data => this.setState({topRatedData: data.results}))
      .catch(e => {
        console.log(e.message);
      });
  };
  componentDidMount = () => {
    this.fetchTopRated();
  };

  renderTopRated = ({item}) => {
    return <Movies data={item} onMoviePress={this.gotoMovieDetails} />;
  };

  gotoMovieDetails = MovieId => {
    this.props.navigation.navigate('TopRatedMovieDetails', {MovieId});
  };
  render() {
    const {topRatedData} = this.state;
    if (!topRatedData) {
      return <Loader />;
    }
    return (
      <FlatList
        keyExtractor={item => item.id}
        data={topRatedData}
        renderItem={this.renderTopRated}
      />
    );
  }
}

export default TopRated;
