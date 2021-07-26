import React from "react";
import styled from "styled-components";
import { DataContainer, DataSubContainer } from "../../Style";

import LMDigitalInput from "../LMDigitalInput";
import LMDigitalOutput from "../LMDigitalOutput";

const SubContainer = styled.div``;

function LMStatusContainer() {
  return (
    <DataContainer>
      <DataSubContainer>
        <LMDigitalInput></LMDigitalInput>
        <LMDigitalOutput></LMDigitalOutput>
      </DataSubContainer>
    </DataContainer>
  );
}
export default LMStatusContainer;
