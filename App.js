import './ReactotronConfig';
import React from 'react';
import { Provider } from 'react-redux'
import { StyleSheet, Text, ScrollView, SafeAreaView, View, Platform, Button, Linking } from 'react-native';
import { NativeRouter, Route, Link, Redirect } from 'react-router-native';
import { Constants, WebBrowser } from 'expo';

import qs from 'qs'

import StyledInput from './components/StyledInput';
import Album from './components/Album';
import Search from './components/Search';

//ignore warnings until fix
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
]);

const redirectUri = 'https://accounts.spotify.com/authorize?' +
    qs.stringify({
    response_type: 'token',
    client_id: '5a6950442463432aaecf143805282d09',
    scope: 'user-read-private user-read-email',
    redirect_uri: Constants.linkingUri
});

const NavItem = ({ text }) => {
    return (
        <View style={Styles.navItem}>
            <Text style={{color:'#ccc', fontSize:16}}>{text}</Text>
        </View>
    )
}

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            access_token: null,
            searchQ:null,
        };
    }

    HandleRedirect = event => {
        WebBrowser.dismissBrowser();

        const query = event.url.replace(`${Constants.linkingUri}#`, '');

        if (query) {
            const data = qs.parse(query);
            this.setState({ access_token: data.access_token });
        }
    };

    OpenWebBrowserAsync = async () => {
        this._addLinkingListener();

        let result = await WebBrowser.openBrowserAsync(redirectUri);
        this._removeLinkingListener();
    };

    _addLinkingListener = () => {
        Linking.addEventListener('url', this.HandleRedirect);
    };

    _removeLinkingListener = () => {
        Linking.removeEventListener('url', this.HandleRedirect);
    };

    LoginOrSearch = () => {
        if (this.state.access_token === null) 
            return (
                <View style={Styles.center}>
                    <Button
                        onPress={this.OpenWebBrowserAsync}
                        title='Log in with Spotify'/>
                </View>
            )

        return <Redirect to='/search'/>
    };

    render() {
        return (
            <NativeRouter>
                <View style={{flex:1, backgroundColor:'#181818'}}>
                    <SafeAreaView style={Styles.nav}>
                        <Route exact path='/' render={() => <NavItem text='Login'/>}/>
                        <Route path='/search' render={()=> <NavItem text='Search'/> }/>
                        <Route path='/album/:id' render={
                            ()=> 
                                <Link to='/search' underlayColor='#282828' style={Styles.navItem}>
                                    <Text style={{color:'#fff', fontSize:16}}>{`< Search`}</Text>
                                </Link>
                        }/>
                    </SafeAreaView>
                    <ScrollView style={Styles.container}>
                        <Route exact path='/' render={this.LoginOrSearch}/>
                        <Route path='/album/:id' render={(props) => <Album token={this.state.access_token} {...props}/>}/>
                        <Route path='/search' render={(props) => <Search token={this.state.access_token} {...props}/>}/>
                    </ScrollView>
                </View>
            </NativeRouter>
        );
    }
}

const Styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection:'column',
        paddingTop:10,
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
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 40,
    },
});
