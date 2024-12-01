import { createContext, useEffect, useState } from "react";

export const CoinContext =  createContext();

const CoinContextProvider = (props) =>{

    const [coinData, setCoinData] = useState([]);
    const [curr, setCurr] = useState({
        name:'usd',
        symbol:'$',
    });

    const fetchData = async () => {
        try {
          const options = {
            method: "GET",
            headers: {
              accept: "application/json",
              "x-cg-demo-api-key": "CG-M7HrtG4YEv6N7CpSDEaSrqEb",
            },
          };
    
          const response = await fetch(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${curr.name}`,
            options
          );
          const data = await response.json();
          setCoinData(data);
        } catch (error) {
          console.error("Error fetching coin data:", error);
        }
      };


    useEffect(()=>{
        fetchData();
    },[curr])



  const contextValue = {
    coinData,curr,setCurr,
  }


  return (
    
    <CoinContext.Provider value={contextValue}>
     {props.children}
    </CoinContext.Provider>
  )


}
export default CoinContextProvider;