import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

export default function App() {
  const [image, setImage] = useState(null);

  useEffect(() => {
    //on load of this screen / component
    //for Android and iOS not web
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync().catch(
          console.error
        );
      if (status !== 'granted') {
        alert("Fine. Then you can't use my app.");
        return;
      }
      //Now check if the app has an image from a previous running
      const appImageLocation =
        FileSystem.documentDirectory + 'images/image1.jpg';
      console.log(appImageLocation);

      await FileSystem.getInfoAsync(appImageLocation, {
        size: true,
      })
        .then((fileInfo) => {
          console.log(fileInfo);

          if (fileInfo && fileInfo.exists && fileInfo.size > 0) {
            setImage(appImageLocation);
            console.log('show the previous image');
            //save the image location so it will load in the screen
          }
        })
        .catch(console.log);
    })();
  }, []);

  const pickImage = async () => {
    //could be called with a button click
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    }).catch(console.error);

    if (!result.cancelled) {
      //setImage is our state variable to save the image source
      setImage(result.uri);
      //then copy the file to the data directory for our app
      const appImageLocation =
        FileSystem.documentDirectory + 'images/image1.jpg';
      console.log(result.uri, appImageLocation);

      //using the same name each time so we only save ONE image
      FileSystem.copyAsync({ from: result.uri, to: appImageLocation })
        .then(() => {
          console.log('copied the image');
        })
        .catch(console.log);
    }
  };

  const takePic = async () => {
    //use the camera and take a picture
    let options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    };
    let result = await ImagePicker.launchCameraAsync(options).catch(
      console.error
    );
    if (!result.cancelled) {
      //setImage is our state variable to save the image source
      setImage(result.uri);

      //copy to permanent location if we want...
      const appImageLocation =
        FileSystem.documentDirectory + 'images/image1.jpg';
      console.log(result.uri, appImageLocation);

      //using the same name each time so we only save ONE image
      FileSystem.copyAsync({ from: result.uri, to: appImageLocation })
        .then(() => {
          console.log('copied the image');
        })
        .catch(console.log);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Pick a Pic or Take a Pic</Text>
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      <Button title="Take a Picture with the camera" onPress={takePic} />
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
