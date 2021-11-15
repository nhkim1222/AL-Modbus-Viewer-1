import React, { useState, useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import styled from "styled-components";

const Container = styled.div`
  width: 600px;
`;
const FormSelect = styled.select`
  display: block;
  font-size: 12px;
  font-weight: 600;
  height: 26px;
  width: 120px;
  font-family: inherit;
  align-items: center;
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

const FormLabel = styled.label`
  display: flex;
  justify-content: left;
  align-items: center;
  color: grey;
  width: 120px;
  height: 24px;
  padding-left: 1px;
  font-size: 10px;
  margin-left: 10px;
`;

const DataField = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 3px;
  border-bottom: 0.5px solid rgba(100, 100, 100, 0.2);
`;

const TitleLabel = styled.div`
  display: flex;
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
  color: rgba(10, 10, 10, 0.8);
  font-weight: 600;
  font-size: 14px;
`;
const SubmitContainer = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  margin: 0px;
  align-items: center;
  justify-content: flex-start;
`;
const FormApply = styled.input.attrs("submit")`
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

const DataContainer = styled.div`
  display: flex;
  flex-direction: row;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
  padding: 10px;
`;
const DataContainer2 = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  width: 100vw;
  height: auto;
  flex-wrap: no-wrap;
  overflow-x: auto;
  padding: 10px;
`;
const FormText = styled.input.attrs((props) => ({ type: "text" }))`
  display: block;
  line-height: 24px;
  font-weight: 600;
  padding: 5px;
  width: 120px;
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

const FieldContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

function AISetup(props) {
  const { id } = props;
  const type = 8;
  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const callback = (evt, args) => {
        for (var i = 0; i < 11; i++) {
            setValue(`ioh_ai2[${i+1}].inputType` , 0);
            setValue(`ioh_ai2[${i+1}].unitType` , 0);
            setValue(`ioh_ai2[${i+1}].mapping` , 0);
            setValue(`ioh_ai2[${i+1}].minValue` , 0);
            setValue(`ioh_ai2[${i+1}].maxValue` , 0);
        }
    };
    ipcRenderer.on("set-ioh-ai-setup", callback);

    const ai_setup = [];
    for (var i = 0; i < 11; i++) {
      ai_setup.push({
        ch: i,
        ai_type: 0,
        unit: 0,
        mapping: 0,
        min_value: 0,
        max_value: 0,
      });
    }

    append(ai_setup);
  }, []);

  const { fields, append, insert } = useFieldArray({
    control: control,
    name: "ioh_ai2",
  });

  const onSubmit = (data) => {};

  return (
    <DataContainer2>
      <form>
        <SubmitContainer>
          <TitleLabel style={{ color: "black" }}>AI Logic Setup</TitleLabel>
          <FormApply type="submit" value="apply"></FormApply>
        </SubmitContainer>
        {fields.map((field) => {
          return (
            <FieldContainer key={field.ch}>
              <DataField>
                <FormLabel>AI1 InputType</FormLabel>
                <FormSelect>
                  <option value={0}>4-20</option>
                  <option value={1}>0-20</option>
                </FormSelect>
              </DataField>
              <DataField>
                <FormLabel>AI1 Unit type</FormLabel>
                <FormSelect>
                  <option value={0}>No trans</option>
                  <option value={1}>%</option>
                  <option value={2}>V</option>
                  <option value={3}>A</option>
                  <option value={4}>C</option>
                  <option value={5}>F</option>
                  <option value={6}>l</option>
                  <option value={7}>m3</option>
                  <option value={8}>bar</option>
                </FormSelect>
              </DataField>
              <DataField>
                <FormLabel>AI1 Mapping</FormLabel>
                <FormText></FormText>
              </DataField>
              <DataField>
                <FormLabel>AI1 Min Value</FormLabel>
                <FormText></FormText>
              </DataField>
              <DataField>
                <FormLabel>AI1 Max Value</FormLabel>
                <FormText></FormText>
              </DataField>
            </FieldContainer>
          );
        })}
      </form>
    </DataContainer2>
  );
}

export default AISetup;
