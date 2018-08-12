import React from 'react';
import { Route } from 'react-router-dom';
import Home from './Home';
import Registration from './Nav/Registration';
import ConfirmEmail from './Nav/ConfirmEmail';

function Routes() {
  return (
    <div className="content">
      <Route path="/" component={Home} exact />
      <Route path="/registration" component={Registration} exact />
      <Route path="/email_confirm/:token" component={ConfirmEmail} />
    </div>
  )
}

export default Routes;
