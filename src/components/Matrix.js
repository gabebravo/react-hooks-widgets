import React, { useState, useEffect } from 'react'
import IMAGES from '../data/matrix.js'
import { useDynamicTransition } from '../customHooks'

const MIN_DELAY = 35;
const MIN_INC = 1

export default function Matrix() {
  const [delay, setDelay] = useState(350);
  const [increment, setIncrement] = useState(5);

  const index = useDynamicTransition({ delay, increment, length: IMAGES.length })

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
      <img src={IMAGES[index]} alt="matrix-image" />
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