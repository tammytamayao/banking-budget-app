import React from 'react';
import { PieChart, Pie, Legend} from 'recharts';
  
  
const ChartSampleIncome = () => {

const currentUser=JSON.parse(localStorage.getItem('logInUser'));
const income = JSON.parse(localStorage.getItem('income')) || [];
const modifiedIncome = income.filter(e => e.email === currentUser[0].email).map(i=>({...i, cost:parseInt(i.cost)}));

return (
        <PieChart width={425} height={350}>
          <Pie data={modifiedIncome} dataKey='cost' outerRadius={150} innerRadius={100}/>
          <Legend
          height={36}
          iconType="circle"
          layout="vertical"
          verticalAlign="middle"
          align="right"
          iconSize={10}
          padding={5}
        />
        </PieChart>
);
}
  
export default ChartSampleIncome;