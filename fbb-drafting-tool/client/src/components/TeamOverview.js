import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'

class TeamOverview extends Component {
    _isMounted = false;
    constructor() {
        super();

        this.state = {
            players: []
        }
    }

    async componentDidMount() {
        this._isMounted = true;
        await axios.get(`http://localhost:3000/users/${this.props.match.params.user_id}/leagues/${this.props.match.params.league_id}/teams/${this.props.match.params.team_id}/team_players`)
            .then(res => {
                if (this._isMounted) {
                    this.setState({
                        players: res.data
                    });
                }
            });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const players = this.state.players.map(player => {
            if (player.team_id == this.props.match.params.team_id) {
                return(
                    <div key={player.id}>
                        {player.first_name}
                    </div>
                );
            }
        });

        return(
            <div>
                {players}
                <Link to={`/user/${this.props.match.params.user_id}/leagues/${this.props.match.params.league_id}/team/${this.props.match.params.team_id}/draft`}>Draft Players</Link>
            </div>
        )
    }
}

export default TeamOverview;