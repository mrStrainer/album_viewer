import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native'

const Styles = StyleSheet.create({
	albumName: {
		textAlign: 'center', 
		color:'#fff', 
		marginTop:10
	},
    releaseDate: {
        textAlign: 'center',
        color:'#ccc',
    },
    centerImage: {
        width:300,
        height:300
    }

}); 

const AlbumHeader = (props) => {
	const { url, name, release_date } = props;
	return (
		<View>	
			<Image source={{ uri: url}} style={Styles.centerImage}/>
 	    	<Text style={Styles.albumName}>{name}</Text>
 	    	<Text style={Styles.releaseDate}>{release_date}</Text>
		</View>
	);
}
export default AlbumHeader;