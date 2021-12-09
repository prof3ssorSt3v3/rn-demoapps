import React, { useState } from 'react';
import {
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  Pressable,
  UIManager,
  View,
  Button,
} from 'react-native';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const App = () => {
  const [expanded, setExpanded] = useState(false);
  //to track if expanded or not
  const [boxPosition, setBoxPosition] = useState('left');

  const toggleBox = () => {
    //try changing LayoutAnimation.Presets.easeInEaseOut to
    // LayoutAnimation.Presets.linear or
    // LayoutAnimation.Presets.spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setBoxPosition(boxPosition === 'left' ? 'right' : 'left');
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Animate Box" onPress={toggleBox} />
      </View>
      <View
        style={[styles.box, boxPosition === 'left' ? null : styles.moveRight]}
      />

      <Pressable
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
          setExpanded(!expanded);
        }}
      >
        <Text
          style={{
            color: 'white',
            backgroundColor: 'cornflowerblue',
            fontSize: 24,
            padding: 10,
          }}
        >
          Press me to {expanded ? 'collapse' : 'expand'}!
        </Text>
      </Pressable>
      {expanded && (
        <View style={styles.tile}>
          <Text style={{ fontSize: 30, padding: 10 }}>
            I disappear sometimes!
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  tile: {
    backgroundColor: 'lightgrey',
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    margin: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  box: {
    height: 100,
    width: 100,
    borderRadius: 5,
    margin: 8,
    backgroundColor: 'blue',
    alignSelf: 'flex-start',
  },
  moveRight: {
    alignSelf: 'flex-end',
  },
  buttonContainer: {
    alignSelf: 'center',
  },
});

export default App;
