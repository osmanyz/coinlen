/**
 * Coinlen
 */
import React from 'react';
import ReactDOM from 'react-dom';
import './assets/style.scss';
import App from './pages/App';
import 'moment-timezone';
// you can import your localization
// import 'moment/locale/tr';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('coinlen-app'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
