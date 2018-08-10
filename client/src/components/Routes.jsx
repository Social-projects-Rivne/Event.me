import React from 'react';
import { Route } from 'react-router-dom';
import { Home } from './Home';
import { Registration } from './Registration';

export function Routes() {
  return (
    <div className="content">
      <Route path="/" component={Home} exact />
      <Route path="/registration" component={Registration} exact />
    </div>
  )
}
