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
            return {...state, [action.payload.data.id]: action.payload.data};
        case FETCH_POSTS:
            return _.mapKeys(action.payload.data, 'id');
        case FETCH_POSTS_FIREBASE:
            if(action.payload) {
                return _.mapKeys(action.payload, 'id');
            }else{
                return state;
            }
        default:
            return state;
    }
}