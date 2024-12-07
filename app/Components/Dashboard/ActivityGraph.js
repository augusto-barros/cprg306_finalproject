"use client";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export const ActivityGraph = () => {
  const [data, setData] = useState([]);
  const db = getFirestore();
  const auth = getAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          console.log("No user logged in");
          return;
        }

        const today = new Date();
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());

        const startOfWeekString = startOfWeek.toISOString().split("T")[0];

        const entriesRef = collection(db, "users", user.uid, "entries");
        const q = query(entriesRef, where("date", ">=", startOfWeekString));
        const querySnapshot = await getDocs(q);

        const fetchedData = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          fetchedData.push({
            name: new Date(data.date).toLocaleDateString("en-US", {
              weekday: "long",
            }),
            calories: data.totalCalories,
          });
        });

        const daysOfWeek = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        fetchedData.sort(
          (a, b) => daysOfWeek.indexOf(a.name) - daysOfWeek.indexOf(b.name)
        );

        setData(fetchedData);
      } catch (e) {
        console.error("Error fetching document: ", e);
      }
    };

    fetchData();
  }, [auth, db]);

  return (
    <div className="col-span-4 overflow-hidden rounded border border-stone-300">
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          width={500}
          height={400}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid stroke="#e4e4e7" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            className="text-xs font-bold"
            padding={{ right: 4 }}
          />
          <YAxis
            className="text-xs font-bold"
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            wrapperClassName="text-sm rounded"
            labelClassName="text-xs text-stone-500"
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="calories"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ActivityGraph;
