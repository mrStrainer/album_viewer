import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

const Track = (props) => {
	const { tracknr, name } = props;
	return (
		<View style={{flex: 1}}>
			<Text key={tracknr} style={{ color: "#fff", padding: 2 }}>{name}</Text>
		</View>
	);
}

export default Track;