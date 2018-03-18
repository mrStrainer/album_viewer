import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import Album from "./components/album";

export default class App extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Album />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181818",
    alignItems: "center",
    justifyContent: "center"
  },
  safeArea: {
    flex:1,
    backgroundColor:'#181818'
  }
});
