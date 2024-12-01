import React from 'react'
import { useContext } from 'react';
import { CoinContext } from '../context/CoinContext'
import {useTheme} from '../context/ThemeContext'
import { Link } from 'react-router-dom';

const Navbar = () => {
    const { setCurr} = useContext(CoinContext);
    const { theme, toggleTheme } = useTheme(); 


const handleCurrChange = (e) => {
    switch (e.target.value) {
      case 'usd':
        setCurr({
          name: 'usd',
          symbol: '$'
        });
        break;
      case 'eur':
        setCurr({
          name: 'eur',
          symbol: '€'
        });
        break;
      case 'inr':
        setCurr({
          name: 'inr',
          symbol: '₹'
        });
        break;
      default:
        setCurr({
          name: 'usd',
          symbol: '$'
        });
        break;
    }
  };
  return (
    <div className={`pt-10 ${theme === 'dark' ? 'dark:bg-gray-800 text-slate-100' : 'bg-white text-gray-800'}`}>

    <div >
     <div className="container mx-auto flex items-center justify-center space-x-16 py-4">
      <Link to="/" className="text-2xl font-bold">CryptoTrack</Link> 
       <select onChange={handleCurrChange} className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
         <option value="usd">USD</option>
         <option value="eur">EUR</option>
         <option value="inr">INR</option>
       </select>
       <button
          onClick={toggleTheme}
          className="py-2 px-4   bg-gray-700 text-white rounded-md border border-gray-600"
        >
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>
     </div>
    </div>
      
    </div>
  )
}

export default Navbar
