import { useEffect, useState } from 'react';
import axios from 'axios';
import Constants from '../utils/constants';

export default function useFetchCryptoData() {
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const data = (await axios.get(Constants.BASE_URL, { headers: { authorization: `Apikey ${Constants.API_KEY}` } })).data.DISPLAY;
      let table = [];
      for (const [key, value] of Object.entries(data)) {
        const currentPrice = parseFloat(value.USD.PRICE.replace('$', '').replace(',', '').replace(/ /g, '')).toFixed(3);
        const openingPrice = parseFloat(value.USD.OPEN24HOUR.replace('$', '').replace(',', '').replace(/ /g, '')).toFixed(3);
        const currency = {
          coinName: key,
          currentPrice,
          openingPrice,
          priceIncrease: {
            amount: (currentPrice - openingPrice).toFixed(3),
            percentage: ((currentPrice - openingPrice) / (openingPrice / 100)).toFixed(3)
          }
        }
        table.push(currency);
      }
      table = table.sort((currencyPrev, currencyNext) => currencyNext.currentPrice > currencyPrev.currentPrice ? 1 : -1);
      setTableData(table);
      setIsLoading(false);
    }
    fetch();
  }, []);
  
  return [isLoading, tableData];
}
