/**
 *
 *
 * @update: 16/6/12
 * @author: zhangdan
 *
 */

var Comment = require('./comment');

var CommentList = React.createClass({
    render: function () {
        var commentNodes = this.props.data.map(function (item, index, array) {
            return (
                <Comment data={item} >
                    {item.text}
                </Comment>
            )
        });
        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
});

module.exports = CommentList;