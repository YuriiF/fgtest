import React from 'react';
import { Button, ButtonGroup, Card, Input } from 'rendition';

import styled from 'styled-components';

export interface NeuralNetworkSettingsProps {}

const StyledCard = styled(Card)`
  border-radius: 2px;
`;

export function NeuralNetworkSettings(props: NeuralNetworkSettingsProps) {
  return (
    <StyledCard>
      <h1>Neural Network Settings</h1>

      <ButtonGroup>
        <React.Fragment key=".0">
          <Button>First</Button>
          <Button>Second</Button>
          <Button>Third</Button>
        </React.Fragment>
      </ButtonGroup>
      <Input onChange={function noRefCheck() {}} />
      <Input onChange={function noRefCheck() {}} />
      <Input onChange={function noRefCheck() {}} />
      <Input onChange={function noRefCheck() {}} />
      <Input onChange={function noRefCheck() {}} />
      <Input onChange={function noRefCheck() {}} />
      <Input onChange={function noRefCheck() {}} />
      <Input onChange={function noRefCheck() {}} />
    </StyledCard>
  );
}

export default NeuralNetworkSettings;
