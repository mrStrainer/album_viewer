import './ReactotronConfig';
import React from 'react';
import { Provider } from 'react-redux'
import { StyleSheet, Text, ScrollView, SafeAreaView, View, Platform, Button, Linking, TouchableHighlight } from 'react-native';
import { NativeRouter, Route, Link, Redirect } from 'react-router-native';
import { Constants, WebBrowser } from 'expo';
import store/*, { history } */from './store'
import qs from 'qs'

import StyledInput from './components/StyledInput';
import Album from './components/Album';
import SearchContainer from './components/Containers/SearchContainer';

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
const BackButton =({ history }) => {
    goBack = () => {
        history.goBack();
    }
    return history.index !== 0 ? (
        <TouchableHighlight onPress={this.goBack}>
            <Text style={{color:'#ccc', fontSize:16}}>{'<'}</Text> 
        </TouchableHighlight>): (null);
}
const ForwardButton = ({ history }) => {
    goForward = () => {
        history.goForward();
    }
    return history.index !== history.length-1 ? (
        <TouchableHighlight onPress={this.goForward} style={{width:15}}>
            <Text style={{color:'#ccc', fontSize:16}}>{'>'}</Text> 
        </TouchableHighlight>): (null);
}
const NavItem = ({ text, history }) => {
    return (
        <View style={{flex:1, flexDirection:'row', height:30, alignItems:'center', justifyContent:'space-between'}}>
            <BackButton history={history} style={{width:15}}/>
            <Link to='/'  style={{width:'auto'}}><Text style={{color:'#ccc', fontSize:16}}>{text}</Text></Link>
            <ForwardButton history={history}  style={{width:15, marginRight:'auto'}}/>
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
            //const { login } = this.props.login
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
/* ROUTER history={history}*/
    render() {
        return (
            <Provider store={store}>
                <NativeRouter>
                    <View style={{flex:1, backgroundColor:'#181818'}}>
                        <SafeAreaView style={Styles.nav}>
                            <Route exact path='/' render={(props) => <NavItem text='Login' {...props}/> }/>
                            <Route path='/search' render={(props)=> <NavItem text='Search'  {...props}/> }/>
                            <Route path='/album/:id' render={(props)=> <NavItem text='Album' {...props}/> }/>
                        </SafeAreaView>
                        <ScrollView style={Styles.container}>
                            <Route exact path='/' render={this.LoginOrSearch}/>
                            <Route path='/album/:id' render={(props) => <Album token={this.state.access_token} {...props}/>}/>
                            <Route path='/search' component={SearchContainer}/>
                        </ScrollView>
                    </View>
                </NativeRouter>
            </Provider>
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
        borderBottomWidth:2,
        alignItems:'center'
    },
    navItem: {
        flex:1,
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-between',
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
