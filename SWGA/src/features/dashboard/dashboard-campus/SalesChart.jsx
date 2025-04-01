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
  // Fake data for lecturer coins: total coins they have and coins used
  const fakeLecturerCoins = [
    { date: "2025-03-01", total: 10000, used: 3000 },
    { date: "2025-03-02", total: 9500, used: 4500 },
    { date: "2025-03-03", total: 11000, used: 2500 },
    { date: "2025-03-04", total: 9000, used: 6000 },
    { date: "2025-03-05", total: 12000, used: 4000 },
    { date: "2025-03-06", total: 10500, used: 5500 },
    { date: "2025-03-07", total: 13000, used: 3500 },
  ];

  const isDarkMode = false;

  const colors = isDarkMode
    ? {
        used: { stroke: "#4f46e5", fill: "#4f46e5" },
        total: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        used: { stroke: "var(--color-error-700)", fill: "orange" },
        total: { stroke: "var(--color-green-400)", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };

  return (
    <StyledSalesChart>
      <Heading as="h2">
        Thống kê tổng số coin giảng viên có và đã sử dụng trong campus
      </Heading>
      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={fakeLecturerCoins}>
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
            dataKey="total"
            type="monotone"
            stroke={colors.total.stroke}
            fill={colors.total.fill}
            strokeWidth={2}
            name="Tổng số coin giảng viên có"
            unit={
              <img
                src={greenBean}
                alt="Total Coins"
                width="25"
                height="25"
                style={{ marginLeft: "5px" }}
              />
            }
          />
          <Area
            dataKey="used"
            type="monotone"
            stroke={colors.used.stroke}
            fill={colors.used.fill}
            strokeWidth={2}
            name="Tổng số coin đã sử dụng"
            unit={
              <img
                src={greenBean}
                alt="Used Coins"
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