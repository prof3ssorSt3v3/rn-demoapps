import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';

export default function App() {
  const [orient, setOrient] = useState('column');

  const getOrientation = ({ orientationInfo }) => {
    try {
      const currentOrientation = orientationInfo.orientation;
      console.log('getOrientation', currentOrientation);
      //0 - UNKNOWN, 1 - PORTRAIT_UP, 2 - PORTRAIT_DOWN, 3 - LANDSCAPE_LEFT, 4 - LANDSCAPE_RIGHT
      switch (currentOrientation) {
        case 1:
        case 2:
          setOrient('column');
          console.log('portrait');
          break;
        case 3:
        case 4:
          setOrient('row');
          console.log('landscape');
          break;
        default:
        // setOrient('portrait');
      }
      // const lock = await ScreenOrientation.getOrientationLockAsync();
      // console.log(lock);
      //https://docs.expo.dev/versions/v43.0.0/sdk/screen-orientation/#orientationlock
    } catch (err) {
      console.log(err.message);
    }
  };
  //add add a listener for future changes
  ScreenOrientation.addOrientationChangeListener(getOrientation);
  //unlock orientation
  ScreenOrientation.unlockAsync();

  useEffect(() => {
    //check the initial screen orientation on load
    ScreenOrientation.getOrientationAsync()
      .then((currentOrientation) => {
        switch (currentOrientation) {
          case 1:
          case 2:
            setOrient('column');
            console.log('portrait');
            break;
          case 3:
          case 4:
            setOrient('row');
            console.log('landscape');
            break;
          default:
            setOrient('portrait');
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <View style={[styles.container, { flexDirection: orient }]}>
      <View style={styles.container}>
        <Text>I am the TOP OR the LEFT</Text>
      </View>
      <View style={styles.container}>
        <Text>I am the BOTTOM OR the RIGHT</Text>
      </View>
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
