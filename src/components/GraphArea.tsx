import { useEffect, useState } from "react";
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
import {
  Flex,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderMark,
  Link,
  Text,
} from "@chakra-ui/react";
import { TreasuryYield } from "../pages";
import Image from "next/image";

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
  const toStringDate = (dateObj: Date) => {
    const year = `${dateObj.getFullYear()}`;
    const month = `00${dateObj.getMonth() + 1}`.slice(-2);
    const date = `00${dateObj.getDate()}`.slice(-2);
    return `${year}/${month}/${date}`;
  };
  const [sliderRange, setSliderRange] = useState([0, yieldData.length - 1]);
  const [datasets, setDatasets] = useState([
    { label: "", data: [0], borderColor: "teal" },
    { label: "", data: [0], borderColor: "orange" },
  ]);
  const [graphData, setGraphData] = useState({
    labels: yieldData[0].labels,
    datasets: datasets,
  });

  const options: {} = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 32,
        },
      },
    },
  };

  useEffect(() => {
    const startData = yieldData[sliderRange[0]];
    const endData = yieldData[sliderRange[1]];

    setDatasets([
      {
        ...datasets[0],
        label: toStringDate(startData.date),
        data: startData.values,
      },
      {
        ...datasets[1],
        label: toStringDate(endData.date),
        data: endData.values,
      },
    ]);
  }, [sliderRange]);

  useEffect(() => {
    setGraphData({ ...graphData, datasets });
  }, [datasets]);

  return (
    <Flex
      w="100%"
      h="100vh"
      flexDir="column"
      p={8}
      id="main-container"
      alignItems="center"
    >
      <Flex w="100%" h="90%" id="yield-curve-container">
        <Flex w="50%" h="100%" flexDir="column" id="chart-container" px={8}>
          <Flex w="100%" h="90%" id="chart">
            <Line
              height={100}
              width={100}
              data={graphData}
              options={options}
              id="chart-key"
            />
          </Flex>
          <Flex w="100%" h="5%" mt={8} className="reference">
            <Text fontSize={4} mr={2}>
              Reference:
            </Text>
            <Link
              href="https://www.treasury.gov/resource-center/data-chart-center/interest-rates/Pages/TextView.aspx?data=yield"
              isExternal
              fontSize={4}
              color="teal"
            >
              U.S. DEPARTMENT OF THE TREASURY
            </Link>
          </Flex>
        </Flex>
        <Flex w="50%" h="100%" flexDir="column" id="reference-container" px={8}>
          <Flex w="100%" h="65%" pos="relative" className="reference-image">
            <Image
              src="https://market-pass.jp/wp-content/uploads/2022/01/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88-2022-01-13-9.24.30.png"
              alt="reference image"
              layout="fill"
              objectFit="contain"
            />
          </Flex>
          <Flex
            w="100%"
            h="25%"
            pos="relative"
            flexDir="column"
            className="reference-image"
          >
            <Image
              src="https://market-pass.jp/wp-content/uploads/2022/01/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88-2022-01-13-9.22.59.png"
              alt="reference image"
              layout="fill"
              objectFit="contain"
            />
          </Flex>
          <Flex w="100%" h="5%" mt={8} className="reference">
            <Text fontSize={4} mr={2}>
              Reference:{" "}
            </Text>
            <Link
              href="https://market-pass.jp/toshi/bond/2353/"
              isExternal
              fontSize={4}
              color="teal"
            >
              Market Pass｜【債券分析必須知識】イールドカーブの形状解説と事例
            </Link>
          </Flex>
        </Flex>
      </Flex>
      <Flex w="95%" h="10%" id="range-slider-container">
        <RangeSlider
          aria-label={["min", "max"]}
          defaultValue={[0, yieldData.length - 1]}
          colorScheme="gray"
          onChange={(range) => setSliderRange(range)}
          max={yieldData.length - 1}
          min={0}
          minStepsBetweenThumbs={1}
        >
          <RangeSliderMark value={0} ml={-12} mt={12}>
            {toStringDate(yieldData[0].date)}
          </RangeSliderMark>
          <RangeSliderMark value={yieldData.length} ml={-12} mt={12}>
            {toStringDate(yieldData[yieldData.length - 1].date)}
          </RangeSliderMark>
          <RangeSliderMark
            value={sliderRange[0]}
            textAlign="center"
            bg="teal"
            color="white"
            px={2}
            ml={-12}
          >
            {datasets[0].label}
          </RangeSliderMark>
          <RangeSliderMark
            value={sliderRange[1]}
            textAlign="center"
            bg="orange"
            px={2}
            ml={-12}
          >
            {datasets[1].label}
          </RangeSliderMark>
          <RangeSliderTrack>
            <RangeSliderFilledTrack />
          </RangeSliderTrack>
          <RangeSliderThumb index={0} bgColor="teal" />
          <RangeSliderThumb index={1} bgColor="orange" />
        </RangeSlider>
      </Flex>
    </Flex>
  );
};

export default GraphArea;
