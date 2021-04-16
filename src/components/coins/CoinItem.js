import React from 'react';
import { View, Text, StyleSheet, Image, Platform, Pressable } from 'react-native';

import Color from '../../res/colors';

const CoinItem = ({ name, symbol, percent_change_1h, price_usd, onPress }) => {

  const getImageArrow = () => {
    if (percent_change_1h > 0) {
      return require('../../assets/arrow_up.png');
    }
    return require('../../assets/arrow_down.png');
  }

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.symbolText}>{symbol}</Text>
        <Text style={styles.nameText}>{name}</Text>
        <Text style={styles.namePrice}>{`$${price_usd}`}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.percentText}>{percent_change_1h}</Text>
        <Image
          style={styles.imageIcon}
          source={getImageArrow()}
        />
      </View>
    </Pressable>
  )
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderBottomColor: Color.zircon,
    borderBottomWidth: 1,
    marginLeft: Platform.OS == 'ios' ? 16 : 0,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  symbolText: {
    color: Color.white,
    fontWeight: "bold",
    fontSize: 16,
    marginRight: 12,
  },
  nameText: {
    color: Color.white, 
    fontSize: 14,
    marginRight: 16,
  },
  namePrice: {
    color: Color.white, 
    fontSize: 14,
  },
  percentText: {
    color: Color.white, 
    fontSize: 12,
    marginRight: 8,
  },
  imageIcon: {
    width: 22,
    height: 22,
  }
})

export default CoinItem;