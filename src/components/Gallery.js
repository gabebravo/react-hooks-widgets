import React, { useEffect, useState } from 'react'
import PICTURES from '../data/pictures'

const SECONDS = 1000;
const MIN_DELAY = 1 * SECONDS
const MIN_INC = 1

function Gallery(){
  const [index, setIndex] = useState(0);
  const [delay, setDelay] = useState(3 * SECONDS);
  const [increment, setIncrement] = useState(1);

// ONLY QUEUE UP ONCE
  useEffect( () => {
    const interval = setInterval( () => {
      setIndex( storedIndex => { // storedIndex = latest state value / not original defined version >> because original value only gets set on initital load
        return (storedIndex + increment) % PICTURES.length
      })
    }, delay)

    // CLEANUP FUNCTION - will run right after every re-render
    return () => {
      clearInterval(interval) // native JS function for interval
    }
  }, [delay, increment])

// on the change event, sets delay >> triggers use effect to set interval >> also cleanup function runs
  const updateDelay = ev => {
    const delay = Number(ev.target.value) * SECONDS
    setDelay(delay < MIN_DELAY ? MIN_DELAY : delay)
  }

// on the change event, sets incrment for the number of pics to skip
  const updateincrement = ev => {
    const increment = Number(ev.target.value)
    setIncrement(increment < MIN_INC ? MIN_INC : increment)
  }

  return (
    <>
      <h3>Gallery</h3>
      <div className="Gallery">
        <img 
          src={PICTURES[index].image}
          alt="gallery"
        />
        <div className="multiform">
          <div>
            Gallery Transition Delay (seconds):
            <input type='number' onChange={updateDelay} />
          </div>
          <div>
            Gallery Increment:
            <input type='number' onChange={updateincrement} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Gallery