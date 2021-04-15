import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';

import CoinItem from './CoinItem';
import Http from '../../libs/http';

const API_COINS =  'https://api.coinlore.net/api/tickers/';

const CoinsScreen = (props) => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

/*   const handlerPress = () => {
    console.log('go to detail', props);
    props.navigation.navigate('CoinDetail');
  } */

  useEffect(() => {
    const fetchCoins = async () => {
      const coins = await Http.instance.get(API_COINS);
      setCoins(coins.data);
      setLoading(false)
    };
    fetchCoins();
  }, []);

  console.log(coins);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator
          color="#fff"
          size="large"
          styles={styles.loading}
        />
      ) : (
        <FlatList
          data={coins}
          renderItem={({ item }) => (
            <CoinItem {...item} />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  titleText: {
    color: 'white',
    textAlign: 'center',
  },
  btn: {
    padding: 8,
    backgroundColor: 'blue',
    borderRadius: 8,
    margin: 16,
  },
  btnText: {
    color: 'white',
    textAlign: 'center'
  },
  loader: {
    marginTop: 60,
  }
});

export default CoinsScreen;