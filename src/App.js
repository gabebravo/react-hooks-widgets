import React, { useState } from "react";
import Joke from './components/Joke';

function App() {
  const [ state, setState ] = useState({ query: '', joke: {} })

  function searchQuery() {
    window.open(`https://google.com/search?q=${state.query}`, '_blank')
  }

  function handleKeyPress(e){
    if(e.key === 'Enter'){
      searchQuery();
    }
  }

  return (
    <div className="App">
      <h1>Hello Gabe</h1>
      <div className="form">
        <input value={state.query} onChange={(e) => setState({ ...state, query: e.target.value })} onKeyPress={handleKeyPress}/>
        <button onClick={searchQuery}>Search</button>
      </div>
      <hr />
      <Joke />
    </div>
  );
}

export default App;

