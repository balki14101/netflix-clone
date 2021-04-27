import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';

const BACKDROP_URL = 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2';

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: null,
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
    }
  };
  render() {
    console.log('this is details', this.state.details);

    const details = this.state.details;

    const backdrop = details ? BACKDROP_URL + details.poster_path : '---';
    const title = details ? details.original_title : '---';

    return (
      <View style={styles.container}>
        <View>
          <Image source={{uri: backdrop}} style={{height: 110, width: 50}} />
          <Text style={{color: '#000'}}>shfgsyufagidfkfdhv</Text>
          <Text style={{color: '#000'}}>{title}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Details;
