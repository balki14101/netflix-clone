// library imports
import React from 'react';
import {Text, View, FlatList, Image, ImageBackground} from 'react-native';

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

const Movies = ({data}) => {
  const backGroundImage = backdropPath + data.backdrop_path;
  const image = posterPath + data.poster_path;

  return (
    <View style={styles.container}>
      <ImageBackground source={{uri: backGroundImage}} style={styles.bgImage}>
        <View
          style={{
            backgroundColor: colors.bgBlack,
            height: 200,
            flexDirection: 'row',
          }}>
          <Image
            source={{uri: image}}
            style={{width: 100, height: 150, margin: 30}}
          />
          <View
            style={{
              marginTop: 30,
              // marginRight: 30,
              alignSelf: 'center',
            }}>
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 20,
                /**doubt right here
                 *title margin
                 *
                 *
                 *
                 */
                marginRight: 250,
              }}>
              {data.title}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <MaterialIcons name="star" size={30} color="gold" />
              <Text style={{color: '#fff', fontSize: 30}}>
                {data.vote_average}
              </Text>
            </View>
          </View>
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
