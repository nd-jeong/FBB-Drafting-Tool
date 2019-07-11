import React, {Component} from 'react';
import axios from 'axios';

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
                <div>
                    {team.team_name}
                </div>
            )
        })
        return(
            <div>
                League Overview
                {team}
            </div>
        )
    }
}

export default LeagueOverview;