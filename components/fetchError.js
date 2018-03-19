import React from 'react'
import {View, Text} from 'react-native';

const FetchError = (props) => {
	if (!props.error) 
		return null;
	const message = props.error.message;

	return <Text>Fetch aint happening: {message}</Text>;
}
export default FetchError; 