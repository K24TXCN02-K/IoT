import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const tooltipStyle = {
  background: 'var(--chart-tooltip-bg)',
  border: '1px solid var(--chart-tooltip-border)',
  borderRadius: 14,
  color: 'var(--chart-tooltip-text)',
  boxShadow: '0 12px 28px rgba(15, 23, 42, 0.12)',
}

export default function DualMetricChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 8, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis
          dataKey="displayTime"
          axisLine={false}
          tickLine={false}
          minTickGap={42}
          tick={{ fontSize: 11 }}
        />
        <YAxis
          yAxisId="temp"
          axisLine={false}
          tickLine={false}
          width={60}
          tick={{ fontSize: 11 }}
          unit="°C"
          domain={['auto', 'auto']}
        />
        <YAxis
          yAxisId="hum"
          orientation="right"
          axisLine={false}
          tickLine={false}
          width={50}
          tick={{ fontSize: 11 }}
          unit="%"
          domain={['auto', 'auto']}
        />
        <Tooltip
          contentStyle={tooltipStyle}
          labelStyle={{ color: 'var(--chart-tooltip-text)', fontWeight: 700 }}
          formatter={(value, name) => {
            if (name === 'temperature') return [`${Number(value).toFixed(1)} °C`, 'Nhiệt độ']
            return [`${Number(value).toFixed(1)} %`, 'Độ ẩm']
          }}
        />
        <Legend
          verticalAlign="top"
          height={32}
          formatter={(value) => (value === 'temperature' ? 'Nhiệt độ' : 'Độ ẩm')}
          wrapperStyle={{ fontSize: 12, fontWeight: 600 }}
        />
        <Line
          yAxisId="temp"
          type="monotone"
          dataKey="temperature"
          stroke="#ef4444"
          strokeWidth={2.5}
          dot={false}
          activeDot={{ r: 4 }}
          isAnimationActive={false}
        />
        <Line
          yAxisId="hum"
          type="monotone"
          dataKey="humidity"
          stroke="#8b5cf6"
          strokeWidth={2.5}
          dot={false}
          activeDot={{ r: 4 }}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
