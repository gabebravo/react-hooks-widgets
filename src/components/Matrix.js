import React, { useState, useEffect } from 'react'
import images from '../data/matrix.js'

const MIN_DELAY = 35;
const MIN_INC = 1

export default function Matrix() {
  const [index, setIndex] = useState(0);
  const [delay, setDelay] = useState(350);
  const [increment, setIncrement] = useState(5);

  useEffect( () => {
    const interval = setInterval( () => {
      setIndex( indexState => { // indexState === latest index value
        return (indexState + increment) % images.length 
      })
    }, delay)

    return () => {
      clearInterval(interval)
    }
  }, [delay, increment])

  const updateDelay = ev => {
    const delay = Number(ev.target.value)
    setDelay(delay < MIN_DELAY ? MIN_DELAY : delay)
  }

  const updateIncrement = ev => {
    const increment = Number(ev.target.value)
    setIncrement(increment < MIN_INC ? MIN_INC : increment)
  }

  return (
    <div>
      <img src={images[index]} alt="matrix-image" />
      <div className="multiform">
        <div>
          Frame Transition Delay (milliseconds):
          <input type='number' onChange={updateDelay} />
        </div>
        <div>
          Frame Increment:
          <input type='number' onChange={updateIncrement} />
        </div>
      </div>
    </div>
  )
}