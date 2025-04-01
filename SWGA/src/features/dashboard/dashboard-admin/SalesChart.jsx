/* eslint-disable react/prop-types */
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import styled from "styled-components";
import Heading from "../../../ui/Heading";
import DashboardBox from "./DashboardBox";

import redBean from "../../../assets/images/daudo.png";
import greenBean from "../../../assets/images/dauxanh.png";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;
  border: none;
  padding: 16px;

  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

export default function SalesChart() {
  // Fake data cho coins
  const fakeCoins = [
    { date: "2025-03-01", available: 5000, consumed: 3000 },
    { date: "2025-03-02", available: 6000, consumed: 4500 },
    { date: "2025-03-03", available: 7000, consumed: 2500 },
    { date: "2025-03-04", available: 5500, consumed: 6000 },
    { date: "2025-03-05", available: 8000, consumed: 4000 },
    { date: "2025-03-06", available: 6500, consumed: 5500 },
    { date: "2025-03-07", available: 9000, consumed: 3500 },
  ];

  const isDarkMode = false;

  const colors = isDarkMode
    ? {
        available: { stroke: "#22c55e", fill: "#22c55e" },
        consumed: { stroke: "#4f46e5", fill: "#4f46e5" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        available: { stroke: "var(--color-green-400)", fill: "#dcfce7" },
        consumed: { stroke: "var(--color-error-700)", fill: "orange" },
        text: "#374151",
        background: "#fff",
      };

  return (
    <StyledSalesChart>
      <Heading as="h2">
        Thống kê số coin hiện có và số coin tiêu thụ trong hệ thống
      </Heading>
      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={fakeCoins}>
          <XAxis
            dataKey="date"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            dataKey="available"
            type="monotone"
            stroke={colors.available.stroke}
            fill={colors.available.fill}
            strokeWidth={2}
            name="Available Coins"
            unit={
              <img
                src={greenBean}
                alt="Green Bean Coin"
                width="25"
                height="25"
                style={{ marginLeft: "5px" }}
              />
            }
          />
          <Area
            dataKey="consumed"
            type="monotone"
            stroke={colors.consumed.stroke}
            fill={colors.consumed.fill}
            strokeWidth={2}
            name="Consumed Coins"
            unit={
              <img
                src={greenBean}
                alt="Red Bean Coin"
                width="25"
                height="25"
                style={{ marginLeft: "5px" }}
              />
            }
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}