import React from 'react'
import { AccountToggle } from './AccountToggle'
import { RouteSelect } from './RouteSelect'

export const Sidebar = () => {
  return (
    <div>
      <div className='overflow-y-scroll sticky top-4 h-[calc(100vh-32px-48px)] hide-scrollbar'>
      <AccountToggle />
      <RouteSelect />
        { /* TODO: Main sidebar content */ }
      </div>

      {/* TODO: Toggle button */}
    </div>
  )
}