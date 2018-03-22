import React, { Component } from "react";
import Expo, { Constants, WebBrowser } from 'expo';
import { Text, View, StyleSheet, Button, Linking, Platform } from "react-native";
import qs from 'qs'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 40,
  },
  header: {
    fontSize: 25,
    marginBottom: 25,
    color:'#cccccc'
  },
});
const redirectUri = 'https://accounts.spotify.com/authorize?' +
    qs.stringify({
		response_type: 'token',
		client_id: '5a6950442463432aaecf143805282d09',
		scope: 'user-read-private user-read-email',
		redirect_uri: Constants.linkingUri
	});

class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
    		redirectData: null,
  		};
	}

	_handleRedirect = event => {
    	WebBrowser.dismissBrowser();

    	let query = event.url.replace(Constants.linkingUri, '');
    	let data;

    	if (query) {
      		data = qs.parse(query);
    	} else {
      		data = null;
    	}

    	this.setState({ redirectData: data });
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

  	_maybeRenderRedirectData = () => {
    	if (!this.state.redirectData) {
      		return;
    	}
    	return <Text>{Platform.OS === 'ios' ? 'IOS' : 'NEM IOS'}</Text>;
  	};

	render() {
		return (
			<View style={styles.container}>

				<Text style={styles.header}>Login</Text>

        		<Button
          			onPress={this._openWebBrowserAsync}
          			title="Log in with Spotify"
        		/>
        		
        		{this._maybeRenderRedirectData()}
			</View>
		);
	}
}

export default Home;