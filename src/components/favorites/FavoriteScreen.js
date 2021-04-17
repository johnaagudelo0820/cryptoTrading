import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native'

import FavoriteEmpty from './FavoriteEmpty';
import CoinsItem from '../coins/CoinItem';

import Color from '../../res/colors';
import Storage from '../../libs/storage';

const FavoriteScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    getFavorites();

    navigation.addListener('focus', getFavorites);

    return () => {
      navigation.removeListener('focus', getFavorites);
    }
  }, []);

  const handlerPress = (coin) => {
    navigation.navigate('CoinDetail', { coin });
  }

  const getFavorites = async () => {
    try {
      const allKeys = await Storage.instance.getAllKeys();
      const keys = allKeys.filter((key) => key.includes('favorite-'));
      const favs = await Storage.instance.multiGet(keys);
      const favorites = favs.map((fav) => JSON.parse(fav[1]));

      setFavorites(favorites);
    } catch (err) {
      console.log('Error get all favorites', err);
    }
  }
  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <FavoriteEmpty />
      ): null }
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          renderItem={({ item }) => (
            <CoinsItem
              {...item}
              onPress={() => handlerPress(item)}
            />
          )}
          
        />
      ) : null}
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