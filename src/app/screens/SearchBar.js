import React from 'react';
import colors from '../misc/colors'
import { View, StyleSheet, TextInput } from 'react-native';

const SearchBar = ({containerStyle}) => {
  return (
    <View style={[styles.container, {...containerStyle}]} >
      <TextInput style={styles.searchBar} placeholder='Pesquisar...'/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  searchBar: {
    borderWidth: 0.5,
    borderColor: colors.primary,
    height: 40,
    borderRadius: 40,
    paddingLeft: 15,
    fontSize: 20,
  }
});

export default SearchBar;