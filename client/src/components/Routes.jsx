import React from 'react';
import { Route } from 'react-router-dom';
import Home from './Home';
import Registration from './Nav/Registration';
import ConfirmEmail from './ConfirmEmail';
import RecoverPassword from './RecoverPassword';
import ChangePassword from './ChangePassword';
import EventForm from './EventForm';
import Profile from './Profile';
import EventPage from './EventPage';


function Routes() {
  return (
    <React.Fragment>
      <div className="container">
        <Route path="/" component={Home} exact />
        <Route path="/registration" component={Registration} exact />
        <Route path="/email_confirm/:token" component={ConfirmEmail} />
        <Route path="/recover" component={RecoverPassword} exact />
        <Route path="/change-password/:token" component={ChangePassword} />
        <Route path="/add-event" component={EventForm} />
        <Route path="/profile/:profile_id" component={Profile} />
        <Route path="/event/:id" component={EventPage} />
      </div>
    </React.Fragment>
  )
}

export default Routes;
