import React from 'react';
import {FlatList, TouchableOpacity, View, StyleSheet} from 'react-native';

const IMAGE_URI = 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2';

const MovieData = (data, onpress) => {
  const uri = IMAGE_URI + data.poster_path;

  return (
    <TouchableOpacity
      onpress={() => {
        onpress(data.id);
      }}
      style={styles.items}>
      <Image source={{uri: uri}} style={{height: 25, width: 25}} />
      <Text style={{color: '#fff'}}>{data.original_title}</Text>
    </TouchableOpacity>
  );
};

class List extends React.Component {
  state = {
    list: [],
  };

  componentDidMount = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=628f811dd14b86f8fea17c431c364235&language=en-US&page=1`,
    )
      .then(response => response.json())
      .then(json => {
        console.log({RESPONSE: json});
        this.setState({list: json.results});
      });
  };

  gotodetailsscreen = MovieId => {
    this.props.navigation.navigate('Details', {MovieId});
  };

  renderMovieItem = item => {
    return <MovieData data={item} onpress={this.gotodetailsscreen} />;
  };
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.list}
          renderItem={this.renderMovieItem}
          keyExtractor={(item = item.id)}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  items: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
    marginTop: 8,
  },
});

export default List;
