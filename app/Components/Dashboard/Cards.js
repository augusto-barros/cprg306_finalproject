import React from 'react'

export const Cards = () => {
  return (
    <>
      <Card />
      <Card />
      <Card />
    </>
  )
}

const Card = () => {
    return (
        <div className='p-4 border col-span-4'>Card</div>
    )
    }