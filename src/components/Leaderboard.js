import React from 'react';
import '../App.css';
import { withRouter } from 'react-router-dom';
import DB from '../config';



class Leaderboard extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            score: this.props.location.points,
            time: Number(this.props.location.time),
            scoresArray: [],
        }
    
    }

    componentDidMount(){
        var scoresArray = [];
        let that = this;
        var scores = DB.ref('/scores').orderByChild('score').limitToLast(10);
        scores.on('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
            var childData = childSnapshot.val();
            scoresArray.push(childData);
            });
            that.setState({scoresArray: scoresArray.reverse()})
        });
    }

    startGame = () => {
        this.props.history.push({pathname: '/'})
        window.location.reload();
    }
    render(){
        return(

            <div style={{width: "200%", margin: "0 auto", width: "400px"}}>
                <h3>Leaderboards</h3>
                <table>
                    <tr>
                        <th>Time (Sec)</th>
                        <th>Points</th>
                    </tr>
                    {
                        this.state.scoresArray.map((obj)=>{
                            return <tr>
                            <td>{obj.time}</td>
                            <td>{obj.score}</td>
                        </tr>
                        })
                    }
                    
                    </table>
                    <button className="mybtn" onClick={this.startGame}>Start Game</button>
            </div>
        
        );
    }
}

export default withRouter(Leaderboard);