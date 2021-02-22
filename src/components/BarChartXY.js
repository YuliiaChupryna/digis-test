import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid} from "recharts";


const BarChartXY = ({ info, yName, title }) => {
    const data = info.map(item => ({ xName: item.xData, [yName]: item.yData,}));
    return (
    <div>
        <h1>{title}</h1>
        <BarChart width={1200} height={500} data={data}>
            <XAxis dataKey="xName" stroke="#8884d8" />
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <Bar dataKey={yName} fill="#8884d8" barSize={20} />
        </BarChart>
    </div>
)};

export default BarChartXY;

