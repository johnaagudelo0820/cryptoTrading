import React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import CoinsStack from './src/components/coins/CoinsStack';
import FavoriteStack from './src/components/favorites/FavoriteStack';

import Color from './src/res/colors';

const Tabs = createBottomTabNavigator();

const tabBarOptions = {
  tintColor: "#fefefe",
  style: {
    backgroundColor: Color.blackPearl,
  }
};

console.log(tabBarOptions.tintColor);

const App = () => {
  return (
    <NavigationContainer>
      <Tabs.Navigator
        tabBarOptions={tabBarOptions}
      >
          <Tabs.Screen
            name="Coins"
            component={CoinsStack}
            options={{
              tabBarIcon: ({ size, color }) => (
                <Image
                  style={{ tintColor: color, width: size, height: size }}
                  source={require('./src/assets/bank.png')}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="Favorite"
            component={FavoriteStack}
            options={{
              tabBarIcon: ({ size, color }) => (
                <Image
                  style={{ tintColor: color, width: size, height: size }}
                  source={require('./src/assets/star.png')}
                />
              ),
            }}
          />
      </Tabs.Navigator>
    </NavigationContainer>
  );
};

export default App;
