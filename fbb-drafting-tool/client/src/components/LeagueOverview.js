import React, {Component} from 'react';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';

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
                <div key={team.id}>
                    <Link to={`/user/${this.props.match.params.user_id}/leagues/${this.props.match.params.league_id}/team/${team.id}`}>{team.team_name}</Link>
                </div>
            )
        })
        return(
            <div>
                {this.props.login ? null : <Redirect to='/'/>}
                League Overview
                {team}
            </div>
        )
    }
}

export default LeagueOverview;