import React from 'react'
import { Cards } from './Cards'
import { ActivityGraph } from './ActivityGraph'

export const Grid = () => {
  return (
    <div className='px-4 grid gap-3 grid-cols-12'>
        <Cards />
        <ActivityGraph />
    </div>
  )
}
