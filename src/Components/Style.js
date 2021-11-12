import React from "react";
import styled from "styled-components";

export const ContentBox = styled.div`
  display: inline-block;
  justify-content: left;
  align-items: baseline;
  margin: 10px;
  border-radius: 5px;
  padding: 0px;
`;

const FormBox = styled.form`
  display: inline-block;
  flex-direction: column;
  justify-content: right;
  align-items: baseline;
  margin: 5px;
`;

export const DataField = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 3px;
  border-bottom: 0.5px solid rgba(100, 100, 100, 0.2);
`;

export const FormLabel = styled.label`
  display: flex;
  justify-content: left;
  align-items: center;
  color: grey;
  width: 100px;
  height: 24px;
  padding-left: 1px;
  font-size: 10px;
`;

export const FormText = styled.input.attrs((props) => ({ type: "text" }))`
  display: block;
  line-height: 24px;
  font-weight: 600;
  padding: 5px;
  width: 100%;
  font-size: 12px;
  font-family: inherit;
  border: 1px solid #999;
  outline-style: none;
  --webkit-appearance: none;
  --moz-appearance: none;
  border-radius: 0;
  text-align: center;
  padding: 0px;
  transition: 0.1s ease-in;
  :focus {
    border-bottom-color: darksalmon;
  }
`;

export const FormSelect = styled.select`
  display: block;
  font-size: 12px;
  font-weight: 600;
  height: 26px;
  padding: 5px;
  width: 100%;
  font-family: inherit;
  border: 1px solid #999;
  outline-style: none;
  --webkit-appearance: none;
  --moz-appearance: none;
  text-align-last: center;
  border-radius: 0;
  text-align: center;
  padding: 0px;
  transition: 0.1s ease-in;
  :focus {
    border: 1px solid darksalmon;
  }
`;
export const FormApply = styled.input.attrs("submit")`
  display: inline-flex;
  outline: none;
  border: none;
  border-radius: 1px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;
  margin: 5px;
  justify-content: center;
  width: auto;
  height: 26px;
  background: #228be6;
  &:hover {
    background: #339af0;
  }
  &:active {
    background: #1c7ed6;
  }
  font-size: 12px;
`;
export const TitleLabel = styled.div`
  display: flex;
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
  color: rgba(10, 10, 10, 0.8);
  font-weight: 600;
  font-size: 14px;
`;

export const DataContainer = styled.div`
  display: flex;
  flex-direction: row;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
  padding: 10px;
`;

export const DataSubContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
