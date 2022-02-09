import React from 'react';

export default function CryptoRow({ data }) {
  return (
    <tr>
      <td>{data.coinName}</td>
      <td>{data.currentPrice}</td>
      <td>{data.openingPrice}</td>
      <td>{`${data.priceIncrease.percentage}% (${data.priceIncrease.amount})`}</td>
    </tr>
  );
}
