import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ListProduct from './utils/ListProduct';
import AddNewProductBtn from './utils/AddNewProductBtn';

const InventoryList = (props) => {

  const [data, setData] = useState([])

  const getInv = async () => {

    const jsonValue = await AsyncStorage.getItem('userInv');
    if (jsonValue != null) {

      setData(JSON.parse(jsonValue));
    }
  }

  useEffect(() => {

    getInv();
  }, [])

  return (
    <>
      <SafeAreaView style={styles.default}>
        <ScrollView>
          <View style={[styles.productList]}>
            <Text style={[styles.text, { color: '#707070', fontWeight: 'bold' }]}>VOTRE INVENTAIRE</Text>
            <View style={[styles.row, styles.tabInv]}>
              <Text style={[styles.text, { fontSize: 17, color: 'white' }]}>Nom du produit</Text>
              <Text style={[styles.text, { fontSize: 17, color: 'white' }]}>Quantité</Text>
            </View>
            <View style={[styles.shadowProp, styles.dataRow]}>
              {data.map((target) => (

                <ListProduct dataInv={target} key={target.id} />
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      {
        props.exist && props.scan &&
        <>
          <AddNewProductBtn onPress={props.addProduct} />

          <View style={styles.delProduct}>
            <Pressable onPress={props.delInv} style={[styles.button, { backgroundColor: '#b22222', opacity: 0.8 }]}>
              <Text><Ionicons name={'trash'} size={30} color='white' /></Text>
            </Pressable>
          </View>
        </>
      }
    </>
  );
};
const styles = StyleSheet.create({
  default: {

    marginTop: 50,
  },
  dataRow: {
    backgroundColor: "white",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  productList: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  text: {
    fontSize: 20,
    margin: 20,
    textAlign: 'center',
    fontWeight: '500',
  },
  tabInv: {
    backgroundColor: '#695CFE',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10
  },

  delProduct: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  button: {
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 100,
    elevation: 3,
    marginLeft: 10,
    marginBottom: 10
  }
});
export default InventoryList;