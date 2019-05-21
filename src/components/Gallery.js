import React, { useState } from 'react'
import PICTURES from '../data/pictures'
import { useDynamicTransition } from '../customHooks'

const SECONDS = 1000;
const MIN_DELAY = 1 * SECONDS
const MIN_INC = 1

function Gallery(){
  const [delay, setDelay] = useState(3 * SECONDS);
  const [increment, setIncrement] = useState(1);

  const index = useDynamicTransition({ increment, delay, length: PICTURES.length })

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