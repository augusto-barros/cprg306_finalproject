import React, { useState, useEffect } from 'react';
import { TopBar } from '../Dashboard/TopBar';
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export const CaloriesTracker = () => {
  const [entries, setEntries] = useState([]);
  const [food, setFood] = useState('');
  const [quantity, setQuantity] = useState(1);

  const db = getFirestore();
  const auth = getAuth();

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          return;
        }
        const date = new Date().toISOString().split('T')[0];
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.date === date) {
            setEntries(data.entries);
          }
        }
      } catch (e) {
        console.error('Error fetching document: ', e);
      }
    };

    fetchEntries();
  }, [auth, db]);

  const fetchCalories = async (food) => {
    try {
      const response = await fetch(`https://trackapi.nutritionix.com/v2/natural/nutrients`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-app-id': process.env.NEXT_PUBLIC_NUTRITIONIX_APP_ID,
          'x-app-key': process.env.NEXT_PUBLIC_NUTRITIONIX_APP_KEY,
        },
        body: JSON.stringify({ query: food }),
      });
      const data = await response.json();
      console.log('API response:', data); // Log the API response for debugging
      if (data.foods && data.foods.length > 0) {
        return Math.round(data.foods[0].nf_calories);
      } else {
        throw new Error('No food data found');
      }
    } catch (error) {
      console.error('Error fetching calories:', error);
      return 0;
    }
  };

  const addEntry = async (e) => {
    e.preventDefault();
    if (food && quantity > 0) {
      const calories = await fetchCalories(food);
      setEntries([...entries, { food, calories, quantity }]);
      setFood('');
      setQuantity(1);
    }
  };

  const saveToFirestore = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        alert('You need to be logged in to save data.');
        return;
      }
      const date = new Date().toISOString().split('T')[0];
      const totalCalories = entries.reduce((total, entry) => total + (entry.calories * entry.quantity), 0);
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.date === date) {
          await updateDoc(docRef, {
            entries,
            totalCalories
          });
        } else {
          await setDoc(docRef, {
            email: user.email,
            date,
            entries,
            totalCalories
          });
        }
      } else {
        await setDoc(docRef, {
          email: user.email,
          date,
          entries,
          totalCalories
        });
      }

      alert('Data saved to database!');
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const deleteEntry = (index) => {
    const newEntries = entries.filter((_, i) => i !== index);
    setEntries(newEntries);
  };

  const totalCalories = entries.reduce((total, entry) => total + (entry.calories * entry.quantity), 0);

  return (
    <div className='bg-white rounded-lg pb-4 shadow h-[200vh]'>
      <TopBar />
      <div className='overflow-y-scroll sticky top-4 h-[calc(100vh-32px-48px)] hide-scrollbar'>
        <div className='p-4 border-b border-gray-200'>
          <h2 className='text-2xl font-bold p-4'>Calories Tracker</h2>
          <form onSubmit={addEntry} className='flex flex-col space-y-4 w-1/2'>
            <input 
              type="text" 
              placeholder="Add a food item" 
              value={food} 
              onChange={(e) => setFood(e.target.value)} 
              className='p-2 border border-gray-300 rounded'
            />
            <input 
              type="number" 
              placeholder="Quantity" 
              value={quantity} 
              onChange={(e) => setQuantity(Number(e.target.value))} 
              className='p-2 border border-gray-300 rounded'
              min="1"
            />
            <button type="submit" className='p-2 bg-green-500 text-white rounded hover:bg-green-600'>Add</button>
          </form>
          <ul className='mt-6 space-y-4'>
            {entries.map((entry, index) => (
              <li key={index} className='flex justify-between items-center p-2 border-b border-gray-200'>
                <span>{entry.food} - {entry.calories} calories x {entry.quantity}</span>
                <button onClick={() => deleteEntry(index)} className='p-2 bg-red-500 text-white rounded hover:bg-red-600'>Delete</button>
              </li>
            ))}
          </ul>
          <div className='mt-6 text-lg font-bold'>
            Total Calories: {totalCalories}
          </div>
          <button onClick={saveToFirestore} className='mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600'>Save to database</button>
        </div>
      </div>
    </div>
  );
};

export default CaloriesTracker;
