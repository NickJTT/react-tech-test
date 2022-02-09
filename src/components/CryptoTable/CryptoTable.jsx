import styles from './CryptoTable.module.scss';
import useFetchCryptoData from '../../hooks/useFetchCryptoData';
import CryptoRow from '../CryptoRow';

export default function CryptoTable() {
  const [isLoading, tableData] = useFetchCryptoData();

  return (
    <>
      <table className={styles.cryptoTable} cellSpacing='0'>
        <thead>
          <tr>
            <th>Coin Name</th>
            <th>Current Price (USD)</th>
            <th>Opening price (USD)</th>
            <th>Price Increase ↓</th>
          </tr>
        </thead>
        <tbody>
          { tableData.map(data => <CryptoRow data={data} key={data.coinName}/>) }
        </tbody>
      </table>
      {isLoading && <p>Loading...</p>}
    </>
  );
}
