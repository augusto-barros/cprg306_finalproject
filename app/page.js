"use client";
import React, { useState } from 'react';
import { useUserAuth } from './_utils/auth-context';
import SignInPage from './signInOut/signInPage';
import Dashboard from './Components/Dashboard/Dashboard';
import CaloriesTracker from './Components/CaloriesTracker/CaloriesTracker';
import Calendar from './Components/Calendar/Calendar';
import { RouteSelect } from './Components/Sidebar/RouteSelect';
import AppleWatch from './Components/AppleWatch/AppleWatch';

export default function Home() {
  const { user } = useUserAuth();
  const [selectedRoute, setSelectedRoute] = useState("dashboard");

  const renderComponent = () => {
    switch (selectedRoute) {
      case "dashboard":
        return <Dashboard />;
      case "calorie-tracker":
        return <CaloriesTracker />;
      case "calendar":
        return <Calendar />;
      case "apple-watch":
        return <AppleWatch />;
      default:
        return <Dashboard />;
    }
  };

  if (!user) {
    return <SignInPage />;
  }

  return (
    <main className='grid gap-4 p-5 grid-cols-[220px,_1fr]'>
      <RouteSelect selectedRoute={selectedRoute} setSelectedRoute={setSelectedRoute} />
      <div className='col-span-1'>
        {renderComponent()}
      </div>
    </main>
  );
}