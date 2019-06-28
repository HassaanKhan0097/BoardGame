import React from 'react';


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
        console.log("sdf");
        this.setState({elapsed: new Date() - this.state.start});
    }

    render() {
             var elapsed = Math.round(this.state.elapsed / 100);
             var seconds = (elapsed / 10).toFixed(0);  
             return <p style={{color: "red"}}>Time: <b>{seconds} seconds</b></p>;
    }


  }




  export default Timer;
