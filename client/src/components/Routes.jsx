import React from 'react';
import { Route } from 'react-router-dom';
import Home from './Home';
import MapLayout from './MapLayout';
import Registration from './Nav/Registration';
import ConfirmEmail from './ConfirmEmail';
import RecoverInfo from './RecoverInfo';
import ChangePasswordConfirm from './ChangePasswordConfirm';
import RecoverPassword from './RecoverPassword';
import ChangePassword from './ChangePassword';
import EventForm from './EventForm';
import Profile from './Profile';
import EventPage from './EventPage';
import ProfileEdit from './ProfileEdit';


function Routes() {
  return (
    <React.Fragment>
      <Route path="/map" component={MapLayout} exact />
      <div className="container">
        <Route path="/" component={Home} exact />
        <Route path="/registration" component={Registration} exact />
        <Route path="/email_confirm/:token" component={ConfirmEmail} />
  
        <Route path="/recover" component={RecoverPassword} exact />
        <Route path="/recover-info" component={RecoverInfo} />
        <Route path="/change-password/:token" component={ChangePassword} />
        <Route path="/confirm-new-password" component={ChangePasswordConfirm} />
  
        <Route path="/add-event" component={EventForm} exact />
        <Route path="/event/:id" component={EventPage} exact />
        <Route path="/event/edit/:id" component={EventForm} exact />

        <Route path="/profile/:profile_id" component={Profile} />
        <Route path="/profile-edit/:profile_id" component={ProfileEdit} />
      </div>
    </React.Fragment>
  )
}

export default Routes;
