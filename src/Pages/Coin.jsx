import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CoinContext } from '../context/CoinContext';
import Chartindex from '../components/Chartindex';
import {useTheme} from '../context/ThemeContext'

const Coin = () => {
  const { coinId } = useParams();
  const [displyCoin, setDisplayCoin] = useState(null);
  const [displyChart, setDisplayChart] = useState(null);
  const { curr } = useContext(CoinContext);
  const { theme } = useTheme(); 

  const fetchCoinData = async () => {
    try {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'x-cg-demo-api-key': 'CG-M7HrtG4YEv6N7CpSDEaSrqEb',
        },
      };

      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}`,
        options
      );
      const data = await res.json();
      setDisplayCoin(data);
    } catch (error) {
      console.error('Error fetching coin data:', error);
    }
  };

  const handledisplayChart = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': 'CG-M7HrtG4YEv6N7CpSDEaSrqEb',
      },
    };

    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${curr.name}&days=15&interval=daily`,
        options
      );
      const data = await res.json();
      setDisplayChart(data);
    } catch (err) {
      console.error('Error fetching chart data:', err);
    }
  };

  useEffect(() => {
    fetchCoinData();
    handledisplayChart();
  }, [curr]);

  if (displyCoin && displyChart) {
    return (
      <div className="p-6  min-h-screen">
        <div className={`max-w-4xl mx-auto p-6 rounded-lg shadow-lg ${theme ==='dark' ? 'dark:bg-gray-600 text-slate-100' : 'bg-white text-gray-800'}`}>
          <div className="flex items-center gap-6">
            <img
              src={displyCoin.image.large}
              alt={displyCoin.name}
              className="w-20 h-20 object-contain"
            />
            <div>
              <h1 className="text-2xl font-bold ">
                {displyCoin.name}
              </h1>
              <p className="text-sm ">#{displyCoin.symbol}</p>
            </div>
          </div>
        </div>

   
        <div className="mt-8">
          <div className={`max-w-4xl mx-auto p-6 rounded-lg shadow-lg ${theme==='dark' ? 'dark:text-slate-100 bg-gray-600' : ''}`}>
            <h2 className="text-xl font-bold mb-4">Price Chart</h2>
            <Chartindex displayChart={displyChart} />
          </div>
        </div>

       

        <div className={`mt-8 max-w-4xl mx-auto  p-6 rounded-lg shadow-lg ${theme==='dark' ? 'dark:text-slate-100 bg-gray-600' : ''}`}>
          <h2 className="text-xl font-bold  mb-8">
            Market Details
          </h2>
          <ul className={`grid grid-cols-2 gap-x-40 gap-y-8  text-sm  ${theme==='dark' ? 'dark:text-slate-300' : ''}`}>
            <li className="flex justify-between">
              <span className="font-semibold">Crypto Market Rank:</span>
              <span>{displyCoin.market_cap_rank}</span>
            </li>
            <li className="flex justify-between">
              <span className="font-semibold">Current Price:</span>
              <span>
                {curr.symbol}{' '}
                {displyCoin.market_data.current_price[curr.name].toLocaleString()}
              </span>
            </li>
            <li className="flex justify-between">
              <span className="font-semibold">Market Cap:</span>
              <span>
                {curr.symbol}{' '}
                {displyCoin.market_data.market_cap[curr.name].toLocaleString()}
              </span>
            </li>
            <li className="flex justify-between">
              <span className="font-semibold">24 Hour High:</span>
              <span>
                {curr.symbol}{' '}
                {displyCoin.market_data.high_24h[curr.name].toLocaleString()}
              </span>
            </li>
            <li className="flex justify-between">
              <span className="font-semibold">24 Hour Low:</span>
              <span>
                {curr.symbol}{' '}
                {displyCoin.market_data.low_24h[curr.name].toLocaleString()}
              </span>
            </li>
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex mt-60 justify-center h-screen ">
        <p className="text-gray-500 text-3xl font-medium">Loading...</p>
      </div>
    );
  }
};

export default Coin;
