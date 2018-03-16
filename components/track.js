import React,{ Component } from "react";
import { Text, View } from 'react-native';

export default class Track extends React.Component {
    render() {
        return (
            <Text key={this.props.tracknr} style={{color:'#fff', padding:2,}}> {this.props.name} </Text>
        )
    }
}