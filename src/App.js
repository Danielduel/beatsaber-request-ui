import React from 'react';
import './App.css';
import './SearchPage/SearchPage.css';

import Header from './Header/Header';

import SearchPage from './SearchPage/SearchPage';

function App() {
  const [ isExpanded, setExpanded ] = React.useState(true);

  if (isExpanded) {
    return (
      <div
        className="App"
      >
        <Header
          hidePanel={() => setExpanded(false)}
        />
        <SearchPage />
      </div>
    );
  }

  return (
    <div
      className="expandButton animate"
      onClick={() => setExpanded(true)}
    >
      <i className="Chevron"></i>
    </div>
  )
}


export default App;
