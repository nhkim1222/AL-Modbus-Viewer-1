import React, { useState } from "react";
import styled from "styled-components";

const DIValue = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
  width: 100px;
  height: 24px;
  font-weight: ${(props) => (props.priority === "high" ? 600 : 400)};
  color: ${(props) =>
    props.value === true ? "rgba(104,212,109,1.0)" : "grey"};
`;
const AIValue = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
  width: 100px;
  height: 24px;
  color: grey;
  font-weight: ${(props) => (props.priority === "high" ? 600 : 400)};
`
const Container = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 5px;
  border-bottom: 0.5px solid rgba(100, 100, 100, 0.2);
`;

const Title = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  color: grey;
  width: 100px;
  height: 24px;
  padding-left: 1px;
  font-size: 10px;
`;

export const DIContent = ({ ch, value, on, priority }) => {
  return (
    <Container>
      <Title>channel {ch}</Title>
      <DIValue value={value} priority="high">
        {value ? "Energized" : "De-energized"}
      </DIValue>
    </Container>
  );
};

export const DOContent = ({ ch, value, setCommand }) => {
  return (
    <Container>
      <Title>channel {ch}</Title>
      <DIValue value={value} priority="high">
        {value === true ? "Close" : "Open"}
      </DIValue>
      <button onClick={() => setCommand({ ch, value })}>set</button>
    </Container>
  );
};

export const AIContent = ({ ch, value }) => {
  return (
    <Container>
      <Title>channel {ch}</Title>
      <AIValue value={value} priority="high">
        {value}
      </AIValue>
    </Container>
  );
};

export const FAULTContent = ({ ch, value, }) => {
  return (
    <Container>
      <Title>fault {ch}</Title>
      <DIValue value={value} priority="high">
        {value ? "Fault" : "-"}
      </DIValue>
    </Container>
  );
};
export const PCDOContent = ({ ch, value, setCommand }) => {
  return (
    <Container>
      <Title>channel {ch}</Title>
      <DIValue value={value} priority="high">
        {value === true ? "Close" : "Open"}
      </DIValue>
    </Container>
  );
};
export const CMDContent = ({ name, ch, value, setCommand }) => {
  return (
    <Container>
      <Title>{name}</Title>
      <button onClick={() => setCommand({ ch, value })}>set</button>
    </Container>
  );
};
export const PCAIContent = ({ name, value }) => {
  return (
    <Container>
      <Title>{name}</Title>
      <AIValue value={value} priority="high">
        {value}
      </AIValue>
    </Container>
  );
};

