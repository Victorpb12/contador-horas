import React, { useEffect, useState } from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  StatusBar, 
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from 'react-native'

import color from '../misc/colors'
import SearchBar from '../components/SearchBar'
import RoundIconBtn from '../components/RoundIconBtn'
import NoteInputModal from '../components/NoteInputModal'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Note from '../components/Note'

const NoteScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [notes, setNotes] = useState([]);

  const findNotes = async () => {
    const result = await AsyncStorage.getItem('notes');
    if (result !== null) setNotes(JSON.parse(result));
  };

  useEffect(() => {
    findNotes();
  }, []);

  const handleOnSubmit = async (title, desc) => {
    const note = {id: Date.now(), title: title, desc, time: Date.now()};
    const updatedNotes = [...notes, note];
    setNotes(updatedNotes)
    await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

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
          containerStyle={{marginVertical: 15}}
          />
          : null } 
          <FlatList
            data={notes}
            numColumns={2}
            columnWrapperStyle={{justifyContent: 'space-between', marginBottom: 15}}
            keyExtractor={item => item.id.toString()} 
            renderItem={({item}) => <Note item={item}/>}
          />
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
    opacity: 0.8
  }
})

export default NoteScreen