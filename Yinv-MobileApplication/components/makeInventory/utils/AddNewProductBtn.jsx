import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AddNewProductBtn = (props) => {
  return (
    <View style={styles.addProduct}>
      <Pressable onPress={props.onPress} style={[styles.button, { backgroundColor: '#695CFE', opacity: 0.8 }]}>
        <Text><Ionicons name={'add'} size={30} color='white' /></Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({

  addProduct: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  button: {
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 100,
    elevation: 3,
    marginRight: 10,
    marginBottom: 10
  }
});

export default AddNewProductBtn;