import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createPost} from '../actions';

class PostNew extends Component{

    renderField(field){
        const {meta: {touched, error}} = field;
        const className = `form-group ${touched && error ? 'has-danger': ''}`;

        return (
            <div className={className}>
                <label htmlFor={field.name}>{field.label}</label>
                <input className="form-control" type={field.type}
                    {...field.input}
                />
                <div className="text-help">
                    {field.meta.touched ? field.meta.error: ''}
                </div>
            </div>
        );
    }

    onSubmit = (values) => {
        this.props.createPost(values, () => {
            this.props.history.push('/');
        });
    }

    render(){
        const {handleSubmit} = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Title"
                    type="text"
                    name="title"
                    component={this.renderField}
                />
                <Field
                    label="Categories"
                    type="text"
                    name="categories"
                    component={this.renderField}
                />
                <Field
                    label="Post Content"
                    type="text-area"
                    name="content"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
                <Link to="/posts" className="btn btn-danger">
                    Cancel
                </Link>
            </form>
        );
    }
}

/**
 * Si se devuelve un objeto vacio la validacion es correcta
 * y se hace submit. En otro caso se incluye en el objeto errors
 * como propiedad el campo que causo el error y como valor
 * el mensaje de error.
 * @param values
 */
function validate(values){
    const errors = {};
    if(!values.title){
        errors.title = 'This field is required!';
    }
    if(!values.categories){
        errors.categories = 'Enter some categories';
    }
    if(!values.content){
        errors.content = 'Content is required';
    }
    return errors;
}

export default reduxForm({
    validate,
    form: 'PostsNewForm'
})(
    connect(null,{createPost})(PostNew)
);