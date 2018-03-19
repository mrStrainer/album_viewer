import React from "react";
import { StyleSheet, Text, ScrollView, SafeAreaView } from "react-native";
import Album from "./components/album";

export default class App extends React.Component {

  //this.yOffset=0;

  handleScroll(event) {
    //console.log(event.nativeEvent.contentOffset.y);
    //onScroll={this.handleScroll} scrollEventThrottle={64} 
  }

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.container}>
          <Album />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  safeArea: {
    flex:1,
    backgroundColor:'#181818',
  }
});
