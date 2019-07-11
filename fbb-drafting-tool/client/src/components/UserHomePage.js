import React, {Component} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';

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
                <div key={league.id}>
                    <Link to={`/user/${this.props.match.params.user_id}/leagues/${league.id}`}>{league.league_name}</Link>
                </div>
            )
        });

        return(
            <div>
                {this.props.login ? null : <Redirect to='/'/>}
                Home Page
                {league}
            </div>
        )
    }
}

export default UserHomePage;