import axios from 'axios';

const FETCH_POSTS = 'FETCH_POSTS';
const FETCH_ONE_POST = 'FETCH_ONE_POST';
const CREATE_POST = 'CREATE_POST';
const DELETE_POST = 'DELETE_POST';
const ROOT_URL= 'http://reduxblog.herokuapp.com/api';
const API_KEY = '?key=ELTIOLABARA123';

function fetchPosts(){
    const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);
    return {
        type: FETCH_POSTS,
        payload: request
    };
}

function fetchOnePost(postId){
    const request = axios.get(`${ROOT_URL}/posts/${postId}${API_KEY}`);
    return {
        type: FETCH_ONE_POST,
        payload: request
    };
}

function createPost(post, callback){
    const request = axios.post(`${ROOT_URL}/posts${API_KEY}`,post)
        .then(()=> callback());
    return {
        type: CREATE_POST,
        payload: request
    };
}

function deletePost(postId, callback){
    const request = axios.delete(`${ROOT_URL}/posts/${postId}${API_KEY}`)
        .then(()=> callback());
    return {
        type: DELETE_POST,
        payload: postId
    };
}

export {ROOT_URL, FETCH_POSTS, FETCH_ONE_POST, CREATE_POST, DELETE_POST, fetchOnePost, fetchPosts, createPost, deletePost};
