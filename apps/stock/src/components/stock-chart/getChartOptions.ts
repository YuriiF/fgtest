import dayjs from 'dayjs';

import { calculateMA } from './calculateMA';
import { colorList } from './chartColors';

export function candleChartOptions(candleStickData, stockID = 'GOOG') {
  let close = candleStickData.c;

  const length = candleStickData.o.length - 1;

  let stocks = [];

  for (let i = 0; i <= length; i++) {
    stocks.push([
      candleStickData.o[i],
      candleStickData.c[i],
      candleStickData.l[i],
      candleStickData.h[i],
    ]);
  }

  let stock_date = candleStickData.t.map((utime: number) => {
    return dayjs(utime * 1000).format('YYYY-MM-DD');
  });

  let volume = candleStickData.v;

  let dataMA5 = calculateMA(5, stocks);
  let dataMA10 = calculateMA(10, stocks);
  let dataMA20 = calculateMA(20, stocks);
  let dataMA30 = calculateMA(30, stocks);

  let option = {
    animation: false,
    color: colorList,
    title: {
      left: 'center',
    },
    legend: {
      top: 30,
      data: [`${stockID || 'GOOG'}`, 'MA5', 'MA10', 'MA20', 'MA30'],
    },
    tooltip: {
      trigger: 'axis',
      position: function (pt) {
        return [pt[0], '10%'];
      },
    },
    axisPointer: {
      link: [
        {
          xAxisIndex: [0, 1],
        },
      ],
    },
    dataZoom: [
      {
        type: 'slider',
        xAxisIndex: [0, 1],
        realtime: false,
        start: 0,
        end: 100,
        top: 65,
        height: 20,
        handleIcon:
          'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
        handleSize: '100%',
      },
      {
        type: 'inside',
        xAxisIndex: [0, 1],
        start: 40,
        end: 70,
        top: 30,
        height: 20,
      },
    ],
    xAxis: [
      {
        type: 'category',
        data: stock_date,
        boundaryGap: false,
        axisLine: { lineStyle: { color: '#777' } },
        axisLabel: {
          formatter: function (value: dayjs.ConfigType) {
            return dayjs(value).format('MM-dd');
          },
        },
        min: 'dataMin',
        max: 'dataMax',
        axisPointer: {
          show: true,
        },
      },
      {
        type: 'category',
        gridIndex: 1,
        data: stock_date,
        scale: true,
        boundaryGap: false,
        splitLine: { show: false },
        axisLabel: { show: false },
        axisTick: { show: false },
        axisLine: { lineStyle: { color: '#777' } },
        splitNumber: 20,
        min: 'dataMin',
        max: 'dataMax',
        axisPointer: {
          type: 'shadow',
          label: { show: false },
          triggerTooltip: true,
          handle: {
            show: true,
            margin: 30,
            color: '#B80C00',
          },
        },
      },
    ],
    yAxis: [
      {
        scale: true,
        splitNumber: 2,
        axisLine: { lineStyle: { color: '#777' } },
        splitLine: { show: true },
        axisTick: { show: false },
        axisLabel: {
          inside: true,
          formatter: '{value}\n',
        },
      },
      {
        scale: true,
        gridIndex: 1,
        splitNumber: 2,
        axisLabel: { show: false },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
      },
    ],
    grid: [
      {
        left: 20,
        right: 30,
        top: 110,
      },
      {
        left: 20,
        right: 30,
        top: 400,
      },
    ],
    graphic: [
      {
        type: 'group',
        left: 'center',
        top: 70,
        width: 300,
        bounding: 'raw',
        children: [
          {
            id: 'MA5',
            type: 'text',
            style: { fill: colorList[1] },
            left: 0,
          },
          {
            id: 'MA10',
            type: 'text',
            style: { fill: colorList[2] },
            left: 'center',
          },
          {
            id: 'MA20',
            type: 'text',
            style: { fill: colorList[3] },
            right: 0,
          },
        ],
      },
    ],
    series: [
      {
        name: 'Volume',
        type: 'bar',
        xAxisIndex: 1,
        yAxisIndex: 1,
        itemStyle: {
          normal: {
            color: '#7fbe9e',
          },
          emphasis: {
            color: '#140',
          },
        },
        data: volume,
      },
      {
        type: 'candlestick',
        name: `${stockID || 'GOOG'}`,
        data: stocks,
        itemStyle: {
          normal: {
            color: '#ef232a',
            color0: '#14b143',
            borderColor: '#ef232a',
            borderColor0: '#14b143',
          },
          emphasis: {
            color: 'black',
            color0: '#444',
            borderColor: 'black',
            borderColor0: '#444',
          },
        },
      },
      {
        name: 'MA5',
        type: 'line',
        data: dataMA5,
        smooth: true,
        showSymbol: false,
        lineStyle: {
          normal: {
            width: 1,
          },
        },
      },
      {
        name: 'MA10',
        type: 'line',
        data: dataMA10,
        smooth: true,
        showSymbol: false,
        lineStyle: {
          normal: {
            width: 1,
          },
        },
      },
      {
        name: 'MA20',
        type: 'line',
        data: dataMA20,
        smooth: true,
        showSymbol: false,
        lineStyle: {
          normal: {
            width: 1,
          },
        },
      },
      {
        name: 'MA30',
        type: 'line',
        data: dataMA30,
        smooth: true,
        showSymbol: false,
        lineStyle: {
          normal: {
            width: 1,
          },
        },
      },
    ],
  };

  return option;
}
