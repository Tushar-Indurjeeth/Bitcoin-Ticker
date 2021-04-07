import { useQuery } from "react-query";
import { Wrapper } from "./styles/App.styles";

import { LinearProgress, Select } from "@material-ui/core";
import { useEffect, useState } from "react";
import { formatNumber } from "fast-number-formatter";

type BitcoinData = {
  "15m": number;
  buy: number;
  last: number;
  sell: number;
  symbol: string;
};

type Currencies = {
  [key: string]: BitcoinData;
};

const getBCData = async (): Promise<Currencies> =>
  await (await fetch("https://blockchain.info/ticker")).json();
// 1st await is to fetch data
// 2nd await is to convert to JSON

const INTERVAL_TIME = 30000; // 30s

const App = () => {
  const [currency, setCurrency] = useState("USD");

  const { data, isLoading, error, refetch } = useQuery<Currencies>(
    "bc-data",
    getBCData
  );

  const handleCurrencySelection = (e: any) => {
    setCurrency(e.currentTarget.value);
  };

  useEffect(() => {
    const interval = setInterval(refetch, INTERVAL_TIME);
    return () => clearInterval(interval);
  }, [refetch]);

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong</div>;

  return (
    <Wrapper>
      <>
        <h2>Bitcoin Price</h2>
        <Select
          value={currency}
          onChange={handleCurrencySelection}
          className="selectCurrency"
        >
          {data &&
            Object.keys(data).map((currency) => (
              <option
                key={currency}
                value={currency}
                className="currency__menu"
              >
                {currency}
              </option>
            ))}
        </Select>
        <div className="priceDisplay">
          <h2>
            {data && data[currency].symbol}
            {data && formatNumber(data[currency].last, 2)}
          </h2>
        </div>
      </>
    </Wrapper>
  );
};

export default App;
