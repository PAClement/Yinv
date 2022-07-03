import React from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView } from 'react-native';
import MyButton from '../utils/MyButton';

const AddQuantity = (props) => {
  return (
    <SafeAreaView style={styles.default}>
      <View style={styles.productList}>
        <Text style={styles.text}>Quantité du produit</Text>
        {props.ifProductExist && (

          <Text style={styles.textProductExist}>Ce produit existe déjà dans votre inventaire.{"\n"}La quantité sera ajoutée à l'article déjà présent.</Text>
        )}
        <TextInput style={styles.input} onChangeText={props.changeText} placeholder="Quantité" keyboardType="numeric" />

        <MyButton icon={"add-circle-outline"} btnColor={'#695CFE'} onPress={props.addQuantity} text='Ajouter la quantité' />

        <MyButton icon={'arrow-back'} btnColor={'#b22222'} onPress={props.cancelAdd} text='Annuler Ajout' />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  default: {

    flex: 1,
    justifyContent: 'center'
  },

  productList: {
    paddingLeft: 10,
    paddingRight: 10
  },
  text: {
    fontSize: 30,
    margin: 20,
    textAlign: 'center',
    fontWeight: '500',
  },
  textProductExist: {
    fontSize: 15,
    marginVertical: 25,
    textAlign: 'center',
    fontWeight: '700',
    color: '#b22222'
  },
  input: {
    height: 40,
    marginTop: 12,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default AddQuantity;