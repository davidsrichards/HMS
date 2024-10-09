import { Line, Bar } from "react-chartjs-2";
import {
  Chart as Chartjs,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { LineChartData } from "./LineChartData";

Chartjs.register({
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
});
function BarChart() {
  const options = {};
  const data = {};

  return <Bar options={options} data={LineChartData} />;
}

export default BarChart;
