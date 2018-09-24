import firebase from 'firebase/app';
import 'firebase/database';
import config from '../config_firebase';

const FETCH_POSTS = 'FETCH_POSTS';
const FETCH_ONE_POST = 'FETCH_ONE_POST';
const CREATE_POST = 'CREATE_POST';
const DELETE_POST = 'DELETE_POST';

//Configuracion firebase
firebase.initializeApp(config);

function getPost(post){
    return {
        type: FETCH_ONE_POST,
        payload: post
    };
}

function fetchOnePost(postId){
    return dispatch => {
        dispatch(getPost());
        return firebase.database().ref().child(`posts/${postId}`).once("value", snapshot => {
            const post = snapshot.val();
            console.log(post);
            dispatch(getPost(post));
        }).catch((error) => {
            console.log(error);
            dispatch(getPost());
        });
    };
}

function createPost(post, callback){
    let newPost = firebase.database().ref().child(`posts`).push();
    newPost.set({...post,"id":newPost.key}).then(callback());
    return {
        type: CREATE_POST
    };
}

function deletePost(postId, callback){
    firebase.database().ref().child(`posts/${postId}`).remove().then(callback());
    return {
        type: DELETE_POST,
        payload: postId
    };
}

function getPosts(posts){
    return {
        type: FETCH_POSTS,
        payload: posts
    };
}

function fetchPosts(){
    return dispatch => {
        dispatch(getPosts());
        return firebase.database().ref().child("posts").once("value", snapshot => {
            const posts = snapshot.val();
            dispatch(getPosts(posts));
        }).catch((error) => {
            console.log(error);
            dispatch(getPosts());
        });
    };
}

export {FETCH_POSTS, FETCH_ONE_POST, CREATE_POST, DELETE_POST,fetchOnePost, fetchPosts, createPost, deletePost};

