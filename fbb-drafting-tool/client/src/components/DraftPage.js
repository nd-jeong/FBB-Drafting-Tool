import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Table from 'react-bootstrap/Table';
import './styles/DraftPage.css'


class DraftPage extends Component {
    constructor() {
        super();

        this.state = {
            availablePlayers: [],
            selectedPlayer: [],
            selected: null,
            deletedPlayer: [],
            refreshPlayerList: false,
            teamPlayers: [],
            availablePlayersData: []
        }
        this.draftPlayer = this.draftPlayer.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    async componentDidMount() {
        const availablePlayers = await axios.get('http://localhost:3000/available_players');
        const teamPlayers = await axios.get(`http://localhost:3000/users/${this.props.match.params.user_id}/leagues/${this.props.match.params.league_id}/teams/${this.props.match.params.user_id}/team_players`);

        const availablePlayersData = availablePlayers.data.map(player => {
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

        this.setState({
            availablePlayers: availablePlayersData,
            teamPlayers: teamPlayers.data
        });
    }

    async componentDidUpdate() {
        if (this.state.refreshPlayerList) {
            // const playerList = this.state.availablePlayers;
            // const updatedPlayerList = playerList.filter(player => player.id !== this.state.deletedPlayer.id);
            const updatedAvailablePlayersList = await axios.get('http://localhost:3000/available_players');
            const updatedAvailablePlayersListData = updatedAvailablePlayersList.data.map(player => {
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

            const updatedTeamPlayers = await axios.get(`http://localhost:3000/users/${this.props.match.params.user_id}/leagues/${this.props.match.params.league_id}/teams/${this.props.match.params.user_id}/team_players`);

            this.setState({
                availablePlayers: updatedAvailablePlayersListData,
                deletedPlayer: [],
                refreshPlayerList: false,
                teamPlayers: updatedTeamPlayers.data
            });
        }
    }

    async draftPlayer() {
        const player = await axios.get(`http://localhost:3000/available_players/${this.state.selectedPlayer.id}`);

        const playerInfo = player.data;

        await axios.post(`http://localhost:3000/users/${this.props.match.params.user_id}/leagues/${this.props.match.params.league_id}/teams/${this.props.match.params.team_id}/team_players`, playerInfo);

        await axios.delete(`http://localhost:3000/available_players/${playerInfo.id}`);

        this.setState({
            deletedPlayer: playerInfo,
            refreshPlayerList: true
        });
        this.forceUpdate();
    }

    goBack() {
        this.props.history.goBack();
    }

    render() {
        const teamPlayers = this.state.teamPlayers.map(player => {
            if (player.team_id == this.props.match.params.team_id) {
                return(
                    <tr key={player.id}>
                        <td onClick={this.selectPlayer}>{player.first_name} {player.last_name}</td>
                    </tr>
                );
            }
        })

        const availablePlayersColumn = [{
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
        }];

        return(
            <div className='draft-window'>
                {this.props.login ? null : <Redirect to='/'/>}
                <ReactTable
                    className='-striped -highlight'
                    data={this.state.availablePlayers}
                    columns={availablePlayersColumn}
                    style={{
                        width: '1000px',
                        height: '800px'
                    }}
                    getTrProps={(state, rowInfo) => {
                        if (rowInfo && rowInfo.row) {
                            return {
                                onClick: (e) => {
                                    this.setState({
                                        selectedPlayer: rowInfo.original,
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
                <div className='draft-controls'>
                    <button onClick={this.draftPlayer} className='draft-player'>Draft Player</button>
                    <Table size="sm" className='drafted-players striped bordered hover'>
                        <thead>
                            <tr>
                                <th>Drafted Players</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teamPlayers}
                        </tbody>
                    </Table>
                    <button onClick={this.goBack} className='go-back-btn'>Back to Team</button>
                </div>
            </div>
        )
    }
}

export default DraftPage;