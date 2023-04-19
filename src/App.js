import { useState } from 'react';
import './App.css';
import Home from '../src/components/Home/Home';
import Dashboard from '../src/components/Dashboard/dashboard';

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
