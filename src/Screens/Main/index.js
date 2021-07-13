import React from "react"
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import { colors } from '../../Styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TopRated from '../TopRated';
import List from '../List';
import { createStackNavigator } from "@react-navigation/stack";


const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => {
    return (
      <Stack.Navigator initialRouteName="Home" >
        <Stack.Screen
          name="Home"
          component={List}
          options={{
            title: 'List',
            headerTintColor: '#808080',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerStyle: {backgroundColor: '#000'},
          }}
        />
      </Stack.Navigator>
    );
  };

 const TopRatedStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="TopRated"
          component={TopRated}
          options={{
            title: 'TopRated Movies ',
            headerTintColor: '#808080',
            headerStyle: {
              backgroundColor: '#252632',
            },
          }}
        />
      </Stack.Navigator>
    );
  };


const Main = () => {
    return <Tab.Navigator
    activeColor={colors.white}
    inactiveColor={colors.tabBarInActive}
    barStyle={{backgroundColor: '#001'}}>
    <Tab.Screen
      name="Home"
      component={HomeStack}
      options={{
        title: ' Home',
        tabBarIcon: ({color}) => (
          <MaterialCommunityIcons name="home" color={color} size={20} />
        ),
      }}
    />
    <Tab.Screen
      name="TopRated"
      component={TopRatedStack}
      options={{
        tabBarIcon: ({color}) => (
          <MaterialCommunityIcons
            name="certificate"
            color={color}
            size={20}
          />
        ),
      }}
    />
  </Tab.Navigator>
}

export default Main