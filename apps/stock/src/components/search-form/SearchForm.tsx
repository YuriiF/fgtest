import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, Input } from 'rendition';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import type {} from 'styled-components/cssprop';

import { fetchStock } from '../../app/features/stock/stock.slice';

const StyledCard = styled(Card)`
  border-radius: 2px;
`;

const schema = Yup.object().shape({
  symbol: Yup.string()
    .required('Symbol is required')
    .min(1, 'Symbol should have minimum one character'),
});

export function SearchForm() {
  const { handleSubmit, register, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();

  const handleSearchSubmit = async ({ symbol }) => {
    let startDate = Math.round(new Date().getTime() / 1000);
    let endDate = startDate - 72 * 3600;

    try {
      dispatch(fetchStock(symbol.toUpperCase()));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StyledCard small>
      <form onSubmit={handleSubmit(handleSearchSubmit)}>
        <Input
          ref={register}
          name="symbol"
          placeholder="Search for Stock Symbol e.g. GOOG"
          marginBottom={16}
        />
        {errors && errors.username && (
          <p className="error">{errors.username.message}</p>
        )}
        <Button
          type="submit"
          width={1}
          css={`
            border-radius: 4px;
          `}
        >
          Search
        </Button>
      </form>
    </StyledCard>
  );
}

export default SearchForm;
