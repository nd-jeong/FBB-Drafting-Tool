import React, {Component} from 'react';
import axios from 'axios';
import { BrowserRouter as Link, Redirect } from 'react-router-dom';
import './styles/UserHomePage.css';

class UserHomePage extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            leagues: []
        }
    }

    // https://www.robinwieruch.de/react-warning-cant-call-setstate-on-an-unmounted-component/

    async componentDidMount() {
        this._isMounted = true;
        await axios.get(`http://localhost:3000/users/${this.props.currentUser.user_id}/leagues/`)
            .then(res => {
                if (this._isMounted) {
                    this.setState({
                        leagues: res.data
                    });
                }
            });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const league = this.state.leagues.map(league => {
            return(
                <Link 
                    to={`/user/${this.props.match.params.user_id}/leagues/${league.id}`} 
                    key={league.id} 
                    className='league-links'>{league.league_name}
                </Link>
            )
        });

        return(
            <div className='league-link-container'>
                {this.props.login ? null : <Redirect to='/'/>}
                <h2 className='league-title'>Your Leagues:</h2>
                {league}
            </div>
        )
    }
}

export default UserHomePage;