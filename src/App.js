import React, { useState } from "react";

function App() {
  const [ state, setState ] = useState({ query: '' })
  
  return (
    <div className="App">
      <h1>Hello Gabe</h1>
      <div className="form">
        <input value={state.query} onChange={(e) => setState({ ...state, query: e.target.value })} />
        <button>Search</button>
      </div>
    </div>
  );
}

export default App;
