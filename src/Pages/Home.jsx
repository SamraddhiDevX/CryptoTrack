import React, { useContext, useEffect, useState } from 'react'
import { CoinContext } from '../context/CoinContext'
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext'; // Import useTheme


const Home = () => {


 const {curr, coinData} = useContext(CoinContext);
  const [displyCoin,setDisplayCoin] = useState([]);
const [searchCoin,setSearchCoin] = useState("");
const { theme, toggleTheme } = useTheme(); // Access the theme context




useEffect(()=>{
      setDisplayCoin(coinData.slice(0, 10));
  },[coinData])
 

 
  const handleChange = (e)=>{
    setSearchCoin(e.target.value);
    if(e.target.value===""){
       setDisplayCoin(coinData.slice(0, 10));
    }
  }
 const handleSearchCoin = async(event) =>{
    event.preventDefault();
    const result = await coinData.filter((item) =>{
    return  item.name.toLowerCase().includes(searchCoin.toLowerCase())
  } );
    setDisplayCoin(result);
 }
  return (

    <div className={`${theme === 'dark' ? 'dark:bg-gray-800 text-slate-100' : 'bg-white text-gray-800'}`}>



     <div className="mt-20 flex items-center justify-center">
        <form onSubmit={handleSearchCoin} className={`flex space-x-10 p-4 rounded-lg ${theme==='dark' ? '' :'shadow-lg' }` }>
          <input
            type="text"
            placeholder="Search here..."
            className=" border border-gray-600 text-gray-800 text-sm rounded-lg p-2 w-60"
            value={searchCoin}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="bg-gray-700  border border-gray-600 hover:bg-gray-800 text-white font-medium rounded-lg px-4"
          >
            Search
          </button>
        </form>
      </div>




      <div className="overflow-x-auto h-80 mt-14 max-w-3xl mx-auto rounded-lg shadow-lg scroll-container">

  <div className="grid grid-cols-[0.5fr_2fr_1fr_1fr_1.5fr] px-5 py-2 items-center bg-gray-700 text-white sticky top-0 z-10">
    <p>#</p>
    <p>Coins</p>
    <p>Price</p>
    <p className="text-center">24H Change</p>
    <p className="text-right">Market Cap</p>
  </div>


  <div className={`mt-4 space-y-4 ${theme === 'dark' ? 'dark:bg-gray-800 text-slate-200' : 'bg-white'} `}>
    {displyCoin.map((item, index) => (
      <Link 
      to={`./coin/${item.id}`}
        key={index}
        className="grid grid-cols-[0.5fr_2fr_1fr_1fr_1.5fr] px-5 py-2 items-center"
      >
        <p>{item.market_cap_rank}</p>
        <div className="flex gap-4 items-center">
          <img src={item.image} className="w-6" alt="" />
          <p className='text-[15px]'>{item.name + "-" + item.symbol}</p>
        </div>
        <p>{curr.symbol} {item.current_price.toLocaleString()}</p>
        <p className={(Math.floor(item.price_change_percentage_24h * 100) / 100 )>0 ? "text-center text-green-700 font-medium" : "text-center text-red-700 font-medium"}>{Math.floor(item.price_change_percentage_24h * 100) / 100}</p>
        <p className="text-right">{curr.symbol} {item.market_cap.toLocaleString()}</p>
      </Link>
    ))}
  </div>
</div>





  
   
    </div>
  )
}

export default Home

