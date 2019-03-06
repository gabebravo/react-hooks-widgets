import React, { Fragment, Suspense, useState } from "react";
import useFetch from 'fetch-suspense';

function FetchJoke(){
  const data = useFetch('https://official-joke-api.appspot.com/jokes/random', { method: 'GET' })
  return (
    <Fragment>
      <div>{data.setup}</div>
      <div>{data.punchline}</div>
    </Fragment>
  );
};

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
        <Suspense fallback="Loading...">
          <FetchJoke />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
