import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { DataContainer } from "../../Style";
import LDInformation from "../LDInformation";
import LMInformation from "../LMInformation";

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  overflow-y: scroll;
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

function LMInformationContainer() {
  return (
    <DataContainer>
      <SubContainer>
        <LMInformation partner={false}></LMInformation>
        <LMInformation partner={true}></LMInformation>
      </SubContainer>
      <SubContainer>
        <LDInformation />
        <LDInformation partner={true} />
      </SubContainer>
    </DataContainer>
  );
}

export default LMInformationContainer;
