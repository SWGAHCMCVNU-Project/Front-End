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
  // Fake coin data: purchased and used
  const fakeCoins = [
    { date: "2025-03-01", purchased: 5000, used: 3000 },
    { date: "2025-03-02", purchased: 6000, used: 4500 },
    { date: "2025-03-03", purchased: 7000, used: 2500 },
    { date: "2025-03-04", purchased: 5500, used: 6000 },
    { date: "2025-03-05", purchased: 8000, used: 4000 },
    { date: "2025-03-06", purchased: 6500, used: 5500 },
    { date: "2025-03-07", purchased: 9000, used: 3500 },
  ];

  const isDarkMode = false;

  const colors = isDarkMode
    ? {
        used: { stroke: "#4f46e5", fill: "#4f46e5" },
        purchased: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        used: { stroke: "var(--color-error-700)", fill: "orange" },
        purchased: { stroke: "var(--color-green-400)", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };

  return (
    <StyledSalesChart>
      <Heading as="h2">Thống kê tổng số coin mua và coin đã sử dụng trong hệ thống</Heading>
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
            dataKey="purchased"
            type="monotone"
            stroke={colors.purchased.stroke}
            fill={colors.purchased.fill}
            strokeWidth={2}
            name="Tổng số coin mua"
            unit={
              <img
                src={greenBean}
                alt="Purchased Coin"
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
                alt="Used Coin"
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