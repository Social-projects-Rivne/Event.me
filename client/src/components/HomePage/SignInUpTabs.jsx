import React from 'react';
import { Tabs, Tab } from 'react-materialize';
import LogIn from './LogIn';
import Registration from './Registration';


const SignInUpTabs = () => {
  return (
    <Tabs className="tabs tabs-fixed-width tab-demo z-depth-1">
      <Tab title="Sign In" active><LogIn /></Tab>
      <Tab title="Sign Up"><Registration /></Tab>
    </Tabs>
  )
}

export default SignInUpTabs;
