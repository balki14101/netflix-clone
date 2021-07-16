import React, {Component} from 'react';
import {Dimensions} from 'react-native';
import {ImageBackground} from 'react-native';
import {Text, StyleSheet, View, Button, TouchableOpacity} from 'react-native';
import {getImageUrl} from '../../Helpers/ImageHelpers';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const screenWidth = Dimensions.get('window').width;

export default class Header extends Component {
  render() {
    console.log('Heade++++++++++++++++++++r', this.props);
    return (
      <ImageBackground
        source={{uri: getImageUrl(this.props.data.data.poster_path)}}
        resizeMode="cover"
        style={{
          width: screenWidth,
          height: screenWidth * 1.1,
          justifyContent: 'flex-end',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <View style={{alignItems: 'center'}}>
            <MaterialIcons name="add" size={30} color="#fff" />
            <Text style={{color: '#fff'}}>My List</Text>
          </View>

          <View>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                backgroundColor: 'white',
                alignItems: 'center',
                padding: 8,
                //   borderRadius: 8,
              }}>
              <MaterialIcons name="play-arrow" size={20} />
              <Text style={{alignItems: 'center'}}>Play</Text>
            </TouchableOpacity>
          </View>
          <View>
            <MaterialIcons name="info-outline" size={30} color="#fff" />
            <Text style={{color: '#fff'}}>Info</Text>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({});
