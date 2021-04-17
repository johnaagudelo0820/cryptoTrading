import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Color from '../../res/colors';

const FavoriteEmpty = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Don't have any favorite jet</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Color.white,
    fontWeight: 'bold',
    fontSize: 18,
    alignSelf: 'center'
  }
})

export default FavoriteEmpty;