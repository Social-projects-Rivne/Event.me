import React from 'react';
import { Route } from 'react-router-dom';
import Home from './Home';
import AddEvent from './AddEvent'


function Routes() {
  return (
    <div className="content">
      <Route path="/" component={Home} exact />
      <Route path="/add-event" component={AddEvent} />
    </div>
  )
}

export default Routes;
