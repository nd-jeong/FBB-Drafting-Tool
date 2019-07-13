import React, {Component} from 'react';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';
import Chart from 'react-google-charts';

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
            turnovers: 0
        }
        this.calculateTeamAverages = this.calculateTeamAverages.bind(this);
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
                console.log(player.threes)
                if (player.threes == NaN || player.threes === NaN || player.threes == null) {
                    threes.push(0)
                } else {
                    threes.push(parseFloat(player.threes))
                }
            }
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
        const numPlayers = this.state.players.length;

        for (let i = 0; i < numPlayers; i++) {
            totalFG += fieldGoal[i];
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

        console.log(averageThrees);

        this.setState({
            field_goal_pct: averageFG,
            free_throw_pct: averageFT,
            threes: averageThrees,
            points: averagePoints,
            rebounds: averageRebounds,
            assists: averageAssists,
            steals: averageSteals,
            blocks: averageBlocks,
            turnovers: averageTurnovers
        })
    }

    render() {
        const players = this.state.players.map(player => {
            if (player.team_id == this.props.match.params.team_id) {
                return(
                    <div key={player.id}>
                        {player.first_name} {player.last_name}
                    </div>
                );
            }
        });

        return(
            <div>
                {this.props.login ? null : <Redirect to='/'/>}
                {players}
                <Link to={`/user/${this.props.match.params.user_id}/leagues/${this.props.match.params.league_id}/team/${this.props.match.params.team_id}/draft`}>Draft Players</Link>
                <button onClick={this.calculateTeamAverages}>Get Team Averages</button>
                {/* https://react-google-charts.com/bar-chart */}
                <Chart
                    width={'400px'}
                    height={'300px'}
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
                        ['FG%', parseFloat(`${this.state.field_goal_pct}`), '#b87333', null],
                        ['FT%', parseFloat(`${this.state.free_throw_pct}`), 'silver', null],
                        ['3PTM', parseFloat(`${this.state.threes}`), 'gold', null],
                        ['Points', parseFloat(`${this.state.points}`), 'color: #e5e4e2', null],
                        ['Rebounds', parseFloat(`${this.state.rebounds}`), 'color: #e5e4e2', null],
                        ['Assists', parseFloat(`${this.state.assists}`), 'color: #e5e4e2', null],
                        ['Steals', parseFloat(`${this.state.steals}`), 'color: #e5e4e2', null],
                        ['Blocks', parseFloat(`${this.state.blocks}`), 'color: #e5e4e2', null],
                        ['Turnovers', parseFloat(`${this.state.turnovers}`), 'color: #e5e4e2', null],
                    ]}
                    options={{
                        title: 'Category Averages',
                        width: 600,
                        height: 400,
                        bar: { groupWidth: '95%' },
                        legend: { position: 'none' },
                    }}
                />
            </div>
        )
    }
}

export default TeamOverview;