import React from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const Note = ({ item, onPress }) => {
  const { title, horaInicial, horaFinal } = item;
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
      <Text 
        style={styles.horas} 
        numberOfLines={3}>
        {horaInicial} - {horaFinal}
      </Text>
    </TouchableOpacity>
  );
};

const width = Dimensions.get('window').width - 40;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#6495ed',
    width: width / 1,
    padding: 8,
    borderRadius: 10,
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
  },
  horas: {
    fontSize: 16, 
    fontWeight: 'bold',
  }
});

export default Note;