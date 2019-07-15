import React, {Component} from 'react';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';
import Chart from 'react-google-charts';
import './styles/TeamOverview.css';

class TeamOverview extends Component {
    _isMounted = false;
    constructor() {
        super();

        this.state = {
            players: [],
            field_goal_pct: 0,
            free_throw_pct: 0,
            threes: 0,
            points: 0,
            rebounds: 0,
            assists: 0,
            steals: 0,
            blocks: 0,
            turnovers: 0,
            players_on_team: false,
            currentTeam: [],
            currentTeamPlayers: []
        }
        this.calculateTeamAverages = this.calculateTeamAverages.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    async componentDidMount() {
        this._isMounted = true;

        const currentTeamInfo = await axios.get(`http://localhost:3000/users/${this.props.match.params.user_id}/leagues/${this.props.match.params.league_id}/teams/${this.props.match.params.team_id}`);

        await axios.get(`http://localhost:3000/users/${this.props.match.params.user_id}/leagues/${this.props.match.params.league_id}/teams/${this.props.match.params.team_id}/team_players`)
            .then(res => {
                if (this._isMounted) {
                    this.setState({
                        players: res.data,
                        currentTeam: currentTeamInfo.data
                    });
                }
            });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    goBack() {
        this.props.history.goBack();
    }

    // Pushes player's stats into arrays and calculates the averages

    calculateTeamAverages() {
        const fieldGoal = [];
        const freeThrow = [];
        const threes = [];
        const points = [];
        const rebounds = [];
        const assists = [];
        const steals = [];
        const blocks = [];
        const turnovers = [];
        const currentTeamPlayers = [];

        this.state.players.map(player => {
            if (player.team_id == this.props.match.params.team_id) {
                fieldGoal.push(parseFloat(player.field_goal_pct))
                freeThrow.push(parseFloat(player.free_throw_pct))
                points.push(parseFloat(player.points))
                rebounds.push(parseFloat(player.rebounds))
                assists.push(parseFloat(player.assists))
                steals.push(parseFloat(player.steals))
                blocks.push(parseFloat(player.blocks))
                turnovers.push(parseFloat(player.turnovers))
                currentTeamPlayers.push(player)
                if (player.threes == NaN || player.threes === NaN || player.threes == null) {
                    threes.push(0)
                } else {
                    threes.push(parseFloat(player.threes))
                }
                this.setState({
                    currentTeamPlayers
                })
            }
            console.log(fieldGoal)
        })
        
        let totalFG = 0;
        let totalFT = 0;
        let totalThrees = 0;
        let totalPoints = 0;
        let totalRebounds = 0;
        let totalAssists = 0;
        let totalSteals = 0;
        let totalBlocks = 0;
        let totalTurnovers = 0;
        const numPlayers = this.state.currentTeamPlayers.length;

        for (let i = 0; i < numPlayers; i++) {
            totalFG += fieldGoal[i];
            console.log(totalFG)
            totalFT += freeThrow[i];
            totalThrees += threes[i];
            totalPoints += points[i];
            totalRebounds += rebounds[i];   
            totalAssists += assists[i];
            totalSteals += steals[i];
            totalBlocks += blocks[i];
            totalTurnovers += turnovers[i];
        }

        const averageFG = (totalFG / numPlayers).toFixed(1);
        const averageFT = (totalFT / numPlayers).toFixed(1);
        const averageThrees = (((totalThrees)/82) / numPlayers).toFixed(1);
        const averagePoints = (totalPoints / numPlayers).toFixed(1);
        const averageRebounds = (totalRebounds / numPlayers).toFixed(1);
        const averageAssists = (totalAssists / numPlayers).toFixed(1);
        const averageSteals = (totalSteals / numPlayers).toFixed(1);
        const averageBlocks = (totalBlocks / numPlayers).toFixed(1);
        const averageTurnovers = (totalTurnovers / numPlayers).toFixed(1);

        this.setState({
            field_goal_pct: averageFG,
            free_throw_pct: averageFT,
            threes: averageThrees,
            points: averagePoints,
            rebounds: averageRebounds,
            assists: averageAssists,
            steals: averageSteals,
            blocks: averageBlocks,
            turnovers: averageTurnovers,
            players_on_team: true
        })
    }

    render() {
        const players = this.state.players.map(player => {
            if (player.team_id == this.props.match.params.team_id) {
                return(
                    <div key={player.id}>
                        <ul>
                            <li>{player.first_name} {player.last_name}</li> 
                        </ul>
                    </div>
                );
            }
        });

        return(
            <div className='team-overview-container'>
                {this.props.login ? null : <Redirect to='/'/>}
                <div className='team-controls-container'>
                    <div className='team-players-container'>
                        <h3>{this.state.currentTeam.team_name}</h3>
                        {players}
                    </div>
                    <div className='btn-conatiner'>
                        <button className='open-draft-btn'>   
                            <Link to={`/user/${this.props.match.params.user_id}/leagues/${this.props.match.params.league_id}/team/${this.props.match.params.team_id}/draft`}>  Draft Players  </Link>
                        </button>
                    </div>
                    <div className='btn-conatiner'>
                        <button onClick={this.calculateTeamAverages} className='team-average-chart-btn'>Get Team Averages</button>
                    </div>
                    <div className='btn-conatiner'>
                        <button onClick={this.goBack} className='go-back-btn'>Back to League</button>
                    </div>
                </div>
                {this.state.players_on_team ? 
                    <div>
                    {/* https://react-google-charts.com/bar-chart */}
                    <Chart
                        width={'800px'}
                        height={'500px'}
                        chartType="BarChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                            [
                            'Category',
                            'Average',
                            { role: 'style' },
                            {
                                sourceColumn: 0,
                                role: 'annotation',
                                type: 'string',
                                calc: 'stringify',
                            },
                            ],
                            ['FG%', parseFloat(`${this.state.field_goal_pct}`), 'red', null],
                            ['FT%', parseFloat(`${this.state.free_throw_pct}`), 'blue', null],
                            ['3PTM', parseFloat(`${this.state.threes}`), 'green', null],
                            ['Points', parseFloat(`${this.state.points}`), 'orange', null],
                            ['Rebounds', parseFloat(`${this.state.rebounds}`), 'yellow', null],
                            ['Assists', parseFloat(`${this.state.assists}`), 'purple', null],
                            ['Steals', parseFloat(`${this.state.steals}`), 'black', null],
                            ['Blocks', parseFloat(`${this.state.blocks}`), 'gold', null],
                            ['Turnovers', parseFloat(`${this.state.turnovers}`), 'silver', null],
                        ]}
                        options={{
                            title: 'Category Averages',
                            width: 800,
                            height: 600,
                            bar: { groupWidth: '95%' },
                            legend: { position: 'none' },
                        }}
                    />
                </div> : null}
            </div>
        )
    }
}

export default TeamOverview;