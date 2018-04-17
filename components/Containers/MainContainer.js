import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { login, logout } from '../../actions/'
import Search from '../Search' 

function mapStateToProps(state) {
	return {
		login:state.login
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({login, logout}, dispatch);
}

const SearchContainer = connect(mapStateToProps,mapDispatchToProps)(Search);
export default SearchContainer;