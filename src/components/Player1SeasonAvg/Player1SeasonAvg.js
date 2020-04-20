import React, { useState, useEffect } from 'react'
import axios from "axios"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"

import { BLANKAVG } from "../../constants/Constants.js"

export default function Player1SeasonAvg(props) {

  const emptyData = BLANKAVG

  const playerID = props.player1.id
  const player1Name = props.player1.first_name

  // const [player1Avg, setPlayer1Avg] = useState()

  useEffect(() => {
    axios.get(`https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${playerID}&season=2019`)
      .then(resp => {
        props.setPlayer1Data(resp.data.data[0])
      })
      // .then(console.log("player1Avg inside use effect", player1Avg))
      .catch(err => console.log(err))
  }, [])

  // useEffect(() => {
  //   if (player1Avg) {
  //     addTochartData()
  //   }
  // }, [player1Avg])
  // console.log("    emptyData[3][player1Name]", emptyData[3][player1Name])
  // console.log(parseInt("27:51"))
  // console.log("props.player1Data IMPORTANT", props.player1Data)

  return (
    <div>
      <p>{`plyer 1 : ${player1Name} AVG component`}</p>

      <button onClick={() => console.log(props.player1Data)}>average in p1 comp AVERAGE2</button>

      {/* 
      <button onClick={() => console.log(player1Avg)}>AVERAGE</button>
      <button onClick={() => console.log(Object.entries(player1Avg))}> Object.entries(lebronAvg) log</button>
    <button onClick={() => setOn(true)}>on</button> 
      <button onClick={() => addTochartData()}>runchart function</button>
      <button onClick={() => console.log(emptyData)}>log emptyData</button>
      <button onClick={() => console.log(chartData)}>log chartData</button>
      {chartData && <BarChart width={600} height={300} data={chartData.slice(0, 1).concat(chartData.slice(3, 21))}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="#8884d8" />
        <Bar dataKey={player1Name} fill="#82ca9d" />
      </BarChart>}
       */}
    </div>

  )
}

