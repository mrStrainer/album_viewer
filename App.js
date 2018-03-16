import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Album from "./components/album";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Album/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
