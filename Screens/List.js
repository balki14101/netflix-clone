import React from 'react';
import {
  FlatList,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';

const IMAGE_URI = 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2';

const MovieData = ({data, onpress}) => {
  const uri = IMAGE_URI + data.poster_path;

  return (
    <TouchableOpacity
      onPress={() => {
        onpress(data.id);
      }}
      style={styles.items}>
      <View style={{flexDirection: 'row'}}>
        <Image
          source={{uri: uri}}
          style={{
            height: 140,
            width: 90,
            marginLeft: 5,
            borderRadius: 5,
          }}
        />
        <View
          style={{
            marginLeft: 10,
            justifyContent: 'space-evenly',
          }}>
          <View style={{marginRight: 95}}>
            <Text style={{color: '#fff', fontSize: 18}}>{data.title}</Text>
          </View>
          <View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <AntDesign name="star" color="gold" size={15} />
              <Text style={{color: 'gold', fontWeight: 'bold', marginLeft: 5}}>
                {data.vote_average}
              </Text>
            </View>
            {/* <Text style={{color: '#fff'}}>director</Text> */}

            <Text style={{color: '#fff'}}>{data.original_language}</Text>
          </View>
        </View>
      </View>
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
    console.log('this is item', item.item);
    return <MovieData data={item.item} onpress={this.gotodetailsscreen} />;
  };
  render() {
    console.log(this.state.list);
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.list}
          renderItem={this.renderMovieItem}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001',
  },

  items: {
    // flexDirection: 'row',
    justifyContent: 'center',
    height: 150,
    marginLeft: 40,
    marginTop: 8,
    marginRight: 40,
    borderRadius: 15,
    backgroundColor: '#252632',
  },
});

export default List;
