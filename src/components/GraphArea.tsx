import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Flex } from "@chakra-ui/react";
import { TreasuryYield } from "../pages";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type Props = {
  yieldData: TreasuryYield[];
};

const GraphArea: React.VFC<Props> = ({ yieldData }) => {
  const labels = yieldData[0].labels;
  const graphData = {
    labels,
    datasets: yieldData.map((data) => ({
      data: data.values,
    })),
  };
  const options: {} = {
    maintainAspectRatio: false,
  };

  return (
    <Flex>
      <Line
        height={300}
        width={300}
        data={graphData}
        options={options}
        id="chart-key"
      />
    </Flex>
  );
};

export default GraphArea;
