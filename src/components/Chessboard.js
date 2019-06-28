import React from 'react';
import ReactDOM from 'react-dom';
import dragon from './images/danger.png';
import collectable from './images/collectable.png'
import knight from './images/knight.png'
import DB from '../config';
import { withRouter } from 'react-router-dom';



class Timer extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            elapsed: 0,
            start: Date.now(),
        }
    }

    componentDidMount(){
        this.timer = setInterval(this.tick, 50);
    }

    componentWillMount(){

        clearInterval(this.timer);
    }

    tick = () => {
        this.setState({elapsed: new Date() - this.state.start},()=>{
            this.props.useDate(this.state.elapsed);
        });
    }

    render() {
             var elapsed = Math.round(this.state.elapsed / 100);
             var seconds = (elapsed / 10).toFixed(0);  
             return <p style={{ marginBottom: 0, marginTop: -5}}>Time: <b>{seconds} seconds</b></p>;
    }


  }
class ChessBoard extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            counter: 0,
            rows: [],
            dragon: [],
            collectable: [],
            
            points: 0,
            time: 0,

            game_cells: 20,
            collectableCount: 20,
            dragonCount: 50,
            moveCount: 0
            
            
        }
        this.leftKey = this.leftKey.bind(this);
        
    }


    shouldComponentUpdate(nextProps, nextState){
        return false; 
     }


    componentDidMount(){
        
           document.addEventListener("keydown", this._handleKeyDown);
        
        
    }

    leftKey = () => {
        if(document.location.href.includes("gameover")){
           return;
        }
        var cl = document.getElementsByClassName("game_cell");
        let knightOld = this.state.counter;
        let knightModify = knightOld;
        if(knightOld%this.state.game_cells == 0){
            console.log("Can't go left");
        }else{
            knightModify = knightOld - 1;
            cl[knightModify].innerHTML = cl[knightOld].innerHTML;
            cl[knightOld].innerHTML = "";
            this.state.moveCount++;
            
            if(this.state.dragon.includes(knightModify+1)){
                this.props.history.push({pathname: '/gameover', status: "Lost" , time: this.state.time, points: this.state.points});
            }else if(this.state.collectable.includes(knightModify+1)){

                let array = this.state.collectable;
                var index = array.indexOf(knightModify+1);
                if (index > -1) {
                array.splice(index, 1);
                }

                this.setState({points: this.state.points+1, collectable: array},()=>{
                    if(this.state.collectableCount === this.state.points){
                        this.props.history.push({pathname: '/gameover', status: "Win" , time: this.state.time, points: this.state.points});
                    }
                })

            }
        }


        this.setState({counter: knightModify})
    }

    upKey = () => {
        if(document.location.href.includes("gameover")){
            return;
         }
        var cl = document.getElementsByClassName("game_cell");
        let knightOld = this.state.counter;
        let knightModify = knightOld;
        if(knightOld<this.state.game_cells){
            console.log("Can't go up");
        }else{
            
        knightModify = knightOld - this.state.game_cells;
        cl[knightModify].innerHTML = cl[knightOld].innerHTML;
        cl[knightOld].innerHTML = "";
        this.state.moveCount++;       
            

        if(this.state.dragon.includes(knightModify+1)){
            this.props.history.push({pathname: '/gameover', status: "Lost" , time: this.state.time, points: this.state.points});
        }else if(this.state.collectable.includes(knightModify+1)){
            let array = this.state.collectable;
                var index = array.indexOf(knightModify+1);
                if (index > -1) {
                array.splice(index, 1);
                }

                this.setState({points: this.state.points+1, collectable: array},()=>{
                if(this.state.collectableCount === this.state.points){
                    this.props.history.push({pathname: '/gameover', status: "Win" , time: this.state.time, points: this.state.points});
                }
            })
        }

        }


        this.setState({counter: knightModify})
    }

    rightKey = () => {
        if(document.location.href.includes("gameover")){
            return;
         }
      
        var cl = document.getElementsByClassName("game_cell");
        console.log(cl);
        
        let knightOld = this.state.counter;


        let knightModify = knightOld;
        if((knightOld+1)%this.state.game_cells == 0){
            console.log("cant go right");
        }else{
            knightModify = knightOld + 1;

            cl[knightModify].innerHTML = cl[knightOld].innerHTML;
            cl[knightOld].innerHTML = "";
            this.state.moveCount++;
            


            if(this.state.dragon.includes(knightModify+1)){
                this.props.history.push({pathname: '/gameover', status: "Lost" , time: this.state.time, points: this.state.points});
            }else if(this.state.collectable.includes(knightModify+1)){
                let array = this.state.collectable;
                var index = array.indexOf(knightModify+1);
                if (index > -1) {
                array.splice(index, 1);
                }

                this.setState({points: this.state.points+1, collectable: array},()=>{
                    if(this.state.collectableCount === this.state.points){
                        this.props.history.push({pathname: '/gameover', status: "Win" , time: this.state.time, points: this.state.points});
                    }
                })
            }

        }

        this.setState({counter: knightModify})
    }

    downKey = () => {
        if(document.location.href.includes("gameover")){
            return;
         }
    
        var cl = document.getElementsByClassName("game_cell");
        console.log(cl);
        let knightOld = this.state.counter;



        let knightModify = knightOld;
        if(knightOld>(Math.pow(this.state.game_cells,2)-this.state.game_cells-1)){
            console.log("cant go Down");
        }else{
            

            knightModify = knightOld + this.state.game_cells;

            cl[knightModify].innerHTML = cl[knightOld].innerHTML;
            cl[knightOld].innerHTML = "";
            this.state.moveCount++;
        

            if(this.state.dragon.includes(knightModify+1)){
                this.props.history.push({pathname: '/gameover', status: "Lost" , time: this.state.time, points: this.state.points});
            }else if(this.state.collectable.includes(knightModify+1)){

                let array = this.state.collectable;
                var index = array.indexOf(knightModify+1);
                if (index > -1) {
                array.splice(index, 1);
                }

                this.setState({points: this.state.points+1, collectable: array},()=>{
                    if(this.state.collectableCount === this.state.points){
                        this.props.history.push({pathname: '/gameover', status: "Win" , time: this.state.time, points: this.state.points});
                    }
                })
            }
        }



    


        this.setState({counter: knightModify})
    }

    _handleKeyDown = (e) => {
        if(e.keyCode === 37){
            this.leftKey();
        }
        else if(e.keyCode === 38){
            this.upKey();
        }
        else if(e.keyCode === 39){
            this.rightKey();
        }
        else if(e.keyCode === 40){
            this.downKey();
        }

    }

    useDate = (time) => {
        var elapsed = Math.round(time / 100);
        var seconds = (elapsed / 10).toFixed(0);  
        this.setState({time: seconds});
    }
    render() {


       
        let rows = [];
    

    var dragon = [];
    for (let i = 0; i < this.state.dragonCount; i++) {
        let randomCol = Math.floor(Math.random() * Math.pow(this.state.game_cells,2)) + 2  ;
        if(!dragon.includes(randomCol)){
            dragon.push(randomCol);
            
        } else {
            --i;
        }
    }
    this.setState({dragon: dragon})

    var collectable = [];
    for (let i = 0; i < this.state.collectableCount; i++) {
        let randomCol = Math.floor(Math.random() * Math.pow(this.state.game_cells,2)) + 2  ;
        if(dragon.includes(randomCol)){
            --i;
        }else{
            if(!collectable.includes(randomCol)){
                collectable.push(randomCol);
                
            } else {
                --i;
            }
        }

        
    }
    this.setState({collectable: collectable})



     
     for(var i=1;i<= this.state.game_cells ;i++){
       rows.push(<ChessRow number={i} collectable={collectable} dragon={dragon} game_cells={this.state.game_cells} />)
     }
    //  this.setState({rows: rows})
     return (
         <div>
             <Timer useDate={this.useDate}/>
             <div className="game_board">{rows}</div>
         </div>
     );
    }
  }
  class ChessRow extends React.Component{
    render() {
      let row = [];
     for (let i=1;i<=this.props.game_cells;i++){
       row.push(<ChessCell collectable={this.props.collectable} dragon={this.props.dragon} game_cells={this.props.game_cells} number={(this.props.number-1)*this.props.game_cells + i}/>)
     }
     return <div className="game_row">{row}</div>
    }
  }
  class ChessCell extends React.Component {
    render() {
     let rowNumber = Math.ceil(this.props.number/this.props.game_cells);
     
     let className="game_cell ";
     var code = "";
    if(this.props.dragon.includes(this.props.number)){
        return <Dragon/>
    }
    if(this.props.collectable.includes(this.props.number)){
        return <Collectable/>
    }

    if(this.props.number == 1){
        return <Knight/>
    }
      
     return <div className={className}>{code}</div>
    }
  }

  class Dragon extends React.Component{
    render() {
        return <div className="game_cell"><img src={dragon} className="image-size"/></div>
     }
  }
  class Collectable extends React.Component{
    render() {
        return <div className="game_cell"><img src={collectable} className="image-size"/></div>
     }
  }
  class Knight extends React.Component{
    render() {
        return <div className="game_cell"><img src={knight} className="image-size"/></div>
     }
  }

  export default withRouter(ChessBoard);

