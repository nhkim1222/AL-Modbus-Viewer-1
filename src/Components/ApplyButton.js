import React from "react";
import styled from "styled-components";
import oc from "open-color";

const Wrapper = styled.input.attrs({
  type: "submit",
})`
  margin-top: 1rem;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;

  background: ${oc.teal[6]};
  color: white;

  text-align: center;
  font-size: 12px;
  font-weight: 500;
  border: 0px;
  cursor: pointer;
  user-select: none;
  transition: 0.2s all;

  &:hover {
    background: ${oc.teal[5]};
  }

  &:active {
    background: ${oc.teal[7]};
  }
  margin-bottom: 15px;
`;

const ApplyButton = ({ name, onClick }) => (
  <Wrapper onClick={onClick} value={name}></Wrapper>
);

export default ApplyButton;
