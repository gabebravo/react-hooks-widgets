import React, { useState } from "react";

function App() {
  const [ state, setState ] = useState({ query: '' })

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
    </div>
  );
}

export default App;
