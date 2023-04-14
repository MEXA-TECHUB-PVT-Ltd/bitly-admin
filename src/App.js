import { useState } from 'react';
import './App.css';
import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/dashboard';

function App() {

  return (
    <div className="background">
        {window.localStorage.getItem('id') ?
          <Dashboard />
          :
          < Home />
        }
    </div>
  );
}

export default App;
