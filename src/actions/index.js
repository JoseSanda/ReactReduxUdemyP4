import axios from 'axios';
import firebase from 'firebase';

const FETCH_POSTS = 'FETCH_POSTS';
const FETCH_POSTS_FIREBASE = 'FETCH_POSTS_FIREBASE';
const FETCH_ONE_POST = 'FETCH_ONE_POST';
const CREATE_POST = 'CREATE_POST';
const DELETE_POST = 'DELETE_POST';
const ROOT_URL= 'http://reduxblog.herokuapp.com/api';
const API_KEY = '?key=ELTIOLABARA123';

//Configuracion firebase
const config = {
    apiKey: "ENTER API KEY HERE",
    authDomain: "ENTER API DOMAIN",
    databaseURL: "ENTER DATABASE URL",
    projectId: "ENTER PROJECT ID",
    storageBucket: "ENTER STORAGE",
    messagingSenderId: "ENTER SENDER ID"
};
firebase.initializeApp(config);

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
    axios.delete(`${ROOT_URL}/posts/${postId}${API_KEY}`)
        .then(()=> callback());
    return {
        type: DELETE_POST,
        payload: postId
    };
}

function getPosts(posts){
    console.log(posts);
    return {
        type: FETCH_POSTS_FIREBASE,
        payload: posts
    };
}

function gettingPosts(){
    return {
        type: FETCH_POSTS_FIREBASE
    };
}

function fetchPostsFromFirebase(){
    return dispatch => {
        dispatch(gettingPosts());
        return firebase.database().ref().child("posts").once("value", snapshot => {
            const posts = snapshot.val();
            dispatch(getPosts(posts));
        }).catch((error) => {
            console.log(error);
            dispatch(gettingPosts());
        });
    };
};

export {ROOT_URL, FETCH_POSTS, FETCH_ONE_POST, CREATE_POST, DELETE_POST,FETCH_POSTS_FIREBASE, fetchOnePost, fetchPostsFromFirebase, createPost, deletePost};

