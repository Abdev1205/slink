import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, defs, linearGradient, stop } from 'recharts';
import axios from 'axios'; // Assuming you're using axios for API calls
import api from '@/utils/axios';

const Weekly = () => {
  const [data, setData] = useState([]);  // State to store the chart data
  const [loading, setLoading] = useState(true);  // State to handle loading
  const [error, setError] = useState(null);  // State to handle errors

  useEffect(() => {
    // Fetch weekly data for the logged-in user
    const fetchData = async () => {
      try {
        setLoading(true);  // Set loading to true before API call
        const response = await api.get('/api/shorten/stats/weekly', { withCredentials: true }); // Adjust the endpoint as necessary
        setData(response.data);  // Store the data in state
        console.log("response data: " + JSON.stringify(response.data));
        setLoading(false);  // Turn off loading state
      } catch (err) {
        console.error('Error fetching weekly data:', err);
        setError('Failed to load data');
        setLoading(false);
      }
    };

    fetchData();  // Fetch the data when the component mounts
  }, []);  // Empty dependency array to run effect once on mount

  // Display loading or error message if needed
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  // return null;

  return (
    <BarChart
      width={400}
      barGap={4}
      height={300}
      data={data}  // Use the fetched data here
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#144EE3" />
          <stop offset="100%" stopColor="#F42A8B" />
        </linearGradient>
      </defs>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip cursor={{ fill: 'transparent' }} />
      <Bar dataKey="visits" fill="url(#colorUv)" />
    </BarChart>
  );
};

export default Weekly;
