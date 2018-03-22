import React, { Component } from "react";
import { Text, View, StyleSheet, TextInput, Button } from "react-native";
import * as firebase from 'firebase';
import fbconfig from './fbconfig';

firebase.initializeApp(fbconfig);

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
	      console.log(`user:${user.email} logged in`)
	    })
	    .catch((error) => {
	      const { code, message } = error;
	      console.log(`${code}: ${message}`);
	    });
	}

	onRegister = () => {
		const { email, password } = this.state;

		firebase.auth().createUserWithEmailAndPassword(email, password)
		    .then((user) => {
		    	console.log(`${user.email} registered`);
		    })
		    .catch((error) => {
		     	const { code, message } = error;
		     	console.log(`${code}: ${message}`);
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
		const { userName, pass, loading } = this.state;
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
				<Button onPress={() => this.onLogin} title="Login" color="#181818" accessibilityLabel="Login"/>

				<Text style={{color:'#ccc', fontSize:12, opacity:0.8, justifyContent:'center', padding:5}}>
					{this.state.user && <Text>Logged in as {this.state.user.email}</Text>}
				</Text>
			</View>
		);
	}
}
	

export default Profile;