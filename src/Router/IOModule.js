import React from "react";
import styled from "styled-components";
import IOInformation from "../Components/Module/IOInformation";

const Container = styled.div`
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
`;
function IOModule(id) {
  return (
    <Container>
      <IOInformation id={id.match.params.id} />
    </Container>
  );
}

export default IOModule;
