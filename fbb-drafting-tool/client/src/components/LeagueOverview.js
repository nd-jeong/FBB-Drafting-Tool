import React, {Component} from 'react';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';
import './styles/LeagueOverview.css';

class LeagueOverview extends Component {
    constructor() {
        super();

        this.state = {
            teams: []
        }
    }

    async componentDidMount() {
        const res = await axios.get(`http://localhost:3000/users/${this.props.match.params.user_id}/leagues/${this.props.match.params.league_id}/teams`);

        this.setState ({
            teams: res.data
        });
    }

    render() {
        const team = this.state.teams.map(team => {
            return(
                <Link 
                    to={`/user/${this.props.match.params.user_id}/leagues/${this.props.match.params.league_id}/team/${team.id}`} 
                    key={team.id} 
                    className='team-link'>{team.team_name}
                </Link>
            )
        })
        return(
            <div>
                {this.props.login ? null : <Redirect to='/'/>}
                <h2>League Overview</h2>
                <div className='team-link-container'>
                    {team}
                </div>
            </div>
        )
    }
}

export default LeagueOverview;