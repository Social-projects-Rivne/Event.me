import React from 'react';
import { Route } from 'react-router-dom';
import Home from './Home';
import { RecoverPassword } from './RecoverPassword';
import { ChangePassword } from './ChangePassword';


function Routes() {
  return (
    <div className="content">
      <Route path="/" component={Home} exact />
      <Route path="/recover" component={RecoverPassword} exact />
      <Route path="/change-password/:token" component={ChangePassword} />
    </div>
  )
}

export default Routes;
