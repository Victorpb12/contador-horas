import React from 'react';
import colors from '../misc/colors'

import { AntDesign } from '@expo/vector-icons';
import { View, StyleSheet, TextInput } from 'react-native';

const SearchBar = ({containerStyle, value, onChangeText, onClear}) => {
  return (
    <View style={[styles.container, {...containerStyle}]} >
      <TextInput 
        value={value}
        onChangeText={onChangeText}
        style={styles.searchBar} 
        placeholder='Pesquisar...'
      />
      {value ? 
        <AntDesign 
          name='close' 
          size={20} 
          color={colors.primary}
          onPress={onClear}
          style={styles.clearIcon}
        /> 
      : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  searchBar: {
    borderWidth: 0.5,
    borderColor: colors.primary,
    height: 40,
    borderRadius: 40,
    paddingLeft: 15,
    fontSize: 20,
  },
  clearIcon: {
    position: 'absolute',
    right: 10
  },
});

export default SearchBar;