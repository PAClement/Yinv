import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, Pressable, Dimensions, SafeAreaView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { BarCodeScanner } from 'expo-barcode-scanner';

const Scanner = (props) => {

  const [hasPermission, setHasPermission] = useState(null);
  let width = Dimensions.get('window').width; //full width
  let height = Dimensions.get('window').height; //full height

  //Request Camera Permission

  const askForCameraPermission = () => {

    (async () => {

      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status == 'granted')

    })()
  }

  useEffect(() => {

    askForCameraPermission();
  }, [])

  //Check permission and return the screens

  if (hasPermission === null) {

    return (
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={props.barCode}
          style={{ height: height, width: width }}
        />
      </View>
    )
  } else if (hasPermission === false) {

    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera!</Text>
        <Button title={'Allow camera'} onPress={() => askForCameraPermission()} />
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.default}>
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={props.barCode}
          style={{ height: height, width: width }}
        />
      </View>
      <View style={styles.stopScan}>
        <Pressable onPress={props.btnPress} style={[styles.button, { backgroundColor: '#b22222' }]}>
          <Text><Ionicons name={'close'} size={25} color='white' /></Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  default: {

    marginTop: 50,
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 1,
    backgroundColor: 'black'
  },
  stopScan: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  button: {
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 100,
    elevation: 3,
    marginRight: 3,
    marginTop: 10
  }
});

export default Scanner;