import React from 'react';
import {
  FlatList,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';

import {connect} from 'react-redux';

import AntDesign from 'react-native-vector-icons/AntDesign';
import {url} from '../../Constants/index';
import styles from './Styles';
import {colors} from '../../Styles/index';
import {fetchPopularMovies} from '../../Reducers/Movie';

const {posterPath} = url;

const MovieData = props => {
  const {data, onCardPress} = props;
  const {index, item} = data;
  const {poster_path, id, title, original_language, vote_average} = item;
  const uri = posterPath + poster_path;
  // sample comment here
  return (
    <TouchableOpacity
      onPress={() => {
        onCardPress(id);
      }}
      style={styles.items}>
      <View style={styles.row}>
        <Image source={{uri}} style={styles.image} />
        <View style={styles.detailsView}>
          <View style={{marginRight: 120, flexDirection: 'row'}}>
            {/* margin doubt right here */}
            <Text style={styles.title}>{`${index + 1}.`}</Text>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View>
            <View style={styles.ratingView}>
              <AntDesign name="star" color={colors.gold} size={15} />
              <Text style={styles.voteAverage}>{vote_average}</Text>
            </View>
            <Text style={styles.white}>{original_language}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

class List extends React.Component {
  state = {
    list: null,
  };

  componentDidMount = () => {
    const {dispatch} = this.props;

    dispatch(fetchPopularMovies());
  };

  navigateToDetailsScreen = MovieId => {
    this.props.navigation.navigate('Details', {MovieId});
  };

  renderMovieItem = props => (
    <MovieData
      key={props.index}
      data={props}
      onCardPress={this.navigateToDetailsScreen}
    />
  );
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.popularMovies}
          renderItem={this.renderMovieItem}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}

export default connect(
  (state, props) => {
    return {
      popularMovies: state.movie.popularMovies,
    };
  },
  dispatch => {
    return {
      dispatch,
    };
  },
)(List);
