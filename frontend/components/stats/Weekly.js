'use client'

import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, defs, linearGradient, stop } from 'recharts';
import axios from 'axios'; // Assuming you're using axios for API calls
import api from '@/utils/axios';
import Image from 'next/image';
import { NoStastsFoundImage } from '@/public/assetsManager';
import PrimaryButton from '../button/PrimaryButton';
import { useRouter } from 'nextjs-toploader/app';

const Weekly = () => {
  const [data, setData] = useState([]);  // State to store the chart data
  const [loading, setLoading] = useState(true);  // State to handle loading
  const [error, setError] = useState(null);  // State to handle errors
  const router = useRouter()

  useEffect(() => {
    // Fetch weekly data for the logged-in user
    const fetchData = async () => {
      try {
        setLoading(true);  // Set loading to true before API call
        const response = await api.get('/api/shorten/stats/weekly', { withCredentials: true }); // Adjust the endpoint as necessary
        setData(response.data);  // Store the data in state
        console.log("response data: " + JSON.stringify(response.data), "respponse", response);
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
    <div>
      <div className={` ${data.length == 0 ? "hidden" : ""}  `} >
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
      </div>

      <div className='flex flex-col gap-[2rem] items-center justify-center w-full h-[calc(100vh-10rem)] ' >
        <h2 className='text-white/75 font-openSans sm:text-[1.4rem] text-[1.2rem] text-center ' >No Stats Found due to insufficeint data </h2>
        <Image
          src={NoStastsFoundImage}
          alt='No stats available'
          className=' w-[20rem] pointer-events-none select-none '
        />
        <PrimaryButton text='Go to Home' exec={() => router.push('/')} styles=' text-white ' />

      </div>


    </div>
  );
};

export default Weekly;
