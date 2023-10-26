import React from 'react'
import ReactLoading from 'react-loading';

function Loader() {
  return (
    <div style={{ width:'100%', display:'flex', height: '100%', justifyContent: 'center', alignItems:'center'}}>
    <ReactLoading type='spinningBubbles' color='dodgerBlue' height='50px' width='50px' />
  </div>
  )
}

export default Loader