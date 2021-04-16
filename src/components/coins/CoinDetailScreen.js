import React from 'react';
import { View, Text } from 'react-native';

const CoinDetailScreen = ({ route }) => {
  const { coin } = route.params;
  return (
    <View>
      <Text>{coin.name}</Text>
    </View>
  );
}

export default CoinDetailScreen;