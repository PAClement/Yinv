import React, { useState } from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import Scanner from '../Scanner';
import MyButton from '../utils/MyButton';

const Connection = () => {

  const [WantConnect, setWandConnect] = useState(false);

  const [userId, setUserId] = useState();

  const handleBarCodeScanned = ({ data }) => {

    setUserId(data);
  }

  const resetAdd = () => {

    setWandConnect(false);
  }

  return (
    <SafeAreaView>
      {WantConnect ? (

        <Scanner barCode={WantConnect ? undefined : handleBarCodeScanned} btnPress={resetAdd} />
      ) : (
        <>
          <Text style={styles.text}>Connecter vous afin d'accèder à votre inventaire</Text>
          <MyButton icon={'log-in'} btnColor={'#695CFE'} onPress={() => setWandConnect(true)} text={'Se connecter'} />
        </>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({

  text: {
    fontSize: 15,
    textAlign: 'center',
    color: '#707070',
    fontWeight: '600',
    marginBottom: 20,
  },
});
export default Connection;