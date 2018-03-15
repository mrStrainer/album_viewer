import React, { Component } from 'react';
import { ActivityIndicator, View, Text, StyleSheet } from "react-native";
import Track from "./track";

export default class Album extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            album: {
                name: '',
                artist:'',
                release_date:0,
                tracks:[],
            },
            isLoading:false 
        }
    }
    componentWillMount() {
        this.setState({isLoading:true})
        fetch('http://localhost:8080/v1/albums/')
            .then(response => response.json())
            .then(
                (data) => {
                    this.setState({ album: {
                        name:data.name,
                        artist:data.artists[0].name,
                        release_date:data.release_date,
                        tracks:data.tracks.items,
                    }, isLoading: false })
                },
                (error) => {
                    console.log(`Fetch error: ${error}`);
                    this.setState({ isLoading:false, error });
                }
            )
            .catch(error => console.log(`Error ${error}`))
    }
    render() {
        const { isLoading, album, tracks, error } = this.state;
        if (error) {
            return (
                <View>
                    <Text>Fetch aint happening </Text>
                </View>
            )
        }
        if (!isLoading) {
            const albumTrack = this.state.album.tracks;
            return (
                <View>
                    <Text> {album.name}</Text>
                    <Text style={textStyles.centerText}> {album.release_date} </Text>
                    {albumTrack.map((item) => <Track key={item.track_number} name={item.name} style={textStyles.centerText}/>)}
                </View>       
            )
        } else {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator />
                </View>
            )
        }
        
    }
}
const textStyles = StyleSheet.create({
    centerText: {
        textAlign: 'center',
        color:'#ccc',
    },
});
