import React from "react";
import {
  FiHome,
  FiPaperclip,
  FiActivity,
  FiCalendar,
  FiWatch,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const Route = ({ Icon, selected, title, to }) => {
  return (
      <button
        className={`flex items-center justify-start gap-2 w-full rounded px-2 py-1.5 text-sm transition-[box-shadow,_background-color,_color] ${
          selected
            ? "bg-white text-stone-950 shadow"
            : "hover:bg-stone-200 bg-transparent text-stone-500 shadow-none"
        }`}
      >
        <Icon />
        {title}
      </button>
  );
};

export const RouteSelect = () => {
  return (
    <div className="space-y-1">
      <Route Icon={FiHome} selected={true} title="Dashboard" to="/dashboard" />
      <Route Icon={FiActivity} selected={false} title="Calorie Tracker" to="/calorie-tracker" />
      <Route Icon={FiCalendar} selected={false} title="Calendar" to="/calendar" />
      <Route Icon={FiWatch} selected={false} title="Apple Watch" to="/apple-watch" />
    </div>
  );
};
