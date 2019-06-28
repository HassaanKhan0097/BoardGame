import React from 'react';
import '../App.css';
import { withRouter } from 'react-router-dom';
import DB from '../config';



class GameOver extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            score: this.props.location.points,
            time: Number(this.props.location.time)
        }
    
    }

    componentDidMount(){
        DB.ref('/scores').push(this.state);
    }

    restart = () => {
        
        this.props.history.push({pathname: '/'})
        window.location.reload();
        

    }

    leaderboard = () => {
        this.props.history.push({pathname: '/leaderboard'})
    }

    render(){
        return(

            <div>
            <div id="title">Game Over</div>
            <div id="teams-container">
                <div class="homecomming-team flexbox-items">
                    <div class="homecomming-team logo"></div>
                    <br />
                    <div class="homecomming-team name"></div>
                </div>
                <div class="flexbox-items">
                    <div id="time-of-match">You {this.props.location.status}</div>
                    <br />
                    {/* <div id="vs"><div class="circle"></div><hr id="vs-line"/><div class="circle"></div></div> */}
                </div>
                <div class="away-team flexbox-items">
                    <div class="away-team logo"></div>
                    <br />
                    <div class="away-team name"></div>
                </div>
            </div>
            <div id="score-container">
                <div class="homecomming-team score">{this.props.location.points} <sup style={{fontSize: 25}}>pts</sup></div>
                <div class="away-team score">{this.props.location.time} <sup style={{fontSize: 25}}>sec</sup></div>
            </div>
            <hr id="bottom-devider" />
            <button className="mybtn" onClick={this.restart}>Play Again</button>
            <button className="mybtn" onClick={this.leaderboard}>Leaderboards</button>
            <div id="close-details"></div>
            </div>
        
        );
    }
}

export default withRouter(GameOver);