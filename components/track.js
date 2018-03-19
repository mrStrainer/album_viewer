import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

function formatDuration(duration_ms) {
	const mins = Math.floor(duration_ms / 60000);
	const seconds = ((duration_ms % 60000) / 1000).toFixed(0);
	
	return `${mins}: ${(seconds < 10 ? '0' : '') + seconds}`;
}

const Styles = StyleSheet.create({
	trackView: {
		flex:1,
		borderBottomColor:'#282828',
		borderBottomWidth:1,
		padding:0,
		margin:0,
		flexDirection:'row'
	},
	trackViewNoBorder: {
		flex:1,
		padding:0,
		margin:0,
		flexDirection:'row'
	},
	trackTitle: {
		color: "#ccc", 
		padding: 2, 
		paddingTop:6
	},
	trackNo: {
		color: "#ccc", 
		width:20,
		padding: 2, 
		paddingTop:6,
		marginRight:4,
		textAlign:'center'
	},
	trackTime: {
		color: "#ccc", 
		padding: 2, 
		paddingTop:6,
		marginLeft:'auto'
	}
});

const Track = (props) => {
	const { tracknr, name, duration, last } = props;
	return (
		<View style={last ? Styles.trackViewNoBorder : Styles.trackView}>
			<Text style={Styles.trackNo}>{tracknr}</Text>
			<Text style={Styles.trackTitle}>{name}</Text>
			<Text style={Styles.trackTime}>{formatDuration(duration)}</Text>
		</View>
	);
}

export default Track;