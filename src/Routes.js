import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Chessboard from './components/Chessboard';
import GameOver from "./components/GameOver";
import Leaderboard from "./components/Leaderboard";

function Routes() {
  return (
    <Router>
      <div>
        <Route path="/" exact component={Chessboard} />
        <Route path="/gameover/" component={GameOver} />
        <Route path="/leaderboard/" component={Leaderboard} />
      </div>
    </Router>
  );
}

export default Routes;