import React from 'react';
import { StyleSheet, Text, SafeAreaView, View } from 'react-native';
import MyButton from '../components/utils/MyButton';

const Home = () => {



  return (
    <SafeAreaView style={styles.default}>

      <View style={[styles.card, styles.shadowProp]}>
        <Text style={styles.text}>Se déconnecter</Text>
        <MyButton icon={'log-out'} btnColor={'#b22222'} text={'Deconnexion'} />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({

  default: {

    flex: 1,
    justifyContent: 'center'
  },
  text: {
    fontSize: 20,
    margin: 20,
    textAlign: 'center',
    fontWeight: '500',
    color: '#707070',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 25,
    margin: 10,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
});
export default Home;