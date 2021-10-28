import React from 'react';
import { Table } from 'rendition';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import type {} from 'styled-components/cssprop';

import { selectAllStock } from '../../app/features/stock/stock.slice';
import { setActiveStockId } from '../../app/features/stock/stockChart.slice';

/* eslint-disable-next-line */
export interface StockListProps {}

const formatToPercent = (percent) => `${percent} %`;

const cellTextColor = (v: any, rv: string) => {
  if (parseFloat(rv) < 0) {
    return { style: { color: 'red' } };
  }

  return { style: { color: 'green' } };
};

const formatDate = (v: number, rv: any) =>
  `${dayjs(v * 1000).format('DD.MM.YY HH:MM:ss')}`;

export function StockList(props: StockListProps) {
  const stock = useSelector(selectAllStock);
  const dispatch = useDispatch();

  const handleRowClick = (event: { id: string }) => {
    if (event?.id) {
      dispatch(setActiveStockId(event.id));
    }
  };

  return (
    <Table
      columns={[
        {
          field: 'id',
          label: 'Symbol',
          sortable: true,
        },
        {
          field: 't',
          label: 'Last Updated',
          sortable: true,
          render: formatDate,
        },
        {
          field: 'o',
          label: 'Open Price',
          sortable: true,
        },
        {
          field: 'l',
          label: 'Low Price',
          sortable: true,
        },
        {
          field: 'h',
          label: 'High Price',
          sortable: true,
        },
        {
          field: 'c',
          label: 'Current Price',
          sortable: true,
        },
        {
          field: 'pc',
          label: 'Last Close Price',
          sortable: true,
        },
        {
          field: 'changeFromLastDay',
          label: '% Change From Last Day',
          sortable: true,
          render: formatToPercent,
          cellAttributes: cellTextColor,
        },
      ]}
      data={stock}
      onRowClick={handleRowClick}
      rowKey="id"
      css={`
        background-color: white;
      `}
    />
  );
}

export default StockList;
