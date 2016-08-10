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


    var CommentBox = require('./component/commentBox');

    /*
     * user avater ui
     * */

    var AvatarItem = React.createClass({
        render: function () {
            return (
                <span>
                    <input type="radio" name="avatarimg" value={this.props.number} id={this.props.number}/><label htmlFor={this.props.number}><img src={this.props.src} alt="avatar"/></label>
                </span>
            )
        }
    });

    var AvatarSet = React.createClass({
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
                list.push(<AvatarItem number={number} src={src} />)
            }
            return (
                <div className="ui page grid">
                    <div className="column enterWrapper">
                        <div className="circleOuter">
                            <div className="circleInner"></div>
                        </div>
                        <form className="ui form avatarForm" onSubmit={this.handleSubmit} autocomplate="off">
                            <div className="field avatarImages">
                                <p><label>Choose your avatar:</label></p>
                                <input type="radio" name="avatarimg" value="a1" id="a1" defaultChecked/><label htmlFor="a1"><img src="./img/a1.png" alt="avatar"/></label>
                                {list}
                            </div>
                            <div className="inline field">
                                <label>USERNAME </label>
                                <input type="text" name="user" id="enterInput" ref="user"/>
                            </div>
                            <div className="field">
                                <input type="submit" value="ENTER" className="enterButton"/>
                            </div>
                        </form>
                    </div>
                </div>
            )
        }
    });

    var container = document.getElementById('table-container'),
        commentContainer = document.getElementById('comment-container');

    if (container) {
        React.render(
            <TableApp url={ajaxUrl}/>,
            document.getElementById('table-container')
        );
    }

    if (commentContainer) {

        if (window.localStorage.userinfo) {

            var localData = JSON.parse(localStorage.userinfo);
            React.render(
                <CommentBox data={localData}/>,
                commentContainer
            );

        } else {
            React.render(
                <AvatarSet />,
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
