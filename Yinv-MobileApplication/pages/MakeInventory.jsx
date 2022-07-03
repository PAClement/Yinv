import { StyleSheet, Text } from 'react-native';
import React, { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Scanner from '../components/Scanner';
import InventoryList from '../components/makeInventory/InventoryList';
import CreateInventory from '../components/makeInventory/CreateInventory';
import AddQuantity from '../components/makeInventory/AddQuantity';

const MakeInventory = () => {

  const [scanned, setScanned] = useState(true);
  const [invData, setInvData] = useState([]);
  const [invExist, setInvExist] = useState(false);
  const [currentProduct, setCurrentProduct] = useState("");
  const [currentQuantity, setCurrentQuantity] = useState(0);

  const [productExist, setProductExist] = useState(false);

  const getInv = async () => {

    const jsonValue = await AsyncStorage.getItem('userInv');
    if (jsonValue != null) {

      setInvData(JSON.parse(jsonValue));
      setInvExist(true);
    }
  }

  const savedInv = async () => {
    const jsonValue = JSON.stringify(invData);
    await AsyncStorage.setItem('userInv', jsonValue);

    getInv();
  }

  const deleteInv = async () => {

    await AsyncStorage.removeItem('userInv');
    setInvExist(false);
    setInvData([]);
    resetAdd();
  }

  useEffect(() => {

    getInv();
  }, [])

  const verifyIfProductExist = () => {

    let state = false;

    invData.forEach((target) => {

      target.name == currentProduct ? state = true : '';
    });

    return state;
  }

  //Recover scan result
  const handleBarCodeScanned = ({ data }) => {

    setCurrentProduct(data);

    //Ici on pourra vérifier si l'article existe déjà dans la base de données et récupèrer son vrai nom
    //Ou au contraire Ajouter une petite interface pour ajouter l'article dans une table temporaire
  }


  const addQuantityNewProduct = () => {

    if (!verifyIfProductExist()) {

      invData.push({
        id: invData.length + 1,
        name: currentProduct,
        quantity: currentQuantity
      })

    } else {

      setInvData(current =>
        current.map(obj => {
          if (obj.name === currentProduct) {

            return obj.quantity = Number.parseInt(obj.quantity) + Number.parseInt(currentQuantity);
          }

          return obj;
        }),
      );
    }

    savedInv();
    resetAdd();
  }

  const resetAdd = () => {

    setScanned(true);
    setCurrentProduct("");
    setCurrentQuantity(0);
  }
  return (
    <>
      {scanned ? (

        !invExist ? (

          <CreateInventory onPress={() => setScanned(false)} /> //Card "Créer votre inventaire"
        ) : (

          <InventoryList delInv={deleteInv} exist={invExist} scan={scanned} addProduct={() => setScanned(false)} /> //List inventory
        )
      ) : (
        currentProduct == "" ? (

          <Scanner barCode={scanned ? undefined : handleBarCodeScanned} btnPress={resetAdd} /> //Barcode scanner
        ) : (

          <AddQuantity changeText={setCurrentQuantity} addQuantity={addQuantityNewProduct} cancelAdd={resetAdd} ifProductExist={verifyIfProductExist()} /> // Add quantity 
        )
      )}

    </>
  );
};

export default MakeInventory;