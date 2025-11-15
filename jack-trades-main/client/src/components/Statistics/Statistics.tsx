import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import './Statistics.css';
import { IStatistic } from '../../interfaces';

const Statistics: FC = () => {
  const [statistics, setStatistics] = useState<IStatistic | null>(null);

  const getStatistics = async () => {
    try {
      const res = await axios.get('/api/v1/website/statistics');
      setStatistics(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect((): void => {
    getStatistics();
  }, []);

  return (
    <div className="statistics">
      <h1>Statistics</h1>
      <div className="circle-container">
        <div className="circle">
          <h1>{statistics?.exchangeTimes}</h1>
          <h2>Statistics</h2>
        </div>
        <div className="circle">
          <h1>{statistics?.contributeTimes}</h1>
          <h2>Contribute</h2>
        </div>
        <div className="circle">
          <h1>{statistics?.donateTimes}</h1>
          <h2>Donate</h2>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
