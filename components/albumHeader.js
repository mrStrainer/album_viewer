import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native'

const Styles = StyleSheet.create({
	albumName: {
		textAlign: 'center', 
		color:'#fff',
		fontSize:16,
		fontWeight:'bold'
	},
    releaseDate: {
        textAlign: 'center',
        color:'#ccc',
        fontSize:12
    },
    headerImage: {
        width:300,
        height:300,
        position:'relative',
	    borderWidth: 1,
	    backgroundColor: '#181818'
    },
    imageOverlay: {
		width:300,
    	backgroundColor:'#181818',
    	opacity:0.8,
		position:'absolute',
		bottom:0,
		padding:5,
		paddingTop:9,
		paddingBottom:14
    },
    headerView: {
    	height:300,
    	marginBottom:10,
    	alignItems:'center',
	    backgroundColor: '#181818'	
    }

}); 

const AlbumHeader = ({ url, name, artist }) => {
	//const { url, name, release_date } = props;
	return (
		<View style={Styles.headerView}>	
			<Image source={{ uri: url}} style={Styles.headerImage}/>
			<View style={Styles.imageOverlay}>
	 	    	<Text style={Styles.albumName}>{name}</Text>
 	    		<Text style={Styles.releaseDate}>{artist}</Text>
			</View>
		</View>
	);
}
export default AlbumHeader;