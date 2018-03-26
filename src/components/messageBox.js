import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Message from './message';
import MessageForm from './messageForm';
import MessageList from './messageList';


class MessageBox extends Component {

    webSocket;

    constructor () {
        super();

        this.state = {
            data: [],
            count: 0
        }
    }

    handleCommentSubmit = (data) => {
        this.webSocket.send(JSON.stringify(data));
    };

    wss (data) {
        const admin = window.location.hostname;
        const wsServer = `ws://${admin}:8020`;
        const webSocket = new WebSocket(wsServer);

        this.webSocket = webSocket;


        webSocket.onopen = (evt) => {
            webSocket.send(data);
        };

        webSocket.onclose = (evt) => {
            alert('断开连接');
        };

        webSocket.onmessage = (evt) => {

            const item = JSON.parse(evt.data);

            if (item.count) {
                this.setState({
                    count: item.count
                })
            }

            const data = this.state.data;
            data.unshift(item);

            this.setState({
                data: data
            });

            document.getElementById('sound').play();

        };

        webSocket.onerror = (evt) => { console.log('Error occured: ' + evt.data); };

    }

    componentDidMount () {


        let localData = JSON.parse(window.localStorage.userinfo);


        this.wss(JSON.stringify({
            text: localData.data.name + ' が入室しました。',
            name: localData.data.name,
            img: localData.data.img,
            single: true
        }))


    }

    logOut () {
        window.localStorage.removeItem('userinfo');
        window.location.reload();
    }


    render () {
        return (
            <section className="commentBox">
                <div className="topWrapper">
                    <div className="ui page grid">
                        <div className="eight wide column">
                            <i className="icon users" />
                            <span>({this.state.count})</span>
                        </div>
                        <div className="right aligned eight wide column">
                            <a id="J_signOut" onClick={this.logOut}><i className="icon sign out" /></a>
                        </div>
                        <div className="sixteen wide column">
                            <MessageForm data={this.props.data} onCommentSubmit={this.handleCommentSubmit}/>
                        </div>
                    </div>
                </div>
                <div className="ui page grid">
                    <MessageList data={this.state.data}/>
                </div>
            </section>
        )
    }


}

export default MessageBox;