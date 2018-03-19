import React, { Component } from 'react';
import { ActivityIndicator, View } from "react-native";
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
        this.setState({isLoading:true});

        this.getAlbum().then(this.getAlbumTracks());
        //this.getAlbumTracks();
    }

    getAlbum(id = 0) {
        return fetch(`http://192.168.0.31:8080/v1/albums/${id}`)
            .then(response => response.json())
            .then(
                (data) => {
                    this.setState({ album: {
                        ...this.state.album,
                        name:data.name,
                        artist:data.artists[0].name,
                        release_date:data.release_date,
                        image:data.images[1]
                    }, isLoading: false })
                },
                (error) => {
                    console.error(`\nFetch error: ${error}\n No Album info`);
                    this.setState({ isLoading:false, error });
                }
            )
            .catch(error => console.error(`\nError: ${error}\n getAlbum fetch`));
    }

    getAlbumTracks(id = 0) {
        return fetch(`http://192.168.0.31:8080/v1/albums/${id}/tracks/`)
            .then(response => response.json())
            .then(
                (data) => {
                    this.setState({ album: {
                        ...this.state.album,
                        tracks:data.items,
                    }, isLoading: false })
                },
                (error) => {
                    console.error(`\nFetch error: ${error}\n No tracks`);
                    this.setState({ isLoading:false, error });
                }
            )
            .catch(error => console.error(`\nError: ${error}\n getAlbumTracks fetch`));
    }

    render() {
        const { isLoading, album, error } = this.state;

        {error && <FetchError />}

        if (!isLoading) {
            return (
                <View style={{ flex: 1, alignSelf: 'stretch'}}>
                    <AlbumHeader url={album.image.url} name={album.name} release_date={album.release_date}/>
                    <View style={{flex:1, padding:15, flexDirection: 'column'}}>
                        {album.tracks.map((item, i) => <Track key={item.track_number} tracknr={item.track_number}  duration={item.duration_ms} name={item.name} last={i === album.tracks.length-1 ? true : false}/>)}
                    </View>
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
