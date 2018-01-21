import { combineReducers } from 'redux';

import basket from './basket'
import goodsTotal from './goods'

export default combineReducers({
  basket,
  goodsTotal
})