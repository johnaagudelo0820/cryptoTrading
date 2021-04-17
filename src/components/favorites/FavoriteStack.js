import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import FavoriteScreen from './FavoriteScreen';

const Stack = createStackNavigator();
import Color from '../../res/colors';

const FavoriteStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Color.blackPearl,
          shadowColor: Color.blackPearl,
        },
        headerTintColor: Color.white,
      }}
    >
      <Stack.Screen
        name="Favorite"
        component={FavoriteScreen}
      />
    </Stack.Navigator>
  )
};

export default FavoriteStack;