"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface AttendanceChartProps {
  data: any[];
}

export const AttendanceChart = ({ data }: AttendanceChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="present" stroke="#8884d8" />
        <Line type="monotone" dataKey="absent" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};
