import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import MyButton from '../utils/MyButton';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CreateInventory = (props) => {
  return (
    <SafeAreaView style={styles.default}>
      <View style={[styles.card, styles.shadowProp]}>
        <View style={styles.icon}>
          <Ionicons name='add-circle-outline' size={60} color={'#695CFE'} />
        </View>
        <Text style={styles.text}>Créer votre inventaire</Text>

        <MyButton icon={'add'} btnColor={'#695CFE'} onPress={props.onPress} text={'Ajouter un produit'} />
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
  icon: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default CreateInventory;