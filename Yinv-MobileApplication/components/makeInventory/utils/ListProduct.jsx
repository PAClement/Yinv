import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ListProduct = ({ dataInv }) => {

  return (
    <View style={styles.row}>
      <Text style={styles.text}><Text style={[styles.boldText, styles.text, { color: 'black' }]}>{dataInv.id}</Text> - {dataInv.name}</Text>
      <Text style={styles.text}>{dataInv.quantity}</Text>
    </View>

  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 15,
    margin: 20,
    textAlign: 'center',
    color: '#707070'
  },
  boldText: {
    fontWeight: 'bold',
  },

});

export default ListProduct;
