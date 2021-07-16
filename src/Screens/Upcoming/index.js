// library imports
import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import moment from 'moment';
import Carousel from 'react-native-snap-carousel';

// UI components
import Loader from '../../Components/Loader';
import {fetchUpcomingMovies} from '../../Reducers/Movie';

// redux
import {connect} from 'react-redux';

// styles
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// constants
import {url} from '../../Constants';
import styles from './Styles';

// utilities
import {screenWidth, screenHeight} from '../../Helpers/screenSize';

// destructuring
const {imagePathDetailsScreen} = url;

const Movies = ({data, onMoviePress, isActive}) => {
  const backGroundImage = imagePathDetailsScreen + data.backdrop_path;
  const {id} = data;
  const displayDate = moment(data.release_date).format(' MMMM Do YYYY');
  return (
    <TouchableOpacity onPress={() => onMoviePress(id)} style={styles.container}>
      <View style={{opacity: isActive ? 1 : 0.2}}>
        <Image source={{uri: backGroundImage}} style={styles.bgImage} />
        <View style={styles.mainView}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 8,
              maxHeight: 80,
            }}>
            <View style={{flex: 2}}>
              <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>
                {data.title}
              </Text>
              <Text style={{color: '#fff'}}>Coming on {displayDate}</Text>
            </View>
            <View style={{alignItems: 'center', flex: 1}}>
              <MaterialIcons name="notifications" size={20} color="#fff" />
              <Text style={{color: '#fff'}}>Remaind me</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <MaterialIcons name="info-outline" size={20} color="#fff" />
              <Text style={{color: '#fff'}}>Info</Text>
            </View>
          </View>
          <Text style={{color: '#fff'}} numberOfLines={3}>
            {data.overview}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

class Upcoming extends React.Component {
  state = {
    currentSlideIndex: 0,
  };

  componentDidMount = () => {
    // this.fetchTopRated();
    const {dispatch} = this.props;
    dispatch(fetchUpcomingMovies());
  };

  renderUpcoming = ({item, index}) => {
    const {currentSlideIndex} = this.state;
    const isActive = index === currentSlideIndex;
    return (
      <Movies
        data={item}
        onMoviePress={this.gotoMovieDetails}
        isActive={isActive}
      />
    );
  };

  gotoMovieDetails = MovieId => {
    this.props.navigation.navigate('Details', {MovieId});
  };

  render() {
    const {currentSlideIndex} = this.state;
    const {upcomingMovies} = this.props;
    if (!upcomingMovies) {
      return <Loader />;
    }
    return (
      <Carousel
        vertical={true}
        data={upcomingMovies}
        renderItem={this.renderUpcoming}
        onSnapToItem={slideIndex =>
          this.setState({currentSlideIndex: slideIndex})
        }
        sliderWidth={screenWidth}
        itemWidth={screenWidth}
        itemHeight={screenHeight / 2.4}
        sliderHeight={screenHeight / 2.4}
        inactiveSlideScale={1}
        extraData={{currentSlideIndex}}
      />
    );
  }
}

export default connect(
  (state, props) => {
    return {
      upcomingMovies: state.movie.upcomingMovies,
    };
  },
  dispatch => {
    return {
      dispatch,
    };
  },
)(Upcoming);

// export default  Upcoming;
