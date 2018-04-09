import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { formatDuration } from './helpers/Utility';


const Styles = StyleSheet.create({
	trackView: {
		borderBottomColor:'#282828',
		borderBottomWidth:1,
		padding:5,
		margin:0,
		flexDirection:'row',
		height:40,
		alignItems:'center'
	},
	trackViewNoBorder: {
		flex:1,
		padding:5,
		margin:0,
		flexDirection:'row',
		height:40,
		alignItems:'center'
	},
	trackTitle: {
		color: "#ccc", 
		padding: 2, 
		paddingTop:6,
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

const Track = ({ tracknr, name, duration, last }) => {
	return (
		<View style={last ? Styles.trackViewNoBorder : Styles.trackView}>
			<Text style={Styles.trackNo}>{tracknr}</Text>
			<Text style={Styles.trackTitle}>{name}</Text>
			<Text style={Styles.trackTime}>{formatDuration(duration)}</Text>
		</View>
	);
}

export default Track;