import React from 'react'
import FadeLoader from 'react-spinners/FadeLoader';

export default function Spinner() {
  return (
    <div className='spinner-wrapper flex items-center justify-center h-screen'>
      <FadeLoader color="#4a4eba" />
    </div>
  )
}
