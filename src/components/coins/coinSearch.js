import React, { useState } from 'react';
import { TextInput, View, Platform, StyleSheet } from 'react-native'

import Color from '../../res/colors';

const CoinSearch = ({ onChange }) => {
  const [query, setQuery] = useState('');

  const handlerText = (query) => {
    setQuery(query);

    if (onChange) {
      onChange(query);
    }
  }

  return (
    <View>
      <TextInput
        style={[
          styles.textInput,
          Platform.OS === 'ios' ? styles.textInputIOS : styles.textInputAndroid
        ]}
        onChangeText={handlerText}
        value={query}
        placeholder="Search coin"
        placeholderTextColor={Color.white}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 46,
    color: Color.white,
    backgroundColor: Color.charade,
    paddingLeft: 16,
  },
  textInputAndroid: {
    borderBottomWidth: 2,
    borderBottomColor: Color.zircon
  },
  textInputIOS: {
    margin: 8,
    borderRadius: 8
  }
})

export default CoinSearch;