import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import PostIndex from './components/post_index';
import Post from './components/post';
import PostNew from './components/post_new';
import promiseMiddleware from 'redux-promise';
import reducers from './reducers';
import thunk from 'redux-thunk';

ReactDOM.render(
  <Provider store={createStore(reducers, applyMiddleware(promiseMiddleware, thunk))}>
    <BrowserRouter>
        <div>
            <Switch>
                <Route exact path="/posts/new" component={PostNew} />
                <Route path="/posts/:id" component={Post} />
                <Route path="/" component={PostIndex} />
            </Switch>
        </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));

