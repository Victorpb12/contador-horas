import React, { useState } from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  StatusBar, 
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from 'react-native';
import { format, parse, differenceInMinutes } from 'date-fns';

import color from '../misc/colors'
import SearchBar from '../components/SearchBar'
import RoundIconBtn from '../components/RoundIconBtn'
import NoteInputModal from '../components/NoteInputModal'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Note from '../components/Note'
import { useNotes } from '../contexts/NoteProvider'
import NotFound from '../components/NotFound'

// Função para retornar os dados pelo último cadastrado
const reverseData = data => {
  return data.sort((a, b) => {
    const aInt = parseInt(a.time);
    const bInt = parseInt(b.time);
    if (aInt < bInt) return 1;
    if (aInt == bInt) return 0;
    if (aInt > bInt) return -1;
  })
};

const NoteScreen = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [resultNotFound, setResultNotFound] = useState(false);

  const {notes, setNotes, findNotes} = useNotes();

  const reverseNotes = reverseData(notes);

  const differenceHours = (horaInicial, horaFinal) => {
    const formatHour = 'HH:mm';
    const dataBase = new Date();
  
    if (!horaInicial || !horaFinal) {
      return ''; // Tratar caso as horas sejam inválidas
    }
  
    const dataInicial = parse(horaInicial, formatHour, dataBase);
    const dataFinal = parse(horaFinal, formatHour, dataBase);
  
    if (isNaN(dataInicial) || isNaN(dataFinal)) {
      return ''; // Tratar caso o parse das horas falhe
    }
  
    const difference = differenceInMinutes(dataFinal, dataInicial);
    const formatDifference = format(new Date(0, 0, 0, 0, difference), formatHour);
  
    return formatDifference;
  };
  
  const handleOnSubmit = async (title, horaInicial, horaFinal) => {
    const difference = differenceHours(horaInicial, horaFinal);
  
    const note = {
      id: Date.now(),
      title,
      horaInicial,
      horaFinal,
      difference,
      time: Date.now(),
    };
  
    const result = await AsyncStorage.getItem('notes');
    let notes = [];
  
    if (result !== null) {
      notes = JSON.parse(result);
    }
  
    const updatedNotes = [...notes, note];
    setNotes(updatedNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
  };
  

  const openNote = (note) => {
    navigation.navigate('NoteDetail', { note })
  }

  const handleOnSearchInput = async (text) => {
    setSearchQuery(text);
    if (!text.trim()) {
      setSearchQuery('');
      setResultNotFound(false);
      return await findNotes();
    }
    const filteredNotes = notes.filter(note => {
      if (note.title.toLowerCase().includes(text.toLowerCase())) {
        return note;
      }
    })

    if (filteredNotes.length) {
      setNotes([...filteredNotes]);
    } else {
      setResultNotFound(true);
    }
  }

  const handleOnClear = async () => {
    setSearchQuery('');
    setResultNotFound(false);

    await findNotes();
  }

  return (
    <>
      <StatusBar barStyle='dark-content' backgroundColor={color.light}/>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text 
            style={styles.header}
          >Horas trabalhadas
          </Text>
          {notes.length ? 
          <SearchBar 
            value={searchQuery}
            onChangeText={handleOnSearchInput}
            containerStyle={{marginVertical: 15}}
            onClear={handleOnClear}
          />
          : null } 
          {resultNotFound ? <NotFound /> :
          <FlatList
            data={reverseNotes}
            numColumns={1}  
            keyExtractor={item => item.id.toString()} 
            renderItem={({ item }) => (
              <Note 
                item={item}
                onPress={() => openNote(item)}
              />
            )}
          />}
          {!notes.length ? 
            <View 
              style={[StyleSheet.absoluteFillObject, styles.emptyHeaderContainer]}
            >
              <Text 
                style={styles.emptyHeader}>Adicione algumas notas
              </Text>
            </View> 
          : null}
        </View>   
      </TouchableWithoutFeedback>
      <RoundIconBtn 
              onPress={() => setModalVisible(true)} 
              antIconName='plus' 
              style={styles.addBtn}
      />
      <NoteInputModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)}
        onSubmit={handleOnSubmit}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    zIndex: 1,
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  emptyHeader: {
    fontSize: 25,
    fontWeight: 'bold',
    opacity: 0.5,
  },
  emptyHeaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },
  addBtn: {
    position: 'absolute',
    right: 15,
    bottom: 50,
    backgroundColor: '#6495ed',
    opacity: 0.8,
    zIndex: 1,
  }
});
 
export default NoteScreen