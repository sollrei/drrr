import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import MessageBox from './components/messageBox';


const messageContainer = document.getElementById('comment-container');

if (window.localStorage.userinfo) {

    const localData = JSON.parse(localStorage.userinfo);
    ReactDOM.render(
        <MessageBox data={localData}/>,
        messageContainer
    );

} else {
    ReactDOM.render(
        <App />,
        document.getElementById('userSet')
    );

}

registerServiceWorker();
