import React from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const Note = ({ item, onPress }) => {
  const { title, horaInicial } = item;
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
      <Text numberOfLines={3}>{horaInicial}</Text>
    </TouchableOpacity>
  );
};

const width = Dimensions.get('window').width - 40;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#6495ed',
    width: width / 2 - 10,
    padding: 8,
    borderRadius: 10,
    justifyContent: 'space-between'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
  },
});

export default Note;