import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import CoinsScreen from './CoinsScreen';
import CoinDetailScreen from '../coinDetail/CoinDetailScreen';
import Color from '../../res/colors';

const Stack = createStackNavigator();

const CoinsStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Coins"
      screenOptions={{
        headerStyle: {
          backgroundColor: Color.blackPearl,
          shadowColor: Color.blackPearl,
        },
        headerTintColor: Color.white,
      }}
    >
      <Stack.Screen name="Coins" component={CoinsScreen} options={{ title: 'Home' }}/>
      <Stack.Screen name="CoinDetail" component={CoinDetailScreen} />
    </Stack.Navigator>
  );
}

export default CoinsStack;