import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import NewsStore from './store/NewsStore';

// The whole App will be subscribed to NewsStore when wrapped with NewsStore
ReactDOM.render(
<NewsStore>
    <App />
</NewsStore>,
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
