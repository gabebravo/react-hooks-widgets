import React from "react";
import { useFetch } from '../customHooks';

export default function Joke() {
  const joke = useFetch('https://official-joke-api.appspot.com/jokes/random', {});
  const { setup, punchline } = joke;

  return joke.punchline ? (
      <div>
          <h3>Joke of the Session</h3>
          <p>{setup}</p>
          <p><em>{punchline}</em></p>
      </div>
  ) : <div>Loading...</div>;
}
