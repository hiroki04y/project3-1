import React from 'react'

const Memory = ({memory}) => {
  return (
    <div>{memory.name}  {memory.memo}</div>
  )
}

export default Memory