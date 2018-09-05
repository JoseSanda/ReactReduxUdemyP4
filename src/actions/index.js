import axios from 'axios';

const FETCH_POSTS = 'FETCH_POSTS';
const ROOT_URL= 'http://reduxblog.herokuapp.com/api';
const API_KEY = '?key=ELTIOLABARA123';

function fetchPosts(){
    const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);
    return {
        type: FETCH_POSTS,
        payload: request
    };
}

export {ROOT_URL, FETCH_POSTS, fetchPosts};