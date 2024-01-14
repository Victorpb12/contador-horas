import React, { useState } from 'react';
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

const NoteInputModal = ({visible, onClose, onSubmit}) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const handleModalClose = () => {
    Keyboard.dismiss();
  };

  const handleOnChangeText = (text, valueFor) => {
    if (valueFor === 'title') setTitle(text);
    if (valueFor === 'description') setDesc(text);
  };

  const handleSubmit = () => {
    if (!title.trim() && !desc.trim()) return onClose();
    onSubmit(title, desc);
    setTitle('');
    setDesc('');
    onClose();
  };

  const closeModal = () => {
    setTitle('');
    setDesc('');
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
          <TextInput 
            value={desc}
            multiline 
            placeholder='Descrição' 
            style={[styles.input, styles.description]} 
            onChangeText={(text) => handleOnChangeText(text, 'description')}
          />
          <View style={styles.btnContainer}>
            <RoundIconBtn 
              size={15} 
              antIconName='check' 
              style={styles.submit}
              onPress={handleSubmit}
            />
            { title.trim() || desc.trim() ? 
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
  description: {
    height: 100,
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