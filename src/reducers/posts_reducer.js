import _ from 'lodash';
import {DELETE_POST, FETCH_ONE_POST, FETCH_POSTS, FETCH_POSTS_FIREBASE} from "../actions";

export default function(state={}, action){
    switch (action.type) {
        case DELETE_POST:
            return _.omit(state, action.payload);
        case FETCH_ONE_POST:
            //ES5
            // const post = action.payload.data;
            // const newState = {...state};
            // newState[post.id] = post;
            // return newState;
            //ES6
            if(action.payload){
                return {...state, [action.payload.id]: action.payload};
            }else{
                return state;
            }
        case FETCH_POSTS:
            if(action.payload) {
                return _.mapKeys(action.payload, 'id');
            }else{
                return state;
            }
        default:
            return state;
    }
}