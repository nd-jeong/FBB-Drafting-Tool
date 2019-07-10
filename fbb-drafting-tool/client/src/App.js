import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import decode from 'jwt-decode';
import LoginForm from './components/LoginForm';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: {},
            login: false
        }
        this.handleLogin = this.handleLogin.bind(this);
    }

    componentDidMount() {
        const token = localStorage.getItem('jwt');

        if (token) {
            this.setState({
                currentUser: decode(token)
            });
        }
    }

    async handleLogin(data) {
        const res = await axios.post('http://localhost:3000/auth/login', data);

        const token = res.data.token;

        localStorage.setItem('jwt', token);

        this.setState({
            currentUser: decode(token),
            login: true
        });
    }
    
    render() {
        const currentUser = this.state.currentUser;
        return (
            <div className="App">
                <header>
                    <nav>
                        {currentUser.user_id ? "Log Out" : "Create Account"}
                    </nav>
                </header>
                <Router>
                    <Switch>
                        <Route exact path='/' render={(props) => <LoginForm {...props} handleLogin={this.handleLogin}/>}/>
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default App;
