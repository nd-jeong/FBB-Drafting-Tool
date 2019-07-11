import React, {Component} from 'react';
import axios from 'axios';
import ReactTable from 'react-table';
import 'react-table/react-table.css';


class DraftPage extends Component {
    constructor() {
        super();

        this.state = {
            available_players: [],
            selected_player: [],
            selected: null,
            drafted_player: false
        }
        this.draftPlayer = this.draftPlayer.bind(this);
    }

    async componentDidMount() {
        const available_players = await axios.get('http://localhost:3000/available_players');

        this.setState({
            available_players: available_players.data
        });
    }

    async draftPlayer() {
        const player = await axios.get(`http://localhost:3000/available_players/${this.state.selected_player.id}`);

        const playerInfo = player.data;

        await axios.post(`http://localhost:3000/users/${this.props.match.params.user_id}/leagues/${this.props.match.params.league_id}/teams/${this.props.match.params.team_id}/team_players`, playerInfo);

        await axios.delete(`http://localhost:3000/available_players/${playerInfo.id}`);

        this.setState({
            drafted_player: true
        })
    }

    render() {
        const availablePlayers = this.state.available_players.map(player => {
            return(
                {
                    id: `${player.id}`,
                    name: `${player.first_name} ${player.last_name}`,
                    position: `${player.position}`,
                    field_goal_pct: `${player.field_goal_pct}`,
                    free_throw_pct: `${player.free_throw_pct}`,
                    threes: (`${player.threes}`/`${player.games_played}`).toFixed(1),
                    points: `${player.points}`,
                    rebounds: `${player.rebounds}`,
                    assists: `${player.assists}`,
                    steals: `${player.steals}`,
                    blocks: `${player.blocks}`,
                    turnovers: `${player.turnovers}`
                }     
            )
        });

        const columns = [{
            Header: 'ID',
            accessor: 'id',
            width: 50 
        }, {
            Header: 'Name',
            accessor: 'name',
            width: 200 
        }, {
            Header: 'Position',
            accessor: 'position',
            width: 80  
        }, {
            Header: 'FG%',
            accessor: 'field_goal_pct',
            width: 80  
        }, {
            Header: 'FT%',
            accessor: 'free_throw_pct',
            width: 80  
        }, {
            Header: '3PTM',
            accessor: 'threes',
            width: 60  
        }, {
            Header: 'Points',
            accessor: 'points',
            width: 60  
        }, {
            Header: 'Rebounds',
            accessor: 'rebounds',
            width: 90  
        }, {
            Header: 'Assists',
            accessor: 'assists',
            width: 80  
        }, {
            Header: 'Steals',
            accessor: 'steals',
            width: 60  
        }, {
            Header: 'Blocks',
            accessor: 'blocks',
            width: 60  
        }, {
            Header: 'Turnovers',
            accessor: 'turnovers',
            width: 90  
        }]

        return(
            <div>
                <ReactTable
                    className='-striped -highlight'
                    data={availablePlayers}
                    columns={columns}
                    style={{
                        width: '1000px'
                    }}
                    getTrProps={(state, rowInfo) => {
                        if (rowInfo && rowInfo.row) {
                            return {
                                onClick: (e) => {
                                    this.setState({
                                        selected_player: rowInfo.original,
                                        selected: rowInfo.index
                                    })
                                }, style: {
                                    background: rowInfo.index === this.state.selected ? '#00afec' : 'white',
                                    color: rowInfo.index === this.state.selected ? 'white' : 'black'
                                }
                            }
                        }else{
                            return {}
                        }
                        
                    }}
                />
                <button onClick={this.draftPlayer}>Draft Player</button>
            </div>
        )
    }
}

export default DraftPage;