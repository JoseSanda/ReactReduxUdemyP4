import React, {Component} from 'react';
import  {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchPosts} from "../actions";

class PostIndex extends Component {

    componentDidMount(){
        this.props.fetchPosts();
    }

    render(){
        return (
            <div>
                Post index!
            </div>
        );
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchPosts}, dispatch);
}

export default connect(null,mapDispatchToProps)(PostIndex);