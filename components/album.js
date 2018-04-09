import React, { Component } from 'react';
import { ActivityIndicator, View } from "react-native";
import Track from "./Track";
import FetchError from "./fetchError";
import AlbumHeader from "./albumHeader";
import Placeholder_img from '../src/img/album_cover_def.jpg';
import { fetchAlbum, createOptions } from './helpers/Api'

export default class Album extends React.Component {
    constructor(props) {
        super(props)

        this.state = { 
            albumId: '67smHJOf5YlFwad6dAlppm',//this.props.match.id,
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
        fetchAlbum(this.state.albumId, createOptions({ method: 'GET', token:this.props.token}))
            .then(album =>{
                this.setState({
                    ...this.state,
                    album: {
                        name: album.name,
                        artist:album.artists[0].name,
                        release_date:album.release_date,
                        tracks:album.tracks.items,
                        image:album.images[1]
                    }, 
                    isLoading:false
                });
            })
    }


    render() {
        const { isLoading, album } = this.state;


        if (!isLoading) {
            return (
                <View style={{ flex: 1, alignSelf: 'stretch', backgroundColor:'#181818'}}>
                    <AlbumHeader url={album.image.url} name={album.name} release_date={album.artist}/>
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
