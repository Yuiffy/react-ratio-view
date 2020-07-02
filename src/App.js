import React from 'react';
import logo from './logo.svg';
import './App.css';
import RatioView from "./RatioView";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <RatioView ratio={16 / 9}>
          <div className="App-header-inner">
            {[1, 2, 3].map((one, idx) => <div className='one-item'>
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Edit <code>src/App.js</code> and save to reload.
              </p>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn React
              </a>
            </div>)}
          </div>
        </RatioView>
      </header>
    </div>
  );
}

export default App;
