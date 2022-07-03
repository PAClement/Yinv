import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, ImageBackground, SafeAreaView, Animated } from 'react-native';
import Connection from '../components/homePage/Connection';
import OnConnect from '../components/homePage/OnConnect';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({ navigation }) => {

  const translation = useRef(new Animated.Value(-100)).current;
  const [userData, setUserData] = useState(true);

  const getInfo = async () => {

    const data = await AsyncStorage.getItem('userData');
    data ? setUserData(true) : setUserData(false);
  }

  useEffect(() => {

    // getInfo();

    Animated.timing(translation, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [])

  return (
    <ImageBackground source={require("../assets/mainbg.jpg")} resizeMode="cover" style={[styles.image, styles.default]}>
      <SafeAreaView>
        <Animated.View style={[styles.card, styles.shadowProp, { transform: [{ translateY: translation }] }]}>
          {userData ? (

            <OnConnect nav={navigation} />
          ) : (

            <Connection />
          )}
        </Animated.View>
      </SafeAreaView>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({

  default: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
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