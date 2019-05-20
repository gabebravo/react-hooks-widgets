import React, { useEffect, useState } from 'react'
import PICTURES from '../data/pictures'

function Gallery(){
  const [index, setIndex] = useState(0);

// ONLY QUEUE UP ONCE
  useEffect( () => {
    const interval = setInterval( () => {
      setIndex( storedIndex => { // storedIndex = latest state value / not original defined version >> because original value only gets set on initital load
        return (storedIndex + 1) % PICTURES.length
      })
    }, 4000)

    // CLEANUP FUNCTION - will run right after every re-render (in this case, only on unmount)
    return () => {
      clearInterval(interval) // native JS function for interval
    }
  }, [])

  return (
    <>
      <h3>Gallery</h3>
      <div className="Gallery">
        <img 
          src={PICTURES[index].image}
          alt="gallery"
        />
      </div>
    </>
  )
}

export default Gallery