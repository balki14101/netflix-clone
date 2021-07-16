//Library
import React, {Component} from 'react';
import {Image, TouchableOpacity, FlatList, Text, View} from 'react-native';
//imageURL
import {getImageUrl} from '../../Helpers/ImageHelpers';

export class HorizontalList extends Component {
  renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (item.media_type === 'movie') {
            this.props.gotoMovieDetails(item.id);
          } else if (item.media_type === 'tv') {
            this.props.gotoTvDetails(item.id);
          }
        }}>
        <Image
          style={{width: 100, height: 150}}
          source={{uri: getImageUrl(item.poster_path)}}
        />
      </TouchableOpacity>
    );
  };

  render() {
    const {title, data} = this.props.data;
    return (
      <View>
        <Text style={{color: '#fff'}}> {title}</Text>
        <FlatList horizontal={true} data={data} renderItem={this.renderItem} />
      </View>
    );
  }
}

export default HorizontalList;
