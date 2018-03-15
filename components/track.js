import React,{ Component } from "react";
import { Text, View } from 'react-native';

export default class Track extends React.Component {
    render() {
        return (
            <Text key={this.props.tracknr}> {this.props.name} </Text>
        )
    }
}