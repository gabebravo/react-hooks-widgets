import React, { useState } from "react";
import Joke from "./components/Joke";
import HackerNews from "./components/HackerNews";
import Tasks from "./components/Tasks";
import Gallery from "./components/Gallery"

function App() {
  const [state, setState] = useState({ query: "", joke: {} });
  const [showGallery, setShow] = useState(true);

  const searchQuery = () => {
    window.open(`https://google.com/search?q=${state.query}`, "_blank");
  };

  const handleKeyPress = e => {
    if (e.key === "Enter") {
      searchQuery();
    }
  };

  const toggleGallery = () => setShow(!showGallery)

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
      <div>
        {
          showGallery ? <Gallery /> :  null
        }
        <button onClick={toggleGallery}>
          { showGallery ? 'Hide' :  'Show' }
        </button>
      </div>
      <hr />
      <HackerNews />
    </div>
  );
}

export default App;
