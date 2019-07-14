import React, {Component} from 'react';
import './styles/LoginForm.css';

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
                    this.props.handleLogin(this.state);
                }}>
                    <p>Email</p>
                    <input type='email' name='email' value={this.state.email} onChange={this.handleChange}></input><br/>
                    <p>Password</p>
                    <input type='password' name='password' value={this.state.password} onChange={this.handleChange}></input><br/>
                    <input type='submit' className='login-submit-btn'></input>
                </form>
            </div>
        )
    }
}

export default LoginForm;