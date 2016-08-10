/**
 *
 *
 * @update: 16/6/12
 * @author: zhangdan
 *
 */
var CommentForm = React.createClass({
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
            <form className="commentForm ui form" id="commentForm" onSubmit={this.handleSubmit}>
                <input type="hidden" value={d.img} ref="img"/>
                <input type="hidden" value={d.name} ref="name"/>
                <div className="field">
                    <input type="text" ref="text"/>
                </div>
                <div className="field">
                    <input type="submit" className="postButton" value="Post !"/>
                </div>
                <div className="field"></div>
            </form>
        );
    }
});

module.exports = CommentForm;