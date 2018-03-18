import React, { Component } from 'react';
import { ActivityIndicator, View, StyleSheet } from "react-native";
import Track from "./track";
import FetchError from "./fetchError";
import AlbumHeader from "./albumHeader";
import Placeholder_img from '../src/img/album_cover_def.jpg';


export default class Album extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            album: {
                name: '',
                artist:'',
                release_date:0,
                tracks:[],
                image: Placeholder_img
            },
            isLoading:false 
        }
    }
    componentDidMount() {
        this.setState({isLoading:true})
        this.getAlbum();
    }

    //refactor for type and id
    getAlbum() {
        return fetch('http://localhost:8080/v1/albums/')
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
            .catch(error => console.log(`Error: ${error}`));
    }

    render() {
        const { isLoading, album, error } = this.state;
        if (error) {
            return <FetchError />
        }
        if (!isLoading) {
            return (
                <View style={{ flex: 1}}>
                    <AlbumHeader url={album.image.url} name={album.name} release_date={album.release_date}/>
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
    }
});
