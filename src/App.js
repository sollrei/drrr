import React, {Component} from 'react';
import './App.css';



class App extends Component {

    constructor () {
        super();

        this.name = '';
        this.img = '';
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const name = this.name;
        const img = this.img;

        window.localStorage.userinfo = JSON.stringify({
            data: {
                name,
                img
            }
        });
        window.location.reload();

    };

    createAvatarItem(number, src) {
        return (
            <span key={number}>
                <input type="radio" name="avatarimg" value={number} id={number} onChange={this.handleChange}/>
                <label htmlFor={number}>
                    <img src={`./img/${number}.png`} alt="avatar"/>
                </label>
            </span>
        )
    }

    handleChange = (e) => {
        this.img = e.target.value;

    };

    handleNameChange = (e) => {
        this.name = e.target.value;
    };

    render() {

        let list = [];
        for (let i = 2; i < 17; i += 1) {
            const number = `a${i}`;
            list.push(this.createAvatarItem(number));
        }

        return (
            <div className="">
                <div className="column enterWrapper">
                    <div className="circleOuter">
                        <div className="circleInner"/>
                    </div>
                </div>
                <form className="avatarForm" onSubmit={this.handleSubmit} autoComplete="off">
                    <div className="field avatarImages">
                        <p><label>Choose your avatar:</label></p>
                        <input type="radio" name="avatarimg" value="a1" id="a1" defaultChecked/><label htmlFor="a1"><img src="./img/a1.png" alt="avatar"/></label>
                        {list}
                    </div>
                    <div className="inline field">
                        <label>USERNAME </label>
                        <input type="text" name="user" id="enterInput" onChange={this.handleNameChange}/>
                    </div>
                    <div className="field">
                        <input type="submit" value="ENTER" className="enterButton"/>
                    </div>
                </form>
            </div>
        );
    }
}



export default App;
