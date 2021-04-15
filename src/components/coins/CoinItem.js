import React from 'react';
import { View, Text } from 'react-native';

const CoinItem = ({ name, symbol }) => (
  <View>
    <Text>{name}</Text>
    <Text>{symbol}</Text>
  </View>
)

export default CoinItem;