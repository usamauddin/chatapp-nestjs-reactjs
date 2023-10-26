import React from 'react'

function Image({ image, style }) {

    // console.log(style)
  return (
    <img src={image} style={style} />
  )
}

export default Image