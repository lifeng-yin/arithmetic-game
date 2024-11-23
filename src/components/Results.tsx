import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAppStore } from '../lib/store/appStore';

const Results = () => {
  const { lastRound } = useAppStore();

  return (
    <div className='p-32'>
      <h2 className='text-[3rem] text-center'>score: {lastRound?.score}</h2>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={lastRound?.data}>
          <CartesianGrid />
          <XAxis dataKey="time" />
          <YAxis type='number' />
          <Tooltip content={({ active, payload, label}) => {
            if (active && payload && payload.length) {
              return (
                <div className="bg-white p-4 border border-gray-200 rounded">
                  
                  <p className="text-sm">PPS: {payload[0].value && (+payload[0].value).toFixed(2)}</p>
                  <p className="text-sm">at {label}s</p>
                </div>
              );
            }
            return null;
          }}/>
          <Line type="monotone" dataKey="pps" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Results;
