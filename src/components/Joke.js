import React, { useState, useEffect } from "react";

export default function Joke() {
  const [state, setState] = useState({ joke: {} });

  useEffect(() => {
    fetch("https://official-joke-api.appspot.com/jokes/random")
      .then(res => res.json())
      .then(json => setState({ ...state, joke: json }));
  }, []);

  const { setup, punchline } = state.joke;

  return state.joke.punchline ? (
      <div>
          <h3>Joke of the Session</h3>
          <p>{setup}</p>
          <p><em>{punchline}</em></p>
      </div>
  ) : <div>Loading...</div>;
}
