import React from 'react';
import { Text, View, ActivityIndicator } from 'react-native'
import { withRouter } from 'react-router'
import SearchItem from './SearchItem'
import StyledInput from './StyledInput'
import { searchAlbum, createOptions } from './helpers/Api'

const SearchInput = ({ onChangeText, onSubmitEditing }) => { 
	return (
  		<View style={{flex:1,alignItems:'center'}}>
  			<StyledInput placeholder='Search...' onChangeText={onChangeText} onSubmitEditing={onSubmitEditing}/>
  		</View>
  	);
}

class Search extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			searchQ:null,
			results:[],
			isLoading:false,
		}
	}

	StartSearch = () => {
		this.setState({isLoading:true});

		return searchAlbum(this.state.searchQ, createOptions({ method: 'GET', token:this.props.token}))
			.then(results => {
				const albums = results.albums.items.map(item => {
					const album = { 
						name:item.name,
						artist:item.artists[0].name,
						id:item.id,
						image:item.images[2]
					};
					return album;
				});
				return albums;
			}).then(albums => 
				this.setState({
					...this.state,
					results:albums,
					isLoading:false,
				})
			).catch(error => console.log(`Search didnt go through: ${error}`));
	}
	RenderItems = () => {
		const { results } = this.state;
		if (results.length > 0) 
			return results.map(
				(album,i) => <SearchItem key={album.id} id={album.id} url={album.image.url} name={album.name} artist={album.artist} last={i === results.length-1 ? true : false}/>
			)
		return <Text style={{color:'#ccc'}}>Search for something</Text>
	}
	render() {
		const { album, isLoading } = this.state;
		if (!isLoading) {
			return (
				<View style={{ flex: 1, alignSelf: 'stretch', backgroundColor:'#181818'}}>
					<SearchInput onChangeText={(text) => this.setState({searchQ:text})} onSubmitEditing={this.StartSearch}/>

					<View style={{flex:1, padding:10, flexDirection: 'column'}}>
						{this.RenderItems()}
	                </View>
				</View>
			);
		}
		return (
            <View style={{ flex: 1, padding: 20 }}>
                <ActivityIndicator />
            </View>
		)
	}
}
export default Search;