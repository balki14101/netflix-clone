

// stack
// // Main - Tab navigator
    // // HomeStack 
        // // List
    // // TopRatedStack
        // // TopRated
// // Details
// // Cast
import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import Main from "./Screens/Main";
import Details from "./Screens/Details";
import Cast from "./Screens/Cast";

const Stack = createStackNavigator();

const Navigator = () => {
   return  <Stack.Navigator initialRouteName="Main">
    <Stack.Screen
      name="Main"
      component={Main}
      options={{
          headerShown: false
      }}
    />

    <Stack.Screen
      name="Details"
      component={Details}
      options={{
        title: ' ',
        headerTintColor: '#808080',
        headerStyle: {
          backgroundColor: '#252632',
        },
      }}
    />
    <Stack.Screen
      name="Cast"
      component={Cast}
      options={{
        headerTintColor: '#808080',
        headerStyle: {
          backgroundColor: '#252632',
        },
      }}
    />
  </Stack.Navigator>
}

export default Navigator;