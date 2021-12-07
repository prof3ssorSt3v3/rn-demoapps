import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TextInput,
  Pressable,
} from 'react-native';

export default function App() {
  //possible values for behaviour are 'height', 'position', 'padding'

  return (
    <KeyboardAvoidingView
      behaviour={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Pressable onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Text style={styles.text}>This is a Label</Text>
          <TextInput placeholder="Username" style={styles.textInput} />
        </View>
      </Pressable>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  inner: {
    flex: 1,
    justifyContent: 'space-around',
  },
  text: {
    fontSize: 30,
  },
  textInput: {
    height: 40,
    fontSize: 24,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 36,
  },
});
