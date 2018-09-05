import _ from 'lodash';
import React, {Component} from 'react';
import  {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchPosts} from "../actions";

class PostIndex extends Component {
    componentDidMount() {
        this.props.fetchPosts();
    }
    renderPost(){
        return _.map(this.props.posts, post => {
            const postURL = `posts/${post.id}`;
            return (
                <li key={post.id} className="list-group-item">
                    <h2>{post.title}</h2>
                    <p>a
                        {post.content.substring(0,20)}
                        <br/>
                        <a href={postURL} className="link">Ver post</a>
                    </p>
                </li>
            );
        })
    }

    render(){
        console.log('Did mount: '+this.props.posts);
        return (
            <div>
                <ul className="list-group">
                    {this.renderPost()}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {posts: state.posts};
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchPosts}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(PostIndex);