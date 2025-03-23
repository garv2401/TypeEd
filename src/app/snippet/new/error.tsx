'use client'
import React from 'react'

// type ErrorProps={
//     error:Error
// }

const Error = (error:Error) => {
  return (
    <div>{error.message}</div>
  )
}

export default Error