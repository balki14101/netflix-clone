import React from 'react';
import {FlatList} from 'react-native';
import {View, Text} from 'react-native';
import Loader from '../../Components/Loader';
import FirebaseApiClient from '../../FirebaseApiClient';
import Header from './Header';
import HorizontalList from './HorizontalList';
class Feeds extends React.Component {
  state = {
    feeds: null,
  };

  componentDidMount = async () => {
    try {
      const res = await FirebaseApiClient(
        'p%2Fnetflix%2Fapi%2Ffeed%2F1.json?alt=media',
      );
      this.setState({feeds: res.results});
    } catch (e) {
      console.log({e});
    }
  };

  gotoMovieDetails = MovieId =>
    this.props.navigation.navigate('Details', {MovieId});

  gotoTvDetails = TvId => this.props.navigation.navigate('TvDetails', {TvId});

  renderItem = ({item}) => {
    if (item.type === 'header') {
      return <Header data={item} />;
    } else if (item.type === 'horizontal_list') {
      return (
        <HorizontalList
          data={item}
          gotoMovieDetails={this.gotoMovieDetails}
          gotoTvDetails={this.gotoTvDetails}
        />
      );
    }
    return null;
  };

  render() {
    const feed = this.state.feeds;

    if (!feed) {
      return <Loader prop1={'test1'} />;
    }

    return (
      <FlatList
        data={this.state.feeds}
        renderItem={this.renderItem}
        keyExtractor={(item, index) => String(index)}
      />
    );
  }
}

export default Feeds;
