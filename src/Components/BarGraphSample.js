import React from "react";
import { BarChart, Bar, XAxis, YAxis, Legend} from "recharts";
 
const BarChartSample = () => {

    const data = [
        {
          name: "Jan",
          Expenses: 4000,
          Income: 2400,
        },
        {
          name: "Feb",
          Expenses: 3000,
          Income: 1398,
        },
        {
          name: "Mar",
          Expenses: 2000,
          Income: 9800,
        },
        {
          name: "Apr",
          Expenses: 2780,
          Income: 3908,
        },
        {
          name: "May",
          Expenses: 1890,
          Income: 4800,
        },
        {
          name: "Jun",
          Expenses: 2390,
          Income: 3800,
        }
      ];

  return (
    <>
    <BarChart
      width={980}
      height={250}
      data={data}
      margin={{
        top: 5,
        right: 20,
        left: 10,
        bottom: 5
      }}
    >
      <XAxis dataKey="name" />
      <YAxis />
      <Bar dataKey="Expenses" fill="#8884d8" />
      <Bar dataKey="Income" fill="#82ca9d" />
      <Legend/>
    </BarChart>
    </>
  );
}

export default BarChartSample;