import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { searchAlbum } from '../../actions/'
import Search from '../Search' 

function mapStateToProps(state) {
	return {
		login:state.login,
		currentSearch:state.currentSearch
	}
}

// function mapDispatchToProps(dispatch) {
// 	//console.log(actions);
// 	return bindActionCreators({searchAlbum}, dispatch);
// }

const SearchContainer = connect(mapStateToProps/*,mapDispatchToProps*/)(Search);
export default SearchContainer;