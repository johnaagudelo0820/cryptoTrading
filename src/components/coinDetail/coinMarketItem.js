import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import Color from '../../res/colors';

const CoinMarketItem = ({ name, price_usd }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.nameText}>{name}</Text>
      <Text style={styles.priceText}>{price_usd}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderColor: Color.zircon,
    borderWidth: 1,
    padding: 16,
    margin: 8,
    alignItems: 'center',
  },
  nameText: {
    color: Color.white,
    fontWeight: 'bold'
  },
  priceText: {
    color: Color.white,
  }
})

export default CoinMarketItem;