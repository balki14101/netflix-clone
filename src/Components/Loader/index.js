// library imports
import React from 'react';
import {View, ActivityIndicator} from 'react-native';

// styles
import globalStyles, {colors, iconSize} from '../../Styles';

const Loader = props => {
  return (
    <View
      style={[globalStyles.screenCenter, {backgroundColor: colors.bgBlack}]}>
      <ActivityIndicator color={colors.red} size={iconSize.large} />
    </View>
  );
};
export default Loader;
