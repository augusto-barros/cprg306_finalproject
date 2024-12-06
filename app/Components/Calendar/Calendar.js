import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { collection, query, where, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { TopBar } from '../Dashboard/TopBar';

const CaloriesCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [caloriesData, setCaloriesData] = useState({});
  const [selectedDateCalories, setSelectedDateCalories] = useState(0);

  const db = getFirestore();
  const auth = getAuth();

  useEffect(() => {
    const fetchCaloriesData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          console.log('No user logged in');
          return;
        }
        const entriesRef = collection(db, 'users', user.uid, 'entries');
        const q = query(entriesRef);
        const querySnapshot = await getDocs(q);
        const caloriesData = {};
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const date = data.date;
          const totalCalories = data.totalCalories;
          caloriesData[date] = totalCalories;
        });
        console.log('Processed calories data:', caloriesData);
        setCaloriesData(caloriesData);
      } catch (e) {
        console.error('Error fetching document: ', e);
      }
    };

    fetchCaloriesData();
  }, [auth, db]);

  useEffect(() => {
    const dateString = date.toISOString().split('T')[0];
    const calories = caloriesData[dateString] || 0;
    console.log(`Calories for ${dateString}:`, calories);
    setSelectedDateCalories(calories);
  }, [date, caloriesData]);

  const renderTileContent = ({ date, view }) => {
    if (view === 'month') {
      const dateString = date.toISOString().split('T')[0];
      const calories = caloriesData[dateString];
      return calories ? <div className="text-xs text-center">{calories} cal</div> : null;
    }
  };

  return (
    <div className='bg-white rounded-lg pb-4 shadow h-full'>
      <TopBar />
      <div className='p-4'>
        <h2 className='text-2xl font-bold mb-4'>Calories Calendar</h2>
        <div className='flex'>
          <Calendar
            onChange={setDate}
            value={date}
            tileContent={renderTileContent}
            className='react-calendar'
          />
        </div>
        <div className='mt-8 p-4 border border-gray-300 rounded'>
          <h2 className='text-xl font-bold mb-2'>Total Calories</h2>
          <p className='text-lg'>Date: {date.toDateString()}</p>
          <p className='text-lg'>Total Calories: {selectedDateCalories}</p>
        </div>
      </div>
    </div>
  );
};

export default CaloriesCalendar;