import React, { useEffect, useState } from 'react';
import {
  View, Text, Image, StyleSheet, Alert,
  SectionList, FlatList, Pressable,
} from 'react-native';

import Http from '../../libs/http';
import Color from '../../res/colors';
import Storage from '../../libs/storage';

import CoinMarketItem from './coinMarketItem';

const urlSymbol = symbol => `https://c1.coinlore.com/img/25x25/${symbol}.png`;
const urlMarket = coinId => `https://api.coinlore.net/api/coin/markets/?id=${coinId}`;
const getKeyFavorite = key => `favorite-${key}`;

const CoinDetailScreen = ({ route, navigation }) => {
  const [markets, setMarkets] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const { coin } = route.params;
  navigation.setOptions({ title: coin.symbol })

  useEffect(() => {
    getMarkets(coin.id);
    getFavorite();
  }, [])

  const getFavorite = async () => {
    try {
      const key = getKeyFavorite(coin.id)
      const existFavorite = await Storage.instance.get(key);

      if (existFavorite) {
        setIsFavorite(true)
      }
    } catch (err) {
      console.log('Error get favorite', err);
    }
  }

  const getSymbolIcon = () => {
    const { name } = coin;
    if (name) {
      const symbol = name.toLowerCase().replace(' ', '-');
      return urlSymbol(symbol);
    }
  }

  const getSection = () => {
    const sections = [
      {
        title: 'Market cap',
        data: [coin.market_cap_usd]
      },
      {
        title: 'Volume 24h',
        data: [coin.volume24]
      },
      {
        title: 'Change 24h',
        data: [coin.percent_change_24h]
      }
    ];
    return sections;
  }

  const getMarkets = async (coinId) => {
    const url = urlMarket(coinId);
    const markets = await Http.instance.get(url);
    setMarkets(markets);
  }

  const handlerToggleFavorite = () => {
    if (isFavorite) {
      removeFavorite();
      return;
    }
    addFavorite();
  }

  const removeFavorite = () => {
    Alert.alert('Remove Favorite', 'Are you sure', [
      {
        text: 'Cancel',
        onPress: () => {},
      },
      {
        text: 'Remove',
        onPress: async () => {
          const key = getKeyFavorite(coin.id);

          const coinRemoved = await Storage.instance.remove(key);

          if (coinRemoved) {
            setIsFavorite(false);
          }
        },
        style: 'destructive',
      }
    ])
  }

  const addFavorite = async () => {
    const coinStr = JSON.stringify(coin);
    const key = getKeyFavorite(coin.id);;
    const stored = await Storage.instance.store(key, coinStr);

    if (stored) {
      setIsFavorite(true);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.subHeader}>
        <View styles={styles.row}>
          <Image
            style={styles.iconImg}
            source={{ uri: getSymbolIcon() }}
          />
          <Text style={styles.titleText}>{coin.name}</Text>
        </View>

        <Pressable
          onPress={handlerToggleFavorite}
          style={[
            styles.btnFavorite,
            isFavorite ? styles.btnFavoriteRemove : styles.btnFavoriteAdd,
          ]}
        >
          <Text style={styles.btnFavoriteText}>
            {isFavorite ? 'Remove Favorite' : 'Add Favorite'}
          </Text>
        </Pressable>
      </View>

      <SectionList
        style={styles.section}
        sections={getSection()}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.sectionItem}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        )}
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionText}>{section.title}</Text>
          </View>
        )}
      />

      <Text style={styles.marketTitle}>Markets</Text>

      <FlatList
        style={styles.list}
        data={markets}
        horizontal={true}
        renderItem={({ item }) => (
          <CoinMarketItem {...item} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.charade,
    flex: 1,
  },
  row: {
    flexDirection: "row",
  },
  subHeader: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Color.white,
    marginLeft: 8,
  },
  iconImg: {
    width: 26,
    height: 26,
  },
  section: {
    maxHeight: 220,
  },
  sectionHeader: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 8,
  },
  sectionItem: {
    padding: 8,
  },
  itemText: {
    color: '#fff',
    fontSize: 14
  },
  sectionText: {
    color: Color.white,
    fontWeight: 'bold',
    fontSize: 14,
  },
  list: {
    maxHeight: 100,
  },
  marketTitle: {
    color: Color.white,
    fontSize: 18,
    marginBottom: 8,
    marginLeft: 8,
    fontWeight: 'bold',
  },
  btnFavorite: {
    padding: 8,
    borderRadius: 8,
  },
  btnFavoriteText: {
    color: Color.white,
  },
  btnFavoriteAdd: {
    backgroundColor: Color.picton,
  },
  btnFavoriteRemove: {
    backgroundColor: Color.camine,
  }
})

export default CoinDetailScreen;