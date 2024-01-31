import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { useNotes } from '../contexts/NoteProvider';
import { format, parse, differenceInMinutes } from 'date-fns';

import colors from '../misc/colors';
import RoundIconBtn from './RoundIconBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  
  const differenceHours = (horaInicial, horaFinal) => {
    const formatHour = 'HH:mm';
    const dataBase = new Date();
  
    if (!horaInicial || !horaFinal) {
      return null; 
    }
  
    const dataInicial = parse(horaInicial, formatHour, dataBase);
    const dataFinal = parse(horaFinal, formatHour, dataBase);
  
    if (isNaN(dataInicial) || isNaN(dataFinal)) {
      return null; 
    }
  
    const difference = differenceInMinutes(dataFinal, dataInicial);
  
    const formatDifference = format(new Date(0, 0, 0, 0, difference), formatHour);
  
    return formatDifference;
  }
  

  const handleUpdate = async (title, horaInicial, horaFinal, time) => {
    const result = await AsyncStorage.getItem('notes');
    const difference  = differenceHours(horaInicial, horaFinal);
    let notes = [];
    if (result !== null) notes = JSON.parse(result);

    const newNotes = notes.filter(n => {
      if (n.id === note.id) {
        n.title = title;
        n.horaInicial = horaInicial;
        n.horaFinal = horaFinal;
        n.isUpdated = true;
        n.time = time;
        n.difference = difference;

        setNote(n);
      }
      return n;
    })
    setNotes(newNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(newNotes))
  };

  const handleOnClose = () => setShowModal(false);

  const openEditModal = () => {
    setIsEdit(true);
    setShowModal(true);
  }

  return (
    <>
      <ScrollView 
        contentContainerStyle={[styles.container, {paddingTop: headerHeight}]}>
        <Text style={styles.time}>{
          note.isUpdated ? 
            `Editado em ${formatDate(note.time)}` : 
            `Criado em ${formatDate(note.time)}`}
        </Text>
        <Text style={styles.title}>{note.title}</Text>
        <Text style={styles.hora}>
          {note.horaInicial ? note.horaInicial + ' -' : null} {note.horaFinal}</Text>
        <Text style={styles.hora}>{note.difference}</Text>
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
    fontSize: 14,
    opacity: 0.6,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 30,
    color: colors.primary,
    fontWeight: 'bold',
  },
  hora: {
    fontSize: 30,
    opacity: 0.6,
    alignContent: 'center',
    textAlign: 'center',
    fontWeight: 'bold', 
    marginTop: 10,
  },
  btnContainer: {
    position: 'absolute',
    right: 15,
    bottom: 50,
  },
});

export default NoteDetail;