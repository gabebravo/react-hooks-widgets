import React, { useState } from "react";
import Joke from "./components/Joke";
import HackerNews from "./components/HackerNews";
import Tasks from "./components/Tasks";

function App() {
  const [state, setState] = useState({ query: "", joke: {} });

  const searchQuery = () => {
    window.open(`https://google.com/search?q=${state.query}`, "_blank");
  };

  const handleKeyPress = e => {
    if (e.key === "Enter") {
      searchQuery();
    }
  };

  return (
    <div className="App">
      <h1>Hello Gabe</h1>
      <div className="form">
        <input
          value={state.query}
          onChange={e => setState({ ...state, query: e.target.value })}
          onKeyPress={handleKeyPress}
        />
        <button onClick={searchQuery}>Search</button>
      </div>
      <hr />
      <Joke />
      <hr />
      <Tasks />
      <hr />
      <HackerNews />
    </div>
  );
}

export default App;
