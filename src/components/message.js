import React from 'react';

function Message (props) {

    const img = `./img/${props.data.img}.png`;
    let className =  `comment ui grid avatar_${props.data.img}`;

    if (props.data.single) {
        className += ' commentTip';
    }

    return (
        <section className={className}>
            <div className="ui column">
                <div className="commentMain">
                    <h3 className="commentAvatar">
                        <img src={img} alt="avatar"/>
                        <p>{props.data.name}</p>
                    </h3>
                    <div className="commentContent">{props.children.toString()}</div>
                </div>
            </div>
        </section>
    )
}

export default Message;