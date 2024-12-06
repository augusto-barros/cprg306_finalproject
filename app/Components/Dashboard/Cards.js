import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Function to fetch calorie data from Firestore
const fetchCalorieData = async (userId) => {
  const db = getFirestore();
  const entriesRef = collection(db, 'users', userId, 'entries');

  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  const startOfYear = new Date(today.getFullYear(), 0, 1);

  const todayString = today.toISOString().split('T')[0];
  const startOfWeekString = startOfWeek.toISOString().split('T')[0];
  const startOfYearString = startOfYear.toISOString().split('T')[0];

  const todayQuery = query(entriesRef, where('date', '==', todayString));
  const weekQuery = query(entriesRef, where('date', '>=', startOfWeekString));
  const yearQuery = query(entriesRef, where('date', '>=', startOfYearString));

  const todaySnapshot = await getDocs(todayQuery);
  const weekSnapshot = await getDocs(weekQuery);
  const yearSnapshot = await getDocs(yearQuery);

  const calculateTotalCalories = (snapshot) => {
    let totalCalories = 0;
    snapshot.forEach((doc) => {
      totalCalories += doc.data().totalCalories;
    });
    return totalCalories;
  };

  return {
    today: calculateTotalCalories(todaySnapshot),
    week: calculateTotalCalories(weekSnapshot),
    year: calculateTotalCalories(yearSnapshot),
  };
};

export const Cards = () => {
  const [calorieData, setCalorieData] = useState({ today: 0, week: 0, year: 0 });
  const auth = getAuth();

  useEffect(() => {
    const getData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const data = await fetchCalorieData(user.uid);
          setCalorieData(data);
        } catch (error) {
          console.error('Error fetching calorie data:', error);
        }
      }
    };
    getData();
  }, [auth]);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <Card title="Today's Calorie Intake" value={calorieData.today} />
      <Card title="This Week's Calorie Intake" value={calorieData.week} />
      <Card title="This Year's Calorie Intake" value={calorieData.year} />
    </div>
  );
};

const Card = ({ title, value }) => {
  return (
    <div className="col-span-6 p-4 border rounded shadow-sm">
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-2xl">{value} kcal</p>
    </div>
  );
};