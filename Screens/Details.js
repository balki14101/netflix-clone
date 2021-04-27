import React from 'react';
import {ImageBackground} from 'react-native';
import {StyleSheet, View, Image, Text, ActivityIndicator} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';

const BACKDROP_URL = 'https://www.themoviedb.org/t/p/original';

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: null,
      crewData: null,
    };
    this.MovieId = props.route.params.MovieId;
  }

  componentDidMount = () => {
    if (this.MovieId != null) {
      fetch(
        `https://api.themoviedb.org/3/movie/${this.MovieId}?api_key=628f811dd14b86f8fea17c431c364235&language=en-US `,
      )
        .then(response => response.json())
        .then(json => {
          console.log({Response: json});
          this.setState({details: json});
        });

      fetch(
        `https://api.themoviedb.org/3/movie/${this.MovieId}/credits?api_key=628f811dd14b86f8fea17c431c364235&language=en-US`,
      )
        .then(response => response.json())
        .then(json => {
          console.log({Response: json});

          this.setState({crewData: json});
        });
    }
  };

  render() {
    console.log('this is details', this.state.details);
    const details = this.state.details;
    const crewData = this.state.crewData;

    const backdrop = details ? BACKDROP_URL + details.backdrop_path : '---';
    const title = details ? details.original_title : '---';
    const rating = details ? details.vote_average : '----';

    if (details == null || crewData == null) {
      return (
        <View style={{flex: 1}}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <ImageBackground
          source={{uri: backdrop}}
          style={{height: 200, justifyContent: 'flex-end'}}>
          <Text
            style={{
              color: '#fff',
              fontSize: 40,
              fontWeight: 'bold',
              marginLeft: 30,
            }}>
            {title}
          </Text>
        </ImageBackground>
        <View style={{marginLeft: 30, marginRight: 30}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <AntDesign name="star" size={20} color="gold" />
            <Text style={{color: 'gold', marginLeft: 5}}>{rating}</Text>
          </View>
          <View>
            {/* <Text>{crewData.crew.map(item => item.name)}</Text> */}
          </View>
          <View>
            <Text
              numberOfLines={6}
              style={{color: '#787982', marginTop: 10, fontSize: 12}}>
              {details.overview}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#252632',
  },
});

export default Details;
