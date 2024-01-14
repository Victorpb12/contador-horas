import React, { useState } from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  StatusBar 
} from 'react-native'

import color from '../misc/colors'
import SearchBar from './SearchBar'
import RoundIconBtn from './RoundIconBtn'
import NoteInputModal from './NoteInputModal'

const NoteScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleOnSubmit = (title, desc) => {
    
  };

  return (
    <>
      <StatusBar barStyle='dark-content' backgroundColor={color.light}/>
      <View style={styles.container}>
        <Text 
          style={styles.header}
        >Horas trabalhadas
        </Text>
        <SearchBar 
          containerStyle={{marginVertical: 15}}
        />
        <View 
          style={[StyleSheet.absoluteFillObject, styles.emptyHeaderContainer]}
        >
          <Text 
            style={styles.emptyHeader}>Adicionar
          </Text>
          <RoundIconBtn 
            onPress={() => setModalVisible(true)} 
            antIconName='plus' 
            style={styles.addBtn}
          />
        </View>
      </View>   
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
    flex: 1
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