import React, {Component} from 'react';

class MessageForm extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        const d = this.props.data.data;
        const text = this.refs.text.value.trim();
        const name = d.name;
        const img = d.img;

        if (!text) return;

        this.props.onCommentSubmit({
            img,
            text,
            name
        });

        this.refs.text.value = '';
    };

    render () {
        const d = this.props.data.data;

        return (
            <form className="commentForm ui form" id="commentForm" onSubmit={this.handleSubmit}>
                <input type="hidden" value={d.img} />
                <input type="hidden" value={d.name} />
                <div className="field">
                    <input type="text" ref="text"/>
                </div>
                <div className="field">
                    <input type="submit" className="postButton" value="Post !"/>
                </div>
                <div className="field"></div>
            </form>
        )
    }

}

export default MessageForm;