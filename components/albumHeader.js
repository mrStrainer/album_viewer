import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native'

const Styles = StyleSheet.create({
	albumName: {
		textAlign: 'center', 
		color:'#fff'
	},
    releaseDate: {
        textAlign: 'center',
        color:'#ccc',
    },
    headerImage: {
        width:300,
        height:300,
        position:'relative',
        marginBottom:10
    },
    imageOverlay: {
		width:300,
    	backgroundColor:'#000',
    	opacity:0.5,
		position:'absolute',
		bottom:10,
		padding:4
    }

}); 

const AlbumHeader = (props) => {
	const { url, name, release_date } = props;
	return (
		<View>	
			<Image source={{ uri: url}} style={Styles.headerImage}/>
			<View style={Styles.imageOverlay}>
	 	    	<Text style={Styles.albumName}>{name}</Text>
 	    		<Text style={Styles.releaseDate}>{release_date}</Text>
			</View>
		</View>
	);
}
export default AlbumHeader;