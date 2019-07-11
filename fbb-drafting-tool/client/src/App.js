import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import decode from 'jwt-decode';
import LoginForm from './components/LoginForm';
import LandingPage from './components/LandingPage';
import UserHomePage from './components/UserHomePage';
import LeagueOverview from './components/LeagueOverview';
import TeamOverview from './components/TeamOverview';
import DraftPage from './components/DraftPage';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: {},
            login: false
        }
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
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

    handleLogout() {
        localStorage.removeItem('jwt');

        this.setState({
            currentUser: {},
            login: false
        });

        if (this.state.login === false) {
            return <Redirect to='/'/>
        }
    }
    
    render() {
        const currentUser = this.state.currentUser;
        const userIsLoggedIn = currentUser.user_id;
        return (
            <div className="App">
                <header>
                    <nav>
                        {currentUser.user_id ? <p onClick={this.handleLogout}>Log Out</p> : "Create Account"}
                    </nav>
                </header>
                <Router>
                    {userIsLoggedIn && <Redirect to={`/user/${currentUser.user_id}/home`}/> } 
                    <Switch>
                        <Route exact path='/' render={(props) => <LandingPage
                            {...props} handleLogin={this.handleLogin}
                        />}/>
                        <Route exact path='/' component={LoginForm}/>
                        <Route exact path='/user/:user_id/home' render={(props) => <UserHomePage
                            {...props} handleLogout={this.handleLogout} login={this.state.login} currentUser={currentUser}
                        />}/>
                        <Route exact path='/user/:user_id/leagues/:league_id' component={LeagueOverview}/>
                        <Route exact path='/user/:user_id/leagues/:league_id/team/:team_id' component={TeamOverview}/>
                        <Route exact path='/user/:user_id/leagues/:league_id/team/:team_id/draft' component={DraftPage}/>
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default App;
