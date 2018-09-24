import _ from 'lodash';
import React, {Component} from 'react';
import  {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchPosts} from "../actions";
import {Link} from 'react-router-dom';

class PostIndex extends Component {
    componentDidMount() {
        this.props.fetchPostsFromFirebase();
    }
    renderPost(){
        return _.map(this.props.posts, post => {
            if(post){
                const postURL = `/posts/${post.id}`;
                return (
                    <li key={post.id} className="list-group-item">
                        <h2>{post.title}</h2>
                        <p>
                            {post.content.substring(0,20)}...
                            <br/>
                            <a href={postURL} className="link">Ver post</a>
                        </p>
                    </li>
                );
            }
        })
    }

    render(){
        return (
            <div className="container-fluid">
                <div className="row flex-xl-nowrap">
                    <ul className="nav justify-content-end">
                        <li className="nav-item">
                            <Link className="nav-link active btn btn-primary" to="/posts/new">Add new post</Link>
                        </li>
                    </ul>
                    <h2>Posts</h2>
                    <ul className="list-group">
                        {this.renderPost()}
                    </ul>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {posts: state.posts};
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchPostsFromFirebase: fetchPosts}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(PostIndex);