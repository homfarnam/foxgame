import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Competition from './pages/Competition';
import Home from './pages/Home';
import Scores from './pages/Scores';

const App = () => {
  return (
    <>
      <Switch>
        <Route path="/competition" component={Competition} />
        <Route path="/scores" component={Scores} />
        <Route path="/" component={Home} />
      </Switch>
    </>
  );
};

export default App;
