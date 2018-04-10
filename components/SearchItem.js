import React, { Component } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { Link } from 'react-router-native';

const Styles = StyleSheet.create({
	searchItem: {
		borderBottomColor:'#282828',
		borderBottomWidth:1,
		paddingLeft:0,
		padding:5,
		margin:0,
		marginBottom:5,
		flexDirection:'row',
		height:64,
		alignItems:'center'
	},
	searchItemNoBorder: {
		flex:1,
		padding:5,
		paddingLeft:0,
		margin:0,
		flexDirection:'row',
		height:64,
		alignItems:'center'
	},
	albumTitle: {
		color: "#ccc", 
		fontSize:16,
		padding: 2, 
		paddingTop:6,
	},
	albumArtist: {
		color: "#999", 
		padding: 2, 
		paddingBottom:6,
	},
	albumImg: {
		width:64,
		height:64,
		padding: 2, 
		paddingTop:6,
		marginRight:5,
	}
});

const SearchItem = ({ id, name, artist, url, last }) => {
	return (
		<View style={last ? Styles.searchItemNoBorder : Styles.searchItem}>
		<Image source={{ uri: url }} style={Styles.albumImg}/>
			<Link to={`album/${id}`}>
				<View style={{width:285}}>
					<Text style={Styles.albumTitle} numberOfLines={1} ellipsizeMode='tail'>{name}</Text>
					<Text style={Styles.albumArtist} ellipsizeMode='tail'>{artist}</Text>
				</View>
			</Link>
		</View>
	);
}

export default SearchItem;