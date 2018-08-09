import React from 'react';
import { Route } from 'react-router-dom';
import { Home } from './Home';

export function Routes() {
  return (
    <div className="content">
      <Route path="/" component={Home} exact />
    </div>
  )
}
