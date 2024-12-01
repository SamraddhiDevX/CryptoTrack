import React, { useEffect, useState } from 'react'
import Chart from 'react-google-charts'

const Chartindex = ({displayChart}) => {

  const [data,setData] = useState([["Date","Prices"]])

 useEffect(()=>{
     let d= [["Date","Prices"]];
     if(displayChart.prices){
        displayChart.prices.map((item)=>{
            d.push([`${new Date(item[0]).toLocaleDateString().slice(0,-5)}`,item[1]])
        })
        setData(d)
     }
 },[displayChart])
 
 
 
 
 return (
    <div>
      <Chart 
      chartType='LineChart'
      data={data}
      height="100%"
      legendToggle
      />
    </div>
  )
}

export default Chartindex
