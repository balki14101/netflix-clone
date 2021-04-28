import React from 'react';
import {ImageBackground} from 'react-native';
import {
  StyleSheet,
  View,
  Image,
  Text,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';

const BACKDROP_URL = 'https://www.themoviedb.org/t/p/original';

const Movies = props => {
  const data = props.name;
  return (
    <View style={{alignItems: 'center'}}>
      <View style={{marginLeft: 10}}>
        <Image
          source={{uri: BACKDROP_URL + data.poster_path}}
          style={{height: 150, width: 100, borderRadius: 8}}
        />
      </View>
      <View>
        <Text style={{color: '#fff', marginLeft: 10}}>{data.title}</Text>
      </View>
    </View>
  );
};

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: null,
      crewData: null,
      similarData: null,
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
      fetch(
        `https://api.themoviedb.org/3/movie/${this.MovieId}/similar?api_key=628f811dd14b86f8fea17c431c364235&language=en-US&page=1`,
      )
        .then(response => response.json())
        .then(json => {
          console.log({response: json});

          this.setState({similarData: json});
        });
    }
  };

  renderSimilarMovies = item => {
    return <Movies name={item} />;
  };

  render() {
    console.log('this is details', this.state.details);
    const details = this.state.details;
    const crewData = this.state.crewData;
    const similarData = this.state.similarData;

    const backdrop = details ? BACKDROP_URL + details.backdrop_path : '---';
    const title = details ? details.original_title : '---';
    const rating = details ? details.vote_average : '----';
    // const name = similarData ? similarData.title : '---;';

    if (details == null || crewData == null || similarData == null) {
      return (
        <View style={{flex: 1}}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <ScrollView style={styles.container}>
        <ImageBackground
          source={{uri: backdrop}}
          style={{height: 200, justifyContent: 'flex-end'}}>
          <Text
            style={{
              color: '#fff',
              fontSize: 40,
              fontWeight: 'bold',
              marginLeft: 20,
            }}>
            {title}
          </Text>
        </ImageBackground>
        <View style={{marginLeft: 20, marginRight: 20}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <AntDesign name="star" size={20} color="gold" />
            <Text style={{color: 'gold', marginLeft: 5}}>{rating}</Text>
          </View>
          <View>
            {/* <Text>{crewData.crew.map(item => item.name)}</Text> */}
            <Text style={{color: '#fff', marginTop: 5}}>
              {details.genres.map(item => item.name).join('*')}
            </Text>
          </View>
          <View>
            <Text
              numberOfLines={6}
              style={{
                color: '#787982',
                marginTop: 10,
                fontSize: 12,
                lineHeight: 20,
              }}>
              {details.overview}
            </Text>
          </View>
          <View style={{marginTop: 20}}>
            <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>
              Similar Movies
            </Text>
            <ScrollView horizontal style={{marginTop: 20}}>
              <Text>{similarData.results.map(this.renderSimilarMovies)}</Text>
            </ScrollView>
          </View>
        </View>
      </ScrollView>
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
