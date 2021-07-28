import React from 'react';
import {ImageBackground, TouchableOpacity} from 'react-native';
import {
  StyleSheet,
  View,
  Image,
  Text,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../Styles';
import {url} from '../../Constants/index';
import styles from './Styles';
import Axios from 'axios';
import ApiClient from '../../ApiClient';
import {connect} from 'react-redux';
import {
  fetchCrewData,
  fetchMovieDetails,
  fetchSimilarMovies,
} from '../../Reducers/Movie';
import Loader from '../../Components/Loader';

const imagePathDetailsScreen = url.imagePathDetailsScreen;

const Movies = props => {
  const data = props.name;
  return (
    <View style={styles.center}>
      <View style={styles.top10}>
        <Image
          source={{uri: imagePathDetailsScreen + data.poster_path}}
          style={styles.movieImage}
        />
      </View>
      <View>
        <Text style={styles.movieTitle}>{data.title}</Text>
      </View>
    </View>
  );
};

const Cast = props => {
  const {data, onCastPress} = props;
  const image = imagePathDetailsScreen + data.profile_path;

  return (
    <TouchableOpacity
      onPress={() => {
        onCastPress(data.id);
      }}>
      <View style={styles.castView}>
        {/* image margin doubt right
          here */}
        <View style={styles.insideCastView}>
          <Image source={{uri: image}} style={styles.castImage} />
          <Text style={styles.textColor}>{data.name}</Text>
          <Text style={styles.textColor}>{data.character}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // details: null,
      // crewData: null,
      // similarData: null,
    };
    this.MovieId = props.route.params.MovieId;
  }

  componentDidMount = () => {
    const {dispatch, details, crew, similarMovies} = this.props;

    if (this.MovieId != null) {
      if (!details) {
        dispatch(fetchMovieDetails({movieId: this.MovieId}));
      }
      if (!crew) {
        dispatch(fetchCrewData({movieId: this.MovieId}));
      }
      if (!similarMovies) {
        dispatch(fetchSimilarMovies({movieId: this.MovieId}));
      }
    }
  };

  renderSimilarMovies = (item, index) => {
    return <Movies name={item} key={index} />;
  };

  /**
   * @function renderCastDetails
   * @description Takes a, b and returns xyz
   * @returns {JSX}
   * @param {object} item
   * @param {number} index

   */
  renderCastDetails = (item, index) => {
    return <Cast data={item} onCastPress={this.gotoCast} key={index} />;
  };

  gotoCast = castId => {
    this.props.navigation.navigate('Cast', {castId});
  };

  // renderCrewDetails = item => {
  //   return <Crew data={item} />;
  // };

  render() {
    const details = this.props.details;
    console.log(details);
    const crewData = this.props.crew;
    const similarData = this.props.similarMovies;

    const backdrop = details
      ? imagePathDetailsScreen + details.backdrop_path
      : '---';
    const title = details ? details.original_title : '---';
    const rating = details ? details.vote_average : '----';
    // const name = similarData ? similarData.title : '---;';

    if (details == null || crewData == null || similarData == null) {
      return <Loader />;
    }
    return (
      <ScrollView style={styles.container}>
        <ImageBackground
          source={{uri: backdrop}}
          style={styles.imageBackGround}>
          <View style={styles.titleView}>
            <Text style={styles.title}>{title}</Text>
          </View>
        </ImageBackground>
        <View style={styles.view}>
          <View style={styles.ratingView}>
            <AntDesign name="star" size={20} color={colors.gold} />
            <Text style={styles.rating}>{rating}</Text>
          </View>

          <View>
            <Text style={styles.genreView}>
              {details.genres.map(item => item.name).join('*')}
            </Text>
          </View>

          <View>
            <Text numberOfLines={6} style={styles.overview}>
              {details.overview}
            </Text>
          </View>
          <View style={styles.top10}>
            <Text style={styles.header}>Cast</Text>
            <ScrollView horizontal={true}>
              <Text style={styles.top10}>
                {crewData.cast.map(this.renderCastDetails)}
              </Text>
            </ScrollView>
          </View>

          <View style={styles.top20}>
            <Text style={styles.header}>Similar Movies</Text>
            <ScrollView horizontal style={styles.top10}>
              <Text>{similarData.results.map(this.renderSimilarMovies)}</Text>
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default connect(
  (state, props) => {
    console.log(props);
    const movieId = props.route.params.MovieId;
    return {
      detailsLoading: state.movie.detailsLoading[movieId],
      details: state.movie.details[movieId],
      crew: state.movie.crew[movieId],
      similarMovies: state.movie.similarMovies[movieId],
    };
  },
  dispatch => {
    return {
      dispatch,
    };
  },
)(Details);
