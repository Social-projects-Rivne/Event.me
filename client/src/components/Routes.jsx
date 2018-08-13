import React from 'react';
import { Route } from 'react-router-dom';
import Home from './Home';
import { RecoverPassword } from './RecoverPassword';


function Routes() {
  return (
    <div className="content">
      <Route path="/" component={Home} exact />
      <Route path="/recover" component={RecoverPassword} exact />
    </div>
  )
}

export default Routes;
