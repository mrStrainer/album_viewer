import Reactotron from 'reactotron-react-native'
//import { reactotronRedux } from 'reactotron-redux'

Reactotron
  .configure({
  	name: 'Album Viewer'
  }) 
  .useReactNative() // add all built-in react native plugins
  //.use(reactotronRedux()) 
  .connect() 