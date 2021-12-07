import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Pressable, Button } from 'react-native';
import { Camera } from 'expo-camera';

export default function App() {
  const [ready, setReady] = useState(false);
  let camera = useRef();
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const takePic = () => {
    //take a picture
    const options = {
      quality: 0.8,
      exif: true,
    };
    camera
      .takePictureAsync(options)
      .then(({ uri, width, height, exif, base64 }) => {
        console.log(uri); //temporary uri saved to app cache
        console.log(width, height);
        console.log(exif);
        //use https://docs.expo.dev/versions/v43.0.0/sdk/filesystem/#filesystemcopyasyncoptions
        //to permanently save the image
      });
  };
  const beenSaved = (data) => {
    console.log('image been saved.');
    console.log(data);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View style={styles.container} />;
    //empty view until we have permission
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>No access to camera</Text>;
      </View>
    );
    //message about permission being denied by user
  }

  return (
    <View style={styles.container}>
      <Text>Camera Demo</Text>
      <Camera
        style={styles.camera}
        type={type}
        ref={(r) => {
          camera = r;
        }}
      >
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Text style={styles.text}> Flip </Text>
          </Pressable>
        </View>
      </Camera>
      <Button
        title="Take Picture"
        style={styles.buttonTake}
        onPress={takePic}
      />
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
  camera: {
    width: 300,
    height: 400,
    margin: 10,
  },
  buttonContainer: {},
  text: {
    color: 'white',
    fontSize: 24,
  },
  buttonTake: {},
});
