import React from 'react';
import { Route } from 'react-router-dom';
import HomePage from './HomePage';
import MapLayout from './MapLayout';
import ConfirmEmail from './ConfirmEmail';
import RecoverInfo from './RecoverInfo';
import ChangePasswordConfirm from './ChangePasswordConfirm';
import ChangePassword from './ChangePassword';
import Profile from './Profile';
import ProfileEdit from './ProfileEdit';
import EventForm from './EventForm';


function Routes() {
  return (
    <React.Fragment>
        <Route path="/map" component={MapLayout} exact />
        <Route path="/" component={HomePage} exact />
        <Route path="/recover" component={HomePage} exact />
      <div className="container">
        <Route path="/email_confirm/:token" component={ConfirmEmail} />
        <Route path="/recover-info" component={RecoverInfo} />
        <Route path="/change-password/:token" component={ChangePassword} />
        <Route path="/confirm-new-password" component={ChangePasswordConfirm} />
        <Route path="/add-event" component={EventForm} />
        <Route path="/profile/:profile_id" component={Profile} />
        <Route path="/profile-edit/:profile_id" component={ProfileEdit} />
      </div>
    </React.Fragment>
  )
}

export default Routes;
