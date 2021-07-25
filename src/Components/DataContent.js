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

const Input = styled.input`
  justify-content: center;
  align-items: center;
  margin-left: 5px;
  width: 100px;
  line-height: 24px;
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

export const InputContent = (props) => {
  return (
    <Container>
      <Title>{props.name}</Title>
      <Input type="text" name={props.name}></Input>
    </Container>
  );
};

export const FieldSet = ({ label, children }) => {
  return (
    <FieldContainer>
      {label && <Legend>{label}</Legend>}
      <Wrapper>{children}</Wrapper>
    </FieldContainer>
  );
};
const FieldContainer = styled.fieldset`
  margin: 16px 0;
  padding: 0;
  border: none;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: self-start;
`;

const Legend = styled.legend`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
`;
