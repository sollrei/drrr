/**
 *
 *
 * @update: 16/6/12
 * @author: zhangdan
 *
 */


var messageData = [],
    Comment = require('./comment'),
    CommentForm = require('./commentForm'),
    CommentList = require('./commentList');

var CommentBox = React.createClass({

    getInitialState: function () {
        return {data: [], count: 0}
    },

    handleCommentSubmit: function (data) {
        this.websocket.send(JSON.stringify(data));
    },

    changeState: function () {
        this.setState({data: messageData});
    },

    componentDidMount: function () {

        var websocket,
            self = this;

        var localData = JSON.parse(localStorage.userinfo);

        function wss(data) {

            var  wsServer = 'ws://127.0.0.1:8020';
            websocket = new WebSocket(wsServer);

            websocket.onopen = function (evt) {
                websocket.send(data);
            };

            websocket.onclose = function (evt) {
                alert("Disconnected");
            };

            websocket.onmessage = function (evt) {
                /*messageData.unshift(JSON.parse(evt.data));
                 self.setState({data: messageData});*/
                var doc = document.createElement('div'),
                    item = JSON.parse(evt.data);

                if (item.count) {
                    self.setState({count: item.count});
                }

                var section = React.render(
                    <Comment data={item} >
                        {item.text}
                    </Comment>,
                    doc
                );
                $(section.getDOMNode()).prependTo('.commentList');

                setTimeout(function () {
                    $('.commentContent').eq(0).addClass('animate');
                }, 10);


                document.getElementById('sound').play();
            };

            websocket.onerror = function (evt) { console.log('Error occured: ' + evt.data); };

            self.websocket = websocket;

        }

        wss(JSON.stringify({
            text: localData.data.name + ' が入室しました。',
            name: localData.data.name,
            img: localData.data.img,
            single: true
        }));

    },

    render: function () {
        return (
            <section className="commentBox">
                <div className="topWrapper">
                    <div className="ui page grid">
                        <div className="eight wide column">
                            <i className="icon users"></i>
                            <span>({this.state.count})</span>
                        </div>
                        <div className="right aligned eight wide column">
                            <a href="#" id="J_signOut" ><i className="icon sign out"></i></a>
                        </div>
                        <div className="sixteen wide column">
                            <CommentForm data={this.props.data} onCommentSubmit={this.handleCommentSubmit}/>
                        </div>
                    </div>
                </div>
                <div className="ui page grid">
                    <CommentList data={this.state.data}/>
                </div>
            </section>
        )
    }
});

module.exports = CommentBox;