import React from 'react';

import {View, Text, Image, ScrollView} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

import Viewmoretext from 'react-native-view-more-text';
import Loader from '../../Components/Loader';
import {url} from '../../Constants/index';
import styles from './Styles';

const {posterPath} = url;

class Cast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cast: null,
    };
    this.CastId = props.route.params.castId;
  }

  componentDidMount = () => {
    fetch(
      `https://api.themoviedb.org/3/person/${this.CastId}?api_key=628f811dd14b86f8fea17c431c364235&language=en-US`,
    )
      .then(response => response.json())
      .then(json => this.setState({cast: json}));
  };

  renderViewMore = press => {
    <Text style={{color: 'blue', fontSize: 20}} onPress={press}>
      View More
    </Text>;
  };
  renderViewLess = press => {
    <Text style={{color: 'blue', fontSize: 20}} onPress={press}>
      Less
    </Text>;
  };

  render() {
    const cast = this.state.cast;
    const poster = cast ? posterPath + cast.profile_path : '---';

    if (cast == null) {
      return <Loader />;
    }

    return (
      <ScrollView style={styles.container}>
        <View style={styles.marginLeft}>
          <View style={styles.alignItems}>
            <Image source={{uri: poster}} style={{height: 300, width: 200}} />
          </View>

          <Text style={styles.info}>Personal Info</Text>
          <View>
            <Text style={styles.headerText}>Name</Text>
            <Text style={styles.text}>{cast.name}</Text>
          </View>
          <View>
            <Text style={styles.headerText}>Knowing For</Text>
            <Text style={styles.text}>{cast.known_for_department}</Text>
          </View>
          <View>
            <Text style={styles.headerText}>Biography</Text>
            <Viewmoretext
              numberOfLines={5}
              renderViewMore={this.renderViewMore}
              renderViewLess={this.renderViewLess}>
              <Text style={styles.text}>{cast.biography}</Text>
            </Viewmoretext>
          </View>
          <View>
            <Text style={styles.headerText}>Birthday</Text>
            <Text style={styles.text}>{cast.birthday}</Text>
          </View>
          <View>
            <Text style={styles.headerText}>Place Of Birth</Text>
            <Text style={styles.text}>{cast.place_of_birth}</Text>
          </View>
          <View>
            <Text style={styles.headerText}>Also Known As</Text>
            <Text style={styles.text}>{cast.also_known_as[0]}</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}
export default Cast;
