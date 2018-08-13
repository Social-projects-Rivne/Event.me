import React from 'react';
import { Route } from 'react-router-dom';
import Home from './Home';
import Profile from './Profile';

function Routes() {
  return (
    <div className="content">
      <Route path="/" component={Home} exact />
      <Route path="/profile/:profile_id" component={Profile}/>
    </div>
  )
}

export default Routes;
