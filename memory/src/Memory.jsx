import React from 'react'

const Memory = ({memory}) => {
  return (
    <div>タイトル：{memory.name}  概要：{memory.memo}</div>
  )
}

export default Memory