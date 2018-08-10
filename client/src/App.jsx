import React from 'react';
import { HashRouter } from 'react-router-dom';
import Nav from './components/Nav';
import Routes from './components/Routes'

function App() {
  return (
    <HashRouter>
      <div className="wrapper">
        <Nav />
        <Routes />
      </div>
    </HashRouter>
  );
}

export default App;
