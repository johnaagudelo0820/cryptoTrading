import React from 'react';
import { View, Text, Image, StyleSheet, SectionList } from 'react-native';

import Color from '../../res/colors';

const CoinDetailScreen = ({ route, navigation }) => {
  const { coin } = route.params;
  navigation.setOptions({ title: coin.symbol })

  const getSymbolIcon = () => {
    const { name } = coin;
    if (name) {
      const symbol = name.toLowerCase().replace(' ', '-');
      return `https://c1.coinlore.com/img/25x25/${symbol}.png`;
    }
  }

  const getSection = () => {
    console.log(coin);
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
  }
})

export default CoinDetailScreen;