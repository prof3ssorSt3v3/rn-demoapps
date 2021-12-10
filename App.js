import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

export default function App() {
  const [value, setValue] = useState([]);
  const { getItem, setItem } = useAsyncStorage('AnotherKey');

  const readItemFromStorage = () => {
    getItem()
      .then((item) => {
        //get the value from AsyncStorage and save it in `value`
        item = item === null ? [] : JSON.parse(item);
        setValue(item);
      })
      .catch(console.log);
  };

  const addItemToStorage = (newValue) => {
    //item in variable is an array
    setValue((currentArr) => [newValue, ...currentArr]);
    //add the newValue to the array and overwrite it in AsyncStorage
    setItem(JSON.stringify([newValue, ...value]))
      .then(() => {
        console.log('saved new value in array');
      })
      .catch(console.log);
    //item in AsyncStorage is a String representation of the Array
  };

  useEffect(() => {
    readItemFromStorage();
  }, []);

  return (
    <View style={styles.container}>
      <Button
        title="Update value"
        style={{ margin: 20 }}
        onPress={() => {
          let numString = Math.random().toString(36).substr(2, 5);
          addItemToStorage(numString);
        }}
      />
      <Text style={{ margin: 20 }}>Current value: {JSON.stringify(value)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
