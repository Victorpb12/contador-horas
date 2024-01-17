import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import colors from '../misc/colors';
import RoundIconBtn from './RoundIconBtn';

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

const NoteDetail = (props) => {
  const {note} = props.route.params

  const headerHeight = useHeaderHeight();

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
        antIconName='edit' 
        style={{backgroundColor: '#6495ed', marginBottom: 15}}
        onPress={() => {console.log('edit')}}
      />
      <RoundIconBtn 
        antIconName='delete' 
        style={{backgroundColor: 'red'}}
        onPress={() => {console.log('delete')}}
      />
      </View>
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