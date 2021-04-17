import React from 'react';
import { View, StyleSheet} from 'react-native'

import FavoriteEmpty from './FavoriteEmpty';

import Color from '../../res/colors';

const FavoriteScreen = () => {
  return (
    <View style={styles.container}>
      <FavoriteEmpty />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.charade,
    flex: 1,
  }
})

export default FavoriteScreen;