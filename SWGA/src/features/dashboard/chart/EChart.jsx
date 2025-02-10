import ReactApexChart from "react-apexcharts";
import eChart from "./configs/eChart";

function EChart({ dataColumnChart }) {
  const series =
    dataColumnChart && Array.isArray(dataColumnChart)
      ? [
          {
            name: "Value",
            data: dataColumnChart.map((data) => [
              new Date(data.date).getTime(),
              data.value,
            ]),
            color: "#fff",
          },
        ]
      : [];

  return (
    <>
      <div id="chart">
        <ReactApexChart
          className="bar-chart"
          options={eChart.options}
          series={series}
          type="bar"
          height={220}
        />
      </div>
    </>
  );
}

export default EChart;
