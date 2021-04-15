import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import CoinsScreen from './CoinsScreen';
import CoinDetailScreen from './CoinDetailScreen';

const Stack = createStackNavigator();

const CoinsStack = () => {
  return (
    <Stack.Navigator initialRouteName="Coins">
      <Stack.Screen name="Coins" component={CoinsScreen} options={{ title: 'Home' }}/>
      <Stack.Screen name="CoinDetail" component={CoinDetailScreen} />
    </Stack.Navigator>
  );
}

export default CoinsStack;