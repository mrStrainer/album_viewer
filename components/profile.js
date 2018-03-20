import React, { Component } from "react";
import { Text, View, StyleSheet, TextInput, Button } from "react-native";
import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBAeGRgeTb6KPOQAnYhl_xdPi2jbcQkZbg",
    authDomain: "album-viewer-cd41b.firebaseapp.com",
    databaseURL: "https://album-viewer-cd41b.firebaseio.com",
    projectId: "album-viewer-cd41b",
    storageBucket: "",
    messagingSenderId: "635655971534"
  };
firebase.initializeApp(config);



class Profile extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			loading:true,
			email:'',
			password:''
		}
	}

  	onLogin = () => {
	  const { email, password } = this.state;

	  firebase.auth().signInWithEmailAndPassword(email, password)
	    .then((user) => {
	      console.log(`user:${user}`)
	    })
	    .catch((error) => {
	      const { code, message } = error;
	      console.error(error)
	    });
	}

	onRegister = () => {
	  const { email, password } = this.state;
	  firebase.auth().createUserWithEmailAndPassword(email, password)
	    .then((user) => {
	      // If you need to do anything with the user, do it here
	      // The user will be logged in automatically by the
	      // `onAuthStateChanged` listener we set up in App.js earlier
	    })
	    .catch((error) => {
	      const { code, message } = error;
	      // For details of error codes, see the docs
	      // The message contains the default Firebase string
	      // representation of the error
	    });
	}

  	componentDidMount() {
	    this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
	      this.setState({
	        loading: false,
	        user,
	      });
	    });
  	}

  	componentWillUnmount() {
    	this.authSubscription();
  	}

	render() {
		const {userName, pass, loading } = this.state;
		return (
			<View style={{ flex: 1, alignSelf: 'stretch', backgroundColor:'#181818', padding:10}}>
				<Text style={{color:'#fff', padding:5}}>{'\n'}Login{'\n'}</Text>
				<TextInput 
					placeholderTextColor='#ccc' 
					style={{borderBottomColor:'#282828', borderBottomWidth:1, padding:5, paddingTop:10, marginBottom:0, color:'#ccc'}} 
					placeholder="Username" 
					onChangeText={(userName) => this.setState({...this.state, userName})}
				/>
				<TextInput 
					secureTextEntry={true} 
					placeholderTextColor='#ccc' 
					style={{borderBottomColor:'#282828', borderBottomWidth:1, padding:5, paddingTop:10, marginBottom:0, color:'#ccc'}} 
					placeholder="Password" 
					onChangeText={(pass) => this.setState({...this.state, pass})}
				/>
				<Button onPress={() => this.onLogin} title="Login" color="#ccc" accessibilityLabel="Login"/>

				<Text style={{color:'#ccc', fontSize:12, opacity:0.8, justifyContent:'center', padding:5}}>
					{this.state.user && <Text>Logged in as {this.state.user.email}</Text>}
				</Text>
			</View>
		);
	}
}
	

export default Profile;