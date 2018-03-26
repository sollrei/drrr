import React from 'react';

import Message from './message';

export default function MessageList (props) {

    const commentNodes = props.data.map((item, index) => {
        return (
            <Message data={item} key={index}>
                {item.text}
            </Message>
        )
    });

    return (
        <div className="commentList">
            {commentNodes}
        </div>
    )
};