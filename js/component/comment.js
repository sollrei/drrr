/**
 *
 *
 * @update: 16/6/12
 * @author: zhangdan
 *
 */
var Comment = React.createClass({
    render: function () {
        var img = './img/' + this.props.data.img + '.png',
            className = 'comment ui grid ' + 'avatar_' + this.props.data.img;

        if (this.props.data.single) {
            className += ' commentTip';
        }
        return (
            <section className={className}>
                <div className="ui column">
                    <div className="commentMain">
                        <h3 className="commentAvatar">
                            <img src={img} alt="avatar"/>
                            <p>{this.props.data.name}</p>
                        </h3>
                        <div className="commentContent">{this.props.children.toString()}</div>
                    </div>
                </div>
            </section>
        );
    }
});

module.exports = Comment;