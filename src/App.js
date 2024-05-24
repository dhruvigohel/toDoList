import Box from './components/outercomponent/outer'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import React from 'react';

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Box />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
