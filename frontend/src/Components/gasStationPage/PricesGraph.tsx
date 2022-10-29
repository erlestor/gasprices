import { useState, useEffect } from "react"
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts"
import { Datapoint, GetGasStationData, GasPrice } from "../../types"

type Props = {
  data: GetGasStationData | undefined
}

const PricesGraph = ({ data }: Props) => {
  const color = "#523EE8"

  const formatDate = (date: Date) => {
    return (
      "" +
      date.getDate() +
      "/" +
      (date.getMonth() + 1) +
      "/" +
      date.getFullYear()
    )
  }

  const getGraphData = (data: GetGasStationData) => {
    const graphData: Datapoint[] = []
    const prices = data.gasStation.prices!

    prices.forEach((price: GasPrice) => {
      const date = new Date(price.createdAt)
      const formattedDate = formatDate(date)

      graphData.push({
        name: formattedDate,
        price: parseFloat(price.price.toFixed(2)),
      })
    })

    return graphData
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={getGraphData(data!)} margin={{ left: -35 }}>
        <defs>
          <linearGradient id={color} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={1} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend verticalAlign="bottom" />
        <Area
          type="monotone"
          dataKey="price"
          stroke={color}
          fillOpacity={1}
          fill={"url(#" + color + ")"}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default PricesGraph
