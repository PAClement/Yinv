import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import MyButton from '../utils/MyButton';

import AsyncStorage from '@react-native-async-storage/async-storage';


const OnConnect = ({ nav }) => {

  const [inProgress, setInProgress] = useState(false);

  const getProgress = async () => {

    const data = await AsyncStorage.getItem('userInv');
    data ? setInProgress(true) : setInProgress(false);
  }

  useEffect(() => {

    getProgress();

  }, [])



  return (
    <>
      <Text style={styles.title}>Bienvenue !</Text>
      <Text style={[styles.text, { marginBottom: 10 }]}>Entreprise Name</Text>
      <MyButton onPress={() => nav.navigate('CreateInv')} btnColor={'#695CFE'} text={`${inProgress ? "Reprendre" : "Commencer"} mon inventaire`} />
    </>
  );
};

const styles = StyleSheet.create({

  title: {
    fontSize: 35,
    textAlign: 'center',
    paddingVertical: 15,
    color: '#695CFE',
    marginBottom: 10,
    fontWeight: '600',
  },
  text: {
    fontSize: 15,
    textAlign: 'center',
    color: '#707070',
    fontWeight: '600',
  },
});
export default OnConnect;