import { useEffect, useState } from "react";
import { InferGetStaticPropsType } from "next";
import { Flex } from "@chakra-ui/react";
import { parseString } from "xml2js";
import GraphArea from "../components/GraphArea";
import sortBy from "lodash.sortby";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export type TreasuryYield = {
  date: Date;
  labels: string[];
  values: number[];
};

const Index: React.VFC<Props> = ({ xmlData }) => {
  const labels = [
    "1MONTH",
    "2MONTH",
    "3MONTH",
    "6MONTH",
    "1YEAR",
    "2YEAR",
    "3YEAR",
    "5YEAR",
    "7YEAR",
    "10YEAR",
    "20YEAR",
    "30YEAR",
  ];

  const [yieldData, setYieldData] = useState<TreasuryYield[]>([]);

  useEffect(() => {
    parseString(xmlData, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        const pre = res.pre;
        const entries = pre.entry;
        entries.map((entry: any) => {
          const content = entry.content[0];
          const property = content["m:properties"][0];
          const date = new Date(property["d:NEW_DATE"][0]["_"]);
          const values = labels.map((label) =>
            parseFloat(property[`d:BC_${label}`][0]["_"])
          );
          setYieldData((data) =>
            sortBy(
              [
                ...data,
                {
                  date,
                  labels,
                  values,
                },
              ],
              "date"
            )
          );
        });
      }
    });
  }, [xmlData]);

  return (
    <Flex height="100vh">
      {yieldData.length && <GraphArea yieldData={yieldData} />}
    </Flex>
  );
};

export default Index;

export const getStaticProps = async () => {
  console.log("Start Fetching.");
  const response = await fetch(
    `${process.env.API_ENDPOINT}?data=yieldyear&year=2020`
  );
  console.log("Finish Fetching");
  const xmlResponse = await response.text();

  const staticProps = {
    props: {
      xmlData: xmlResponse,
    },
  };

  return staticProps;
};
