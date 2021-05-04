import React from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
} from 'react-native';
import {baseProps} from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlers';

const BACKDROP_URL = 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2';
const NEW_LINK = 'https://themoviedb.org/t/p/w500_and_h282_face';

const Movies = ({data}) => {
  const backGroundImage = NEW_LINK + data.backdrop_path;
  const image = BACKDROP_URL + data.poster_path;

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={{uri: backGroundImage}}
        style={{height: 200, width: 400}}
        blurRadius={1}>
        <View>
          <Image source={{uri: image}} style={{width: 100, height: 150}} />
        </View>
        <View>
          <Text>{data.title}</Text>
          <Text>{data.vote_average}</Text>
        </View>
      </ImageBackground>
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
