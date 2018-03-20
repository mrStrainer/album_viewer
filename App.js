import React from "react";
import { StyleSheet, Text, ScrollView, SafeAreaView, View, StatusBar } from "react-native";
import { NativeRouter, Route, Link } from "react-router-native";
import Album from "./components/album";
import Profile from "./components/profile";
import Home from "./components/home";


export default class App extends React.Component {

  //this.yOffset=0;

  handleScroll(event) {
    //console.log(event.nativeEvent.contentOffset.y);
    //onScroll={this.handleScroll} scrollEventThrottle={64} 
  }

  render() {
    return (
        <NativeRouter>
          <View style={{flex:1, backgroundColor:'#181818'}}>
            <SafeAreaView style={styles.nav}>
              <Link to="/album" underlayColor='#282828' style={styles.navItem}>
                <Text style={{color:'#fff'}}>Album</Text>
              </Link>
              <Link to="/Profile" underlayColor='#282828' style={styles.navItem}>
                <Text style={{color:'#fff'}}>Profile</Text>
              </Link>
            </SafeAreaView>
            <ScrollView style={styles.container}>
              <Route exact path="/" component={Home}/>
              <Route path="/album" component={Album}/>
              <Route path="/profile" component={Profile}/>
            </ScrollView>
            
          </View>
        </NativeRouter>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection:'column'
  },
  safeArea: {
    flex:1,
    backgroundColor:'#181818',
    padding:0
  },
  nav: {
    flexDirection:'row',
    justifyContent:'space-between',
    backgroundColor:'#282828',
    borderBottomColor:'#181818',
    borderBottomWidth:2
  },
  navItem: {
    flex:1,
    alignItems:'center',
    padding:10,
    backgroundColor:'#282828',
  }
});
