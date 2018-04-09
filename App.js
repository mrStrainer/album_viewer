import React from "react";
import { StyleSheet, Text, ScrollView, SafeAreaView, View, Platform, Button, Linking } from "react-native";
import { NativeRouter, Route, Link, Redirect } from "react-router-native";
import { Constants, WebBrowser } from 'expo';
import qs from 'qs'

import Album from "./components/Album";
import Search from "./components/Search";

const redirectUri = 'https://accounts.spotify.com/authorize?' +
    qs.stringify({
    response_type: 'token',
    client_id: '5a6950442463432aaecf143805282d09',
    scope: 'user-read-private user-read-email',
    redirect_uri: Constants.linkingUri
});

const NavItem = ({ text }) => {
  return (
    <View style={styles.navItem}>
      <Text style={{color:'#ccc', fontSize:16}}>{text}</Text>
    </View>
  )
}

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        access_token: null,
      };
  }

  _handleRedirect = event => {
    WebBrowser.dismissBrowser();

    const query = event.url.replace(`${Constants.linkingUri}#`, '');
    let data;

    if (query) {
        data = qs.parse(query);
        this.setState({ access_token: data.access_token });
    }
  };

  _openWebBrowserAsync = async () => {
      this._addLinkingListener();

      let result = await WebBrowser.openBrowserAsync(redirectUri);
      this._removeLinkingListener();
      this.setState({ result });
    };

  _addLinkingListener = () => {
    Linking.addEventListener('url', this._handleRedirect);
  };

  _removeLinkingListener = () => {
    Linking.removeEventListener('url', this._handleRedirect);
  };

  LoginOrSearch = () => {
    if (this.state.access_token === null) 
      return (
        <View style={styles.center}>
          <Button
              onPress={this._openWebBrowserAsync}
              title="Log in with Spotify"/>
        </View>
      )
    return <Redirect to='/search'/>
  };

  render() {
    return (
      <NativeRouter>
        <View style={{flex:1, backgroundColor:'#181818'}}>
          <SafeAreaView style={styles.nav}>
            <Route exact path='/' render={() => <NavItem text='Login'/>}/>
            <Route path='/search' render={()=> <NavItem text='Search'/>}/>
            <Route path='/album/:id' render={
              ()=> {
                <Link to="/search" underlayColor='#282828' style={styles.navItem}>
                  <Text style={{color:'#fff'}}>Search</Text>
                </Link>
              }
            }/>
          </SafeAreaView>
          <ScrollView style={styles.container}>
            <Route exact path="/" render={this.LoginOrSearch}/>
            <Route path="/album/:id" component={Album}/>
            <Route path="/search" component={Search}/>
          </ScrollView>
        </View>
      </NativeRouter>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection:'column',
    paddingTop:15,
  },
  safeArea: {
    flex:1,
    backgroundColor:'#181818',
    padding:0,
    paddingTop: 0
  },
  nav: {
    paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight,
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
  },
  header: {
    fontSize: 25,
    marginBottom: 25,
    color:'#cccccc'
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 40,
  },
});
