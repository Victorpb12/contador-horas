import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import colors from '../misc/colors';
import RoundIconBtn from './RoundIconBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNotes } from '../contexts/NoteProvider';
import NoteInputModal from './NoteInputModal';

const formatDate = ms => {
  const date = new Date(ms);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hrs = date.getHours();
  const min = date.getMinutes();

  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedHrs = hrs < 10 ? `0${hrs}` : hrs;
  const formattedMin = min < 10 ? `0${min}` : min;

  return `${formattedDay}/${formattedMonth}/${year} - ${formattedHrs}h${formattedMin}`;
};

const NoteDetail = props => {
  const [note, setNote] = useState(props.route.params.note);
  const headerHeight = useHeaderHeight();
  const {setNotes} = useNotes();
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const deleteNote = async () => {
    const result = await AsyncStorage.getItem('notes');
    let notes = [];

    if (result !== null) notes = JSON.parse(result);

    const newNotes = notes.filter(n => n.id !== note.id);
    setNotes(newNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
    props.navigation.goBack();
  };

  const displayDeleteAlert = () => {
    Alert.alert('Tem certeza?', 'Essa nota será deletada permanentemente!',
    [
      {
        text: 'Deletar',
        onPress: deleteNote
      },
      {
        text: 'Não obrigado',
        onPress: () => console.log('Não')
      }
    ],
    {
      cancelable: true,
    }
    )
  };

  const handleUpdate = () => {};
  const handleOnClose = () => setShowModal(false);

  const openEditModal = () => {
    setIsEdit(true);
    setShowModal(true);
  }

  return (
    <>
      <ScrollView 
        contentContainerStyle={[styles.container, {paddingTop: headerHeight}]}>
        <Text style={styles.time}>{`Criado em ${formatDate(note.time)}`}</Text>
        <Text style={styles.title}>{note.title}</Text>
        <Text style={styles.desc}>{note.desc}</Text>
      </ScrollView>
      <View style={styles.btnContainer}>
      <RoundIconBtn 
        antIconName='delete' 
        style={{backgroundColor: 'red'}}
        onPress={displayDeleteAlert}
      />
      <RoundIconBtn 
        antIconName='edit' 
        style={{backgroundColor: '#6495ed', marginTop: 15}}
        onPress={openEditModal}
      />
      </View>
      <NoteInputModal 
        isEdit={isEdit}
        note={note}
        onClose={handleOnClose}
        onSubmit={handleUpdate}
        visible={showModal}
      />
   </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  }, 
  time: {
    textAlign: 'right',
    fontSize: 12,
    opacity: 0.6,
  },
  title: {
    fontSize: 30,
    color: colors.primary,
    fontWeight: 'bold',
  },
  desc: {
    fontSize: 20,
    opacity: 0.6
  },
  btnContainer: {
    position: 'absolute',
    right: 15,
    bottom: 50,
  },
});

export default NoteDetail;