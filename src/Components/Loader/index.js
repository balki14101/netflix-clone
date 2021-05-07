// library imports
import React from 'react';
import {View, ActivityIndicator} from 'react-native';

// styles
import globalStyles, {colors, iconSize} from '../../Styles';

const Loader = () => (
  <View style={globalStyles.screenCenter}>
    <ActivityIndicator color={colors.blue} size={iconSize.large} />
  </View>
);
export default Loader;
