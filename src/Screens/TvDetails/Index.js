import React, {Component} from 'react';
import {Text, Pressable, Modal, View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Loader from '../../Components/Loader';
import {fetchTvShowDetails} from '../../Reducers/TvShow';
import {url} from '../../Constants';
import {Image} from 'react-native';
import {screenHeight, screenWidth} from '../../Helpers/screenSize';
import {Picker} from '@react-native-picker/picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../Styles/index';
import moment from 'moment';
import ViewMoreText from 'react-native-view-more-text';
import {TouchableOpacity} from 'react-native';

const imagePathDetailsScreen = url.imagePathDetailsScreen;

export class TvDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {modalVisible: false, selectedSeasonIndex: 0};

    this.TvId = props.route.params.TvId;
  }

  updatePicker = (value, index) => {
    this.setState({selectedSeason: value});
  };
  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };

  renderViewMore(onPress) {
    return <Text onPress={onPress} />;
  }
  renderViewLess(onPress) {
    return <Text onPress={onPress} />;
  }

  componentDidMount = () => {
    const {dispatch, details} = this.props;

    if (this.TvId != null) {
      if (!details) {
        dispatch(fetchTvShowDetails({tvId: this.TvId}));
      }
    }
  };
  renderCloseButton = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.setModalVisible(!this.state.modalVisible);
        }}
        style={{
          backgroundColor: colors.white,
          height: 50,
          width: 50,
          borderRadius: 50 / 2,
          marginVertical: 16,
        }}>
        <View
          style={{
            alignItems: 'center',
          }}>
          <MaterialIcons name="close" color="black" size={45} />
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const {details} = this.props;
    if (!details) {
      return <Loader />;
    }
    const seasons = details.seasons.map(i => i.name);
    const image = imagePathDetailsScreen + details.backdrop_path;
    const year = moment(details.first_air_date).format('YYYY');

    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            // Alert.alert('Modal has been closed.');
            this.setModalVisible(!modalVisible);
          }}>
          <View style={styles.modalCenteredView}>
            <View style={styles.modalView}>
              {this.props.details?.seasons.map((season, currentIndex) => {
                const isSelected =
                  currentIndex === this.state.selectedSeasonIndex;
                return (
                  <Text
                    onPress={() => {
                      this.setState({selectedSeasonIndex: currentIndex});
                    }}
                    key={season.id}
                    style={
                      isSelected ? styles.selectedSeasonText : styles.textStyle
                    }>
                    {season.name}
                  </Text>
                );
              })}
              <View>{this.renderCloseButton()}</View>
            </View>
          </View>
        </Modal>

        <Image
          source={{uri: image}}
          style={{height: 200, width: screenWidth}}
        />
        <View style={{padding: 16}}>
          <Text
            style={{
              color: '#fff',
              fontWeight: 'bold',
              fontSize: 30,
              justifyContent: 'center',
            }}>
            {details.name}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{color: '#fff', marginRight: 8}}>{year}</Text>
            <Text
              style={{
                backgroundColor: '#808080',
                paddingHorizontal: 2,
                fontSize: 10,
                fontWeight: 'bold',
                textAlignVertical: 'center',
                marginVertical: 4,
                letterSpacing: 1,
                marginRight: 8,
              }}>
              HD
            </Text>
            <MaterialIcons
              name="star"
              size={15}
              color="#808080"
              style={{marginRight: 8}}
            />
            <Text style={{color: '#fff'}}>{details.vote_average}</Text>
          </View>
          <ViewMoreText
            numberOfLines={4}
            renderViewMore={this.renderViewMore}
            renderViewLess={this.renderViewLess}>
            <Text style={{color: colors.textPrimary}}>{details.overview}</Text>T
          </ViewMoreText>

          {/* Picker */}
          <View
            style={{
              backgroundColor: '#808080',
              borderRadius: 10,
              width: '50%',
            }}
          />
          <View>
            <Pressable
              style={styles.buttonOpen}
              onPress={() => this.setModalVisible(true)}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={[styles.textStyle]}>
                  {/* {'sample output'} */}
                  {console.log(this.props)}
                  {
                    this.props.details.seasons[this.state.selectedSeasonIndex]
                      .name
                  }
                </Text>
                <MaterialIcons name="arrow-drop-down" color="#fff" size={24} />
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // marginTop: 22,
  },

  modalCenteredView: {
    flex: 1,

    // marginTop: 22,
  },
  modalView: {
    flex: 1,
    backgroundColor: colors.backgroundAlpha,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    // elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#808080',
    height: screenHeight / 18,
    width: screenWidth / 2.5,
    borderRadius: 6,
    justifyContent: 'center',

    paddingHorizontal: 8,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: colors.textPrimary,
    fontWeight: 'bold',
    // paddingVertical: 16,
    fontSize: 16,
  },
  selectedSeasonText: {
    color: colors.textPrimary,
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    paddingVertical: 16,
    fontSize: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default connect(
  (state, props) => {
    const id = props.route.params.TvId;
    return {
      detailsLoading: state.tv.detailsLoading[id],
      details: state.tv.details[id],
    };
  },
  dispatch => {
    return {
      dispatch,
    };
  },
)(TvDetails);
