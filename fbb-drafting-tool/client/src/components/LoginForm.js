import React, {Component} from 'react';
import axios from 'axios';

class LoginForm extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
    }

    render() {
        return(
            <div>
                <h2>Login</h2>
                <form onSubmit={event => {
                    event.preventDefault();
                    console.log("log in")
                    this.props.handleLogin(this.state);
                }}>
                    <input type='email' name='email' value={this.state.email} onChange={this.handleChange}></input><br/>
                    <input type='password' name='password' value={this.state.password} onChange={this.handleChange}></input><br/>
                    <input type='submit'></input>
                </form>
            </div>
        )
    }
}

export default LoginForm;