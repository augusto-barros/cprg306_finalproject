import React, { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const fetchCalorieData = async (userId) => {
  const db = getFirestore();
  const entriesRef = collection(db, 'users', userId, 'entries');

  const today = new Date();
  const todayString = today.toISOString().split('T')[0];

  const entriesSnapshot = await getDocs(entriesRef);

  const calculateTotalCalories = (snapshot, date) => {
    let totalCalories = 0; // Define totalCalories here
    snapshot.forEach((doc) => {
      const entryDate = doc.data().date;
      if (entryDate === date) {
        totalCalories += doc.data().totalCalories;
      }
    });
    return totalCalories;
  };

  return {
    today: calculateTotalCalories(entriesSnapshot, todayString),
  };
};

export const Cards = () => {
  const [calorieData, setCalorieData] = useState({ today: 0 });
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
    <div className="grid grid-cols-1 gap-4">
      <Card title="Today's Calorie Intake" value={calorieData.today} />
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