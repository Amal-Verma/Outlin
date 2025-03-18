"use client"

import React, { useEffect } from 'react'

const Testing = () => {

  useEffect(() => {
    console.log('Testing')

    const setTimeout1 = setTimeout(() => console.log("Timeout 1 executed"), 2000);
    let tt = setTimeout1;

    const setTimeout2 = setTimeout(() => console.log("Timeout 2 executed"), 3000);
    tt = setTimeout2; // Reassigns tt, but Timeout 1 still exists

    // If you did clearTimeout(tt) here, only Timeout 2 would be cleared


  }, [])

  return (


    <div>Testing</div>
  )
}

export default Testing