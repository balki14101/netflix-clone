import React from 'react';
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import Loader from '../../../Components/Loader';
import {url} from '../../../Constants/index';
import {colors} from '../../../Styles/index';

import AntDesign from 'react-native-vector-icons/AntDesign';

import styles from './Styles';

const {imagePathDetailsScreen} = url;

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

class TopRatedMovieDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: null,
      crewData: null,
      // similarData: null,
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
          // console.log({Response: json});
          this.setState({details: json});
        });
      fetch(
        `https://api.themoviedb.org/3/movie/${this.MovieId}/credits?api_key=628f811dd14b86f8fea17c431c364235&language=en-US`,
      )
        .then(response => response.json())
        .then(json => {
          // console.log({Response: json});

          this.setState({crewData: json});
        });
    }
  };

  renderCastDetails = (item, index) => {
    return <Cast data={item} onCastPress={this.gotoCast} key={index} />;
  };
  render() {
    const details = this.state.details;
    const crewData = this.state.crewData;
    const backdrop = details
      ? imagePathDetailsScreen + details.backdrop_path
      : '---';

    if (details == null || crewData == null) {
      return <Loader />;
    }
    return (
      <ScrollView style={styles.container}>
        <ImageBackground
          source={{uri: backdrop}}
          style={styles.imageBackGround}>
          <View style={styles.titleView}>
            <Text style={styles.title}>{details.title}</Text>
          </View>
        </ImageBackground>
        <View style={styles.view}>
          <View style={styles.ratingView}>
            <AntDesign name="star" size={20} color={colors.gold} />
            <Text style={styles.rating}>{details.rating}</Text>
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
        </View>
        <View style={styles.top10}>
          <Text style={styles.header}>Cast</Text>
          <ScrollView horizontal={true}>
            <Text style={styles.top10}>
              {crewData.cast.map(this.renderCastDetails)}
            </Text>
          </ScrollView>
        </View>
      </ScrollView>
    );
  }
}

export default TopRatedMovieDetails;
