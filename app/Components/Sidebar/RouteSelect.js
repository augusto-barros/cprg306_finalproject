"use client";

import React from "react";
import {
  FiHome,
  FiActivity,
  FiCalendar,
  FiWatch,
} from "react-icons/fi";
import { AccountToggle } from "./AccountToggle"; // Adjust the import path as needed

const Route = ({ Icon, selected, title, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-start gap-2 w-full rounded px-2 py-1.5 text-sm transition-[box-shadow,_background-color,_color] cursor-pointer ${
        selected
          ? "bg-white text-stone-950 shadow"
          : "hover:bg-stone-200 bg-transparent text-stone-500 shadow-none"
      }`}
    >
      <Icon />
      {title}
    </div>
  );
};

export const RouteSelect = ({ selectedRoute, setSelectedRoute }) => {
  return (
    <div>
      <AccountToggle />
      <div className="space-y-1">
        <Route
          Icon={FiHome}
          selected={selectedRoute === "dashboard"}
          title="Dashboard"
          onClick={() => setSelectedRoute("dashboard")}
        />
        <Route
          Icon={FiActivity}
          selected={selectedRoute === "calorie-tracker"}
          title="Calorie Tracker"
          onClick={() => setSelectedRoute("calorie-tracker")}
        />
        <Route
          Icon={FiCalendar}
          selected={selectedRoute === "calendar"}
          title="Calendar"
          onClick={() => setSelectedRoute("calendar")}
        />
        <Route
          Icon={FiWatch}
          selected={selectedRoute === "apple-watch"}
          title="Apple Watch"
          onClick={() => setSelectedRoute("apple-watch")}
        />
      </div>
    </div>
  );
};