// PackageActivity.jsx
import styled, { css } from "styled-components";
import Spinner from "../../../ui/Spinner";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import useGetLuckyPrizes from "../../../hooks/lucky-prize/useGetLuckyPrizes";

const StyledToday = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / span 2;
  padding-top: 2.4rem;
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;

const StyledHeading = styled.div`
  margin-bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 1.4;
`;

const Heading = styled.h1`
  margin-bottom: 0;
  font-size: 1.9rem;
  font-weight: 550;
  ${(props) =>
    props.as === "h2" &&
    css`
      text-transform: uppercase;
    `}

  ${(props) => props.as === "h3" && css``}
    color: #f9ad14;

  text-align: left;
  line-height: 1.4;
`;

const ChartContainer = styled.div`
  height: 350px; /* Tăng chiều cao để nhãn không bị che */
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Màu sắc cho các phần của biểu đồ tròn, đảm bảo đủ 8 màu khác nhau
const COLORS = [
  "#0088FE", // Màu xanh dương (May mắn lần sau)
  "#00C49F", // Màu xanh lá (100 Xu)
  "#FFBB28", // Màu vàng (300 Xu)
  "#FF8042", // Màu cam (May mắn lần sau)
  "#FF6F61", // Màu đỏ (800 Xu)
  "#6B5B95", // Màu tím (1200 Xu)
  "#00A8E8", // Màu xanh lam (2000 Xu)
  "#A3D39C", // Màu xanh nhạt (500 Xu)
];

function PackageActivity() {
  // Lấy dữ liệu từ useGetLuckyPrizes
  const { prizes, loading } = useGetLuckyPrizes({
    page: 1,
    size: 10,
    searchName: "",
    status: null,
    isAsc: true,
  });

  // Tùy chỉnh tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: "#fff",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          <p>{`${payload[0].name}: ${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <StyledToday>
      <StyledHeading>
        <Heading as="h2">Tỉ lệ trúng thưởng các giải may mắn</Heading>
        <Heading as="h3">Số lượng: {prizes?.length}</Heading>
      </StyledHeading>

      {!loading ? (
        prizes?.length > 0 ? (
          <ChartContainer>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={prizes}
                  dataKey="probability"
                  nameKey="prizeName"
                  cx="50%"
                  cy="51%"
                  outerRadius={100}
                  fill="#8884d8"
                  label={({ prizeName, probability }) => `${prizeName}: ${probability}%`}
                  labelLine={{ stroke: "#ccc", strokeWidth: 1 }}
                >
                  {prizes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  layout="vertical"
                  align="right"
                  verticalAlign="middle"
                  wrapperStyle={{ paddingLeft: "20px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        ) : (
          <NoActivity>Không có dữ liệu...</NoActivity>
        )
      ) : (
        <Spinner />
      )}
    </StyledToday>
  );
}

export default PackageActivity;