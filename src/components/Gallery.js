import React, { useEffect, useState } from 'react'
import PICTURES from '../data/pictures'

function Gallery(){
  const [index, setIndex] = useState(0);

// ONLY QUEUE UP ONCE
  useEffect( () => {
    setInterval( () => {
      const newIndex = Math.floor(Math.random() * (PICTURES.length));
      setIndex(newIndex)
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