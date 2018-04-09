import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

const Styles = StyleSheet.create({
	searchItem: {
		borderBottomColor:'#282828',
		borderBottomWidth:1,
		padding:5,
		margin:0,
		flexDirection:'row',
		height:64,
		alignItems:'center'
	},
	searchItemNoBorder: {
		flex:1,
		padding:5,
		margin:0,
		flexDirection:'row',
		height:64,
		alignItems:'center'
	},
	albumTitle: {
		color: "#ccc", 
		padding: 2, 
		paddingTop:6,
	},
	albumImg: {
		color: "#ccc", 
		width:64,
		height:64,
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

const SearchItem = ({ id, name, artist, url, last }) => {
	return (
		<View style={last ? Styles.searchItemNoBorder : Styles.searchItem}>
			<Image source={{ uri: url }} style={Styles.albumImg}/>
			<Text style={Styles.albumTitle}>{name} {artist}</Text>
			<Text style={Styles.trackTime}>{formatDuration(duration)}</Text>
		</View>
	);
}

export default SearchItem;