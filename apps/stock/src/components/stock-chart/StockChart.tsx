import React, { useEffect, useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { stockAPI } from '@fgtest/util';
import { candleChartOptions } from './getChartOptions';
import { selectActiveStockId } from '../../app/features/stock/stockChart.slice';

const StyledStockChart = styled.div`
  color: pink;
`;

export function StockChart() {
  const [option, setOption] = useState({});
  const activeStockId = useSelector(selectActiveStockId);

  useEffect(() => {
    let startDate = Math.round(new Date().getTime() / 1000);
    let endDate = startDate - 72 * 3600;

    const getData = async () => {
      try {
        const { data } = await stockAPI.get('/stock/candle', {
          params: {
            symbol: activeStockId || 'GOOG',
            resolution: 'D',
            from: '1577833200',
            to: '1609369200',
            token: 'c0770i748v6pan1qdpe0',
          },
        });

        setOption(candleChartOptions(data, activeStockId));
      } catch (error) {}
    };
    getData();
  }, [activeStockId]);

  return (
    <StyledStockChart>
      <ReactEcharts
        option={option}
        notMerge={true}
        lazyUpdate={true}
        style={{ height: 500 }}
      />
    </StyledStockChart>
  );
}

export default StockChart;
