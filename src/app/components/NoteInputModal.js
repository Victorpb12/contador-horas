import React, { useEffect, useState } from 'react';
import colors from '../misc/colors'
import { 
  StyleSheet, 
  Modal, 
  TextInput, 
  StatusBar, 
  View, 
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';

import RoundIconBtn from './RoundIconBtn';

const NoteInputModal = ({visible, onClose, onSubmit, note, isEdit}) => {
  const [title, setTitle] = useState('');
  const [horaInicial, setHoraInicial] = useState('')
  const [horaFinal, setHoraFinal] = useState('');
  
  const handleModalClose = () => { 
    Keyboard.dismiss();
  }; 

  useEffect(() => {
    if (isEdit) {
      setTitle(note.title)
      setHoraInicial(note.horaInicial)
      setHoraFinal(note.horaFinal)
    }
  }, [isEdit])

  const handleOnChangeText = (text, valueFor) => {
    if (valueFor === 'title') setTitle(text);
  };

  const formatDate = (input, valueFor) => {
    const numericInput = input.replace(/[^\d]/g, '');

    if (valueFor === 'horaInicial') 
    if (numericInput.length <= 5) {
      setHoraInicial(
        numericInput.length <= 2
          ? numericInput
          : `${numericInput.substring(0, 2)}:${numericInput.substring(2)}`)
    };

    if (valueFor === 'horaFinal') 
    if (numericInput.length <= 5) {
      setHoraFinal(
        numericInput.length <= 2
          ? numericInput
          : `${numericInput.substring(0, 2)}:${numericInput.substring(2)}`)
    };     
  };

  const handleSubmit = () => {
    if (!title.trim() && !horaInicial.trim() && !horaFinal.trim()) return onClose();

    if (isEdit) {
      onSubmit(title, horaInicial, horaFinal, Date.now())
    } else {
      onSubmit(title, horaInicial, horaFinal);
      setTitle('');
      setHoraInicial('');
      setHoraFinal('');
    }
    onClose();
  };

  const closeModal = () => {
    if (!isEdit) {
      setTitle('');
      setHoraInicial('');
      setHoraFinal('');
    }
    onClose();
  }

  return (
    <>
      <StatusBar />
      <Modal visible={visible} animationType='fade'>
        <View style={styles.container}>
          <TextInput 
            value={title}
            placeholder='Título'
            style={[styles.input, styles.title]} 
            onChangeText={(text) => handleOnChangeText(text, 'title')}
          />
          <View style={styles.hourContainer}>
            <TextInput 
              value={horaInicial} 
              placeholder='Hora inicial' 
              style={[styles.input, styles.hora]} 
              maxLength={5}
              keyboardType='numeric'
              onChangeText={(input) => formatDate(input, 'horaInicial')}
            />
            <TextInput 
              value={horaFinal} 
              placeholder='Hora final' 
              style={[styles.input, styles.hora]} 
              maxLength={5}
              keyboardType='numeric'
              onChangeText={(input) => formatDate(input, 'horaFinal')}
            />
          </View>
          <View style={styles.btnContainer}>
            <RoundIconBtn 
              size={15} 
              antIconName='check' 
              style={styles.submit}
              onPress={handleSubmit}
            />
            { title.trim() || horaInicial.trim() || horaFinal.trim() ? 
              <RoundIconBtn 
                size={15} 
                antIconName='close' 
                style={styles.close}
                onPress={closeModal}
              />
            : null} 
          </View>
        </View>
        <TouchableWithoutFeedback onPress={handleModalClose}>
          <View style={[styles.modalBG, StyleSheet.absoluteFillObject]}/>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 15,
  },  
  input: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
    fontSize: 20,
    color: colors.dark, 
  },
  title: {
    height: 40,
    marginBottom: 15,
    fontWeight: 'bold',
  }, 
  hourContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },  
  hora: {
    height: 100,
    textAlign: 'center'
  }, 
  modalBG: {
    flex: 1,
    zIndex: -1,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  submit: {
    backgroundColor: '#6495ed',
  },
  close: {
    backgroundColor: '#ff4c4c',
    marginLeft: 15,
  }
})

export default NoteInputModal;