import React from 'react';
import {Text, View, ActivityIndicator, FlatList, Image} from 'react-native';
import {baseProps} from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlers';

const BACKDROP_URL = 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2';

const Movies = ({data}) => {
  const image = BACKDROP_URL + data.poster_path;
  return (
    <View style={{flex: 1}}>
      <Image
        source={{uri: image}}
        style={{height: 200}}
        resizeMode={'contain'}
      />
      <View>
        <Text>{data.title}</Text>
      </View>
    </View>
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
    return <Movies data={item} />;
  };
  render() {
    const {topRatedData} = this.state;

    if (!topRatedData) {
      return (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <ActivityIndicator color="blue" size="large" />
        </View>
      );
    }
    return (
      <FlatList
        keyExtractor={item => item.id}
        data={topRatedData}
        renderItem={this.renderTopRated}
        //=> (
        //   <View>
        //     <Image source={{uri: BACKDROP_URL + item.backdrop_path}} />
        //     <Text>{item.title}</Text>
        //   </View>
        // )}
      />
    );
  }
}

export default TopRated;
