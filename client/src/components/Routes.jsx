import React from 'react';
import { Route } from 'react-router-dom';
import Home from './Home';

function Routes() {
  return (
    <div className="content">
      <Route path="/" component={Home} exact />
    </div>
  )
}

export default Routes;
