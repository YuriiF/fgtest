import React from 'react';
import { Grid, Box } from 'react-raster';
import { Heading } from 'rendition';
import { css } from 'styled-components';
import { StockList } from '../stock-list/StockList';
import { StockChart } from '../stock-chart/StockChart';
import { SearchForm } from '../search-form/SearchForm';
import Favorites from '../../app/features/favorite/Favorites';

const bg = css`
  background-color: green;
`;

const headingPadding = css`
  padding: 8px;
`;

export interface DashboardProps {}

export function Dashboard(props: DashboardProps) {
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
        <Favorites />
      </Box>
      <Box cols={[12, 12, 9]}>
        <Box cols={[12]}>
          <StockChart />
        </Box>
        <Box cols={[12]}>
          <Heading.h4 bold padding={8}>
            Latest available data
          </Heading.h4>
          <StockList />
        </Box>
      </Box>
      <Box cols={[12]}>
        <Heading.h4 bold padding={8}>
          calculation
        </Heading.h4>
      </Box>
    </Grid>
  );
}

export default Dashboard;
