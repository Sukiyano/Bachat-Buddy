import React, { useContext ,useState,useEffect} from 'react';
import { GlobalContext } from '../context/GlobalState';
import { numberWithCommas } from '../utils/format';
import { Pie, PieChart, Tooltip, Cell } from "recharts";

export const IncomeExpenses = () => {
  const { transactions } = useContext(GlobalContext);

  const amounts = transactions.map(transaction => transaction.amount);
  const [chartData, setChartData] = useState([]);
  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  React.useEffect(() => {
    setChartData([
      { name: "Expense", value: +expense },
      { name: "Income", value: +income },
    ]);
    console.log(chartData);
  }, [income, expense]);

  const COLORS = ["#d1220f", "#00C49F"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    chartData,
    index,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  chartData.forEach((kis, index) => console.log(COLORS[index % COLORS.length]));

  return (
    <>
      <div className="expense">
        <div>
          <h4>Income</h4>
          <p className="money plus">₹.{income}</p>
        </div>
        <div>
          <h4>Expense</h4>
          <p className="money minus">₹.{expense}</p>
        </div>
      </div>

      <PieChart className="piechart" width={280} height={280}>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          outerRadius={80}
          // fill="#00C49F"
          label={renderCustomizedLabel}
        />
        {/* {chartData.map((kis, index) => (
          <Cell fill={COLORS[index % COLORS.length]} />
        ))} */}
        {chartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index]} />
        ))}
        <Tooltip />
      </PieChart>
    </>
  );
};

