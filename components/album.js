import React, { Component } from 'react';
import { ActivityIndicator, View, Text, StyleSheet, Image } from "react-native";
import Track from "./track";
import PlImage from '../src/img/album_cover_def.jpg';

export default class Album extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            album: {
                name: '',
                artist:'',
                release_date:0,
                tracks:[],
                image: PlImage
            },
            isLoading:false 
        }
    }
    componentDidMount() {
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
                        image:data.images[1]
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
        const { isLoading, album, error } = this.state;
        if (error) {
            return (
                <View>
                    <Text>Fetch aint happening {error.message}</Text>
                </View>
            )
        }
        if (!isLoading) {
            return (
                <View style={{ flex: 1}}>
                    <Image source={{ uri: album.image.url}} style={textStyles.centerImage}/>
                    <Text style={{textAlign: 'center', color:'#fff', marginTop:10}}> {album.name}</Text>
                    <Text style={textStyles.centerText}> {album.release_date} </Text>
                    {album.tracks.map((item) => <Track key={item.track_number} name={item.name} style={textStyles.centerText}/>)}
                </View>       
            )
        } 
        return (
            <View style={{ flex: 1, padding: 20 }}>
                <ActivityIndicator />
            </View>
        )
    }
}
const textStyles = StyleSheet.create({
    centerText: {
        textAlign: 'center',
        color:'#ccc',
    },
    centerImage: {
        width:300,
        height:300
    }
});
