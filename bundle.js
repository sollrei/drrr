webpackJsonp([0,1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Date: 2015/5/21
	 * Update: 2015/5/21
	 */
	$(document).ready(function () {
	    /*
	     * - Box
	     *     - Form
	     *     - List
	     *         - Comment
	     */


	    var CommentBox = __webpack_require__(1);

	    /*
	     * user avater ui
	     * */

	    var AvatarItem = React.createClass({displayName: "AvatarItem",
	        render: function () {
	            return (
	                React.createElement("span", null, 
	                    React.createElement("input", {type: "radio", name: "avatarimg", value: this.props.number, id: this.props.number}), React.createElement("label", {htmlFor: this.props.number}, React.createElement("img", {src: this.props.src, alt: "avatar"}))
	                )
	            )
	        }
	    });

	    var AvatarSet = React.createClass({displayName: "AvatarSet",
	        getInitialState: function () {
	            return {
	                data: {
	                    img: '',
	                    name: ''
	                }
	            };
	        },
	        handleSubmit: function (e) {
	            e.preventDefault();

	            var name = React.findDOMNode(this.refs.user).value.trim(),
	                radio = $('input[name="avatarimg"]:checked');

	            if (!name) {
	                alert('Please enter your name');
	                return ;
	            }

	            this.state.data.name = name;
	            this.state.data.img = radio.val();

	            localStorage.userinfo = JSON.stringify(this.state);
	            location.reload();
	        },
	        render: function () {

	            var list = [];
	            for (var i = 2; i < 17; i += 1) {
	                var number = 'a' + i,
	                    src = './img/' + number + '.png';
	                list.push(React.createElement(AvatarItem, {number: number, src: src}))
	            }
	            return (
	                React.createElement("div", {className: "ui page grid"}, 
	                    React.createElement("div", {className: "column enterWrapper"}, 
	                        React.createElement("div", {className: "circleOuter"}, 
	                            React.createElement("div", {className: "circleInner"})
	                        ), 
	                        React.createElement("form", {className: "ui form avatarForm", onSubmit: this.handleSubmit, autocomplate: "off"}, 
	                            React.createElement("div", {className: "field avatarImages"}, 
	                                React.createElement("p", null, React.createElement("label", null, "Choose your avatar:")), 
	                                React.createElement("input", {type: "radio", name: "avatarimg", value: "a1", id: "a1", defaultChecked: true}), React.createElement("label", {htmlFor: "a1"}, React.createElement("img", {src: "./img/a1.png", alt: "avatar"})), 
	                                list
	                            ), 
	                            React.createElement("div", {className: "inline field"}, 
	                                React.createElement("label", null, "USERNAME "), 
	                                React.createElement("input", {type: "text", name: "user", id: "enterInput", ref: "user"})
	                            ), 
	                            React.createElement("div", {className: "field"}, 
	                                React.createElement("input", {type: "submit", value: "ENTER", className: "enterButton"})
	                            )
	                        )
	                    )
	                )
	            )
	        }
	    });

	    var container = document.getElementById('table-container'),
	        commentContainer = document.getElementById('comment-container');

	    if (container) {
	        React.render(
	            React.createElement(TableApp, {url: ajaxUrl}),
	            document.getElementById('table-container')
	        );
	    }

	    if (commentContainer) {

	        if (window.localStorage.userinfo) {

	            var localData = JSON.parse(localStorage.userinfo);
	            React.render(
	                React.createElement(CommentBox, {data: localData}),
	                commentContainer
	            );

	        } else {
	            React.render(
	                React.createElement(AvatarSet, null),
	                document.getElementById('userSet')
	            );

	        }
	    }


	    $('#J_signOut').on('click', function (e) {
	        e.preventDefault();
	        localStorage.removeItem("userinfo");
	        location.reload();
	    });

	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 *
	 *
	 * @update: 16/6/12
	 * @author: zhangdan
	 *
	 */


	var messageData = [],
	    Comment = __webpack_require__(2),
	    CommentForm = __webpack_require__(3),
	    CommentList = __webpack_require__(4);

	var CommentBox = React.createClass({displayName: "CommentBox",

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
	                    React.createElement(Comment, {data: item}, 
	                        item.text
	                    ),
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
	            React.createElement("section", {className: "commentBox"}, 
	                React.createElement("div", {className: "topWrapper"}, 
	                    React.createElement("div", {className: "ui page grid"}, 
	                        React.createElement("div", {className: "eight wide column"}, 
	                            React.createElement("i", {className: "icon users"}), 
	                            React.createElement("span", null, "(", this.state.count, ")")
	                        ), 
	                        React.createElement("div", {className: "right aligned eight wide column"}, 
	                            React.createElement("a", {href: "#", id: "J_signOut"}, React.createElement("i", {className: "icon sign out"}))
	                        ), 
	                        React.createElement("div", {className: "sixteen wide column"}, 
	                            React.createElement(CommentForm, {data: this.props.data, onCommentSubmit: this.handleCommentSubmit})
	                        )
	                    )
	                ), 
	                React.createElement("div", {className: "ui page grid"}, 
	                    React.createElement(CommentList, {data: this.state.data})
	                )
	            )
	        )
	    }
	});

	module.exports = CommentBox;

/***/ },
/* 2 */
/***/ function(module, exports) {

	/**
	 *
	 *
	 * @update: 16/6/12
	 * @author: zhangdan
	 *
	 */
	var Comment = React.createClass({displayName: "Comment",
	    render: function () {
	        var img = './img/' + this.props.data.img + '.png',
	            className = 'comment ui grid ' + 'avatar_' + this.props.data.img;

	        if (this.props.data.single) {
	            className += ' commentTip';
	        }
	        return (
	            React.createElement("section", {className: className}, 
	                React.createElement("div", {className: "ui column"}, 
	                    React.createElement("div", {className: "commentMain"}, 
	                        React.createElement("h3", {className: "commentAvatar"}, 
	                            React.createElement("img", {src: img, alt: "avatar"}), 
	                            React.createElement("p", null, this.props.data.name)
	                        ), 
	                        React.createElement("div", {className: "commentContent"}, this.props.children.toString())
	                    )
	                )
	            )
	        );
	    }
	});

	module.exports = Comment;

/***/ },
/* 3 */
/***/ function(module, exports) {

	/**
	 *
	 *
	 * @update: 16/6/12
	 * @author: zhangdan
	 *
	 */
	var CommentForm = React.createClass({displayName: "CommentForm",
	    handleSubmit: function (e) {
	        e.preventDefault();

	        var text = React.findDOMNode(this.refs.text).value.trim(),
	            name = React.findDOMNode(this.refs.name).value.trim(),
	            img = React.findDOMNode(this.refs.img).value.trim();

	        if (!text) return;

	        this.props.onCommentSubmit({img: img, text: text, name: name});
	        React.findDOMNode(this.refs.text).value = '';

	    },
	    render: function () {
	        var d = this.props.data.data;

	        return (
	            React.createElement("form", {className: "commentForm ui form", id: "commentForm", onSubmit: this.handleSubmit}, 
	                React.createElement("input", {type: "hidden", value: d.img, ref: "img"}), 
	                React.createElement("input", {type: "hidden", value: d.name, ref: "name"}), 
	                React.createElement("div", {className: "field"}, 
	                    React.createElement("input", {type: "text", ref: "text"})
	                ), 
	                React.createElement("div", {className: "field"}, 
	                    React.createElement("input", {type: "submit", className: "postButton", value: "Post !"})
	                ), 
	                React.createElement("div", {className: "field"})
	            )
	        );
	    }
	});

	module.exports = CommentForm;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 *
	 *
	 * @update: 16/6/12
	 * @author: zhangdan
	 *
	 */

	var Comment = __webpack_require__(2);

	var CommentList = React.createClass({displayName: "CommentList",
	    render: function () {
	        var commentNodes = this.props.data.map(function (item, index, array) {
	            return (
	                React.createElement(Comment, {data: item}, 
	                    item.text
	                )
	            )
	        });
	        return (
	            React.createElement("div", {className: "commentList"}, 
	                commentNodes
	            )
	        );
	    }
	});

	module.exports = CommentList;

/***/ }
]);