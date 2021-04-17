import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, SectionList, FlatList } from 'react-native';

import Http from '../../libs/http';
import Color from '../../res/colors';

import CoinMarketItem from './coinMarketItem';

const urlSymbol = symbol => `https://c1.coinlore.com/img/25x25/${symbol}.png`;
const urlMarket = coinId => `https://api.coinlore.net/api/coin/markets/?id=${coinId}`;

const CoinDetailScreen = ({ route, navigation }) => {
  const [markets, setMarkets] = useState([]);
  const { coin } = route.params;
  navigation.setOptions({ title: coin.symbol })

  useEffect(() => {
    getMarkets(coin.id)
  }, [])

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

  return (
    <View style={styles.container}>
      <View style={styles.subHeader}>
        <Image
          style={styles.iconImg}
          source={{ uri: getSymbolIcon() }}
        />
        <Text style={styles.titleText}>{coin.name}</Text>
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
  subHeader: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
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
  }
})

export default CoinDetailScreen;