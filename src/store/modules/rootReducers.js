import { combineReducers } from 'redux';
import { loggedInProfile } from './login/reducer';
import {favorite} from  "./favorite/reducer";
import {cart} from './cart/reducer';
import {total} from "./total/reducer"
import { sellerProducts } from './products/reducer';

export default combineReducers({ loggedInProfile, favorite,cart,total,sellerProducts});