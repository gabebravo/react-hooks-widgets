import { useState, useEffect } from "react";

export function useFetch(url, initialValue) {
  const [result, setResult] = useState(initialValue);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(json => setResult(json));
  }, []);

  return result;
}

export function useDynamicTransition({ increment, delay, length }){
  const [index, setIndex] = useState(0);

// ONLY QUEUE UP ONCE
  useEffect( () => {
    const interval = setInterval( () => {
      setIndex( storedIndex => { // storedIndex = latest state value / not original defined version >> because original value only gets set on initital load
        return (storedIndex + increment) % length
      })
    }, delay)

    // CLEANUP FUNCTION - will run right after every re-render
    return () => {
      clearInterval(interval) // native JS function for interval
    }
  }, [delay, increment])

  return index
}
