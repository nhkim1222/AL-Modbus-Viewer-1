import React from "react";
import styled from "styled-components";
import LDInformation from "../Components/Main/LDInformation";
import LMDigitalInput from "../Components/Main/LMDigitalInput";
import LMDigitalOutput from "../Components/Main/LMDigitalOutput";
import LMInformation from "../Components/Main/LMInformation";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: no-wrap;
  justify-content: left;
  align-items: flex-start;
`;
function MainModule() {
  return (
    <Container>
      <LMInformation />
      <LMInformation partner={true} />
      <LDInformation />
      <LDInformation partner={true} />
      <LMDigitalInput />
      <LMDigitalOutput />
    </Container>
  );
}

export default MainModule;
