import React, { useEffect, useState } from 'react'
import PICTURES from '../data/pictures'

function Gallery(){
  const [index, setIndex] = useState(0);

// ONLY QUEUE UP ONCE
  useEffect( () => {
    setInterval( () => {
      setIndex( storedIndex => { // storedIndex = latest state value >> because the value only gets set on initital load
        return (storedIndex + 1) % PICTURES.length
      })
    }, 4000)
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