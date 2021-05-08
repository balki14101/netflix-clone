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

const {imagePathDetailsScreen} = url;

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

// const Crew = props => {
//   const data = props.data;
//   const image = BACKDROP_URL + data.profile_path;

//   return (
//     <View
//       style={{
//         backgroundColor: '#edebeb',
//         borderRadius: 8,
//         margin: 5,
//       }}>
//       <View
//         style={{
//           margin: 5,
//           alignItems: 'center',
//         }}>
//         <Image
//           source={{uri: image}}
//           style={{height: 150, width: 100, borderRadius: 8}}
//         />
//         <Text style={{color: '#000'}}>{data.name}</Text>
//         <Text style={{color: '#000'}}>{data.department}</Text>
//         <Text style={{color: '#000'}}>{data.job}</Text>
//       </View>
//     </View>
//   );
// };

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
      fetch(
        `https://api.themoviedb.org/3/movie/${this.MovieId}/similar?api_key=628f811dd14b86f8fea17c431c364235&language=en-US&page=1`,
      )
        .then(response => response.json())
        .then(json => {
          // console.log({response: json});

          this.setState({similarData: json});
        });
    }
  };

  renderSimilarMovies = (item, index) => {
    return <Movies name={item} key={index} />;
  };

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
    // console.log('this is details', this.state.details);
    const details = this.state.details;
    const crewData = this.state.crewData;
    const similarData = this.state.similarData;

    const backdrop = details
      ? imagePathDetailsScreen + details.backdrop_path
      : '---';
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
          <View>
            <Text style={styles.header}>Crew</Text>
            <ScrollView horizontal={true}>
              {/* <Text>{crewData.crew.map(this.renderCrewDetails)}</Text> */}
            </ScrollView>
          </View>
          <View style={styles.top20}>
            <Text style={styles.header}>Similar Movies</Text>
            <ScrollView horizontal style={styles.top20}>
              <Text>{similarData.results.map(this.renderSimilarMovies)}</Text>
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default Details;
