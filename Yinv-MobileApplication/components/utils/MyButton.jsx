import React from 'react';
import { StyleSheet, SafeAreaView, Text, View, Button, TextInput, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MyButton = (props) => {
  return (
    <Pressable onPress={props.onPress} style={[styles.button, { backgroundColor: props.btnColor }]}>
      <Text style={styles.btnText}><Ionicons name={props.icon} size={16} color='white' /> {props.text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({

  button: {
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    marginTop: 10
  },
  btnText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    textAlign: 'center'
  }
});

export default MyButton;