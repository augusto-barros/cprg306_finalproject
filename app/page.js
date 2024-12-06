"use client";
import React from 'react'
import { useUserAuth } from './_utils/auth-context'
import SignInPage from './signInOut/signInPage'
import { Sidebar } from './Components/Sidebar/Sidebar'
import { Dashboard } from './Components/Dashboard/Dashboard'


export default function Home() {
  const { user } = useUserAuth();
  if (!user) {
    return <SignInPage />;
  }
  else {
  return (
    <main className='grid gap-4 p-4 grid-cols-[220px,_1fr]'>
      <Sidebar />
      <Dashboard />
    </main>
  )
}
}