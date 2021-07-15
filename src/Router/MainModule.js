import React from "react";
import styled from "styled-components";
import LDInformation from "../Components/Main/LDInformation";
import LMDigitalInput from "../Components/Main/LMDigitalInput";
import LMDigitalOutput from "../Components/Main/LMDigitalOutput";
import LMInformation from "../Components/Main/LMInformation";
import A2750LMSetup from "../Components/Main/LMSetup";

const Container = styled.div`
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
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
      <A2750LMSetup />
    </Container>
  );
}

export default MainModule;
