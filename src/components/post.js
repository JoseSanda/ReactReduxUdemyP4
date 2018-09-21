import React, {Component} from 'react';
import {fetchOnePost} from '../actions';
import {deletePost} from '../actions';
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class Post extends Component {

    componentDidMount(){
        if(!this.props.post) {
            this.props.fetchOnePost(this.props.match.params.id);
        }
    }

    onDeleteClick(){
        const {id} = this.props.match.params;
        this.props.deletePost(id, ()=>{
            this.props.history.push('/');
        });
    }

    render (){
        const {post} = this.props;
        if (!post){
            return <div>Loading post...</div>
        }
        return (
            <div>
                <Link to="/" className="btn btn-link">Back to posts</Link>
                <button
                    className="btn btn-danger pull-xs-right"
                    onClick={this.onDeleteClick.bind(this)}
                >
                    Delete post
                </button>
                <h1>
                    {post.title}
                </h1>
                <div>
                    {post.content}
                </div>
                <div>
                        <span className="badge badge-secondary">
                            {post.categories}
                        </span>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps){
    return {post: state.posts[ownProps.match.params.id]};
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchOnePost, deletePost}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Post);