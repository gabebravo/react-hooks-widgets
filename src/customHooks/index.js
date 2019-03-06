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
