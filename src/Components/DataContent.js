import React from "react";
import styled from "styled-components";

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

const Value = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
  width: 100px;
  height: 24px;
  font-weight: ${(props) => (props.priority === "high" ? 600 : 400)};
  color: ${(props) => (props.invalid ? "red" : "rgba(10,10,10,1)")};
`;

export const DataContent = ({ prop, value, invalid, priority }) => {
  return (
    <Container>
      <Title>{prop}</Title>
      <Value invalid={invalid} priority={priority}>
        {value}
      </Value>
    </Container>
  );
};
