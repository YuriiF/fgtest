import React from 'react';
import { Grid, Box } from 'react-raster';
import { Heading } from 'rendition';
import { css } from 'styled-components';
import { StockList } from '../stock-list/StockList';
import { StockItem } from '../stock-item/StockItem';
import { StockChart } from '../stock-chart/StockChart';
import { SearchForm } from '../search-form/SearchForm';
import { NeuralNetworkSettings } from '../neural-network-settings/NeuralNetworkSettings';

export function Dashboard() {
  return (
    <Grid
      breakpoints={[0, 400, 800, 1200]}
      colspan={12}
      left={'2vw'}
      right={'2vw'}
      top={'2vw'}
      bottom={'2vw'}
      gutterX={'1vw'}
      gutterY={'1vw'}
      control
    >
      <Box cols={[6, 12, 3]}>
        <Heading.h4 bold padding={8}>
          Search for Stock Symbol
        </Heading.h4>
        <SearchForm />
        <StockItem />
      </Box>
      <Box cols={[12, 12, 9]}>
        <Box cols={[12]}>
          <StockChart />
        </Box>
        <Box cols={[12]}>
          <Heading.h4 bold padding={8}>
            Latest available data
          </Heading.h4>
          <span>Click on the row to load the chart for the stock</span>
          <StockList />
        </Box>
      </Box>
      <Box cols={[12]}>
        <Heading.h4 bold padding={8}>
          Prediction settings
        </Heading.h4>
        <NeuralNetworkSettings />
      </Box>
    </Grid>
  );
}

export default Dashboard;
