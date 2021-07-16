import React, { useState } from "react";
import { useForm } from "react-hook-form";

import styled from "styled-components";
import useIpcOn from "../../Hooks/useIpcOn";
import { CHANNEL_LM_SETUP } from "../../Modbus/Channel";

const FormBox = styled.form`
  display: inline-block;
  flex-direction: column;
  justify-content: right;
  background-color: white;
  align-items: baseline;
  margin: 10px;
  border-radius: 5px;
  padding: 10px;
`;

const Label = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  color: grey;
  width: 100px;
  height: 24px;
  padding-left: 1px;
  font-size: 10px;
`;
const Container = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 5px;
  border-bottom: 0.5px solid rgba(100, 100, 100, 0.2);
`;
const SubmitContainer = styled.div`
  display: inline-block;
  align-items: center;
  justify-content: right;
`;
const Select = styled.select`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
  width: 100%;
  height: 24px;
  font-size: 12px;
  font-weight: ${(props) => (props.priority === "high" ? 600 : 400)};
  color: ${(props) => (props.invalid ? "red" : "rgba(10,10,10,1)")};
  border: 0px;
  text-align-last: center;
  text-align: center;
  -ms-text-align-last: center;
  -moz-text-align-last: center;
`;

const Option = styled.option`
  display: flex;
`;

const Apply = styled.input.attrs("submit")`
  display: inline-flex;
  outline: none;
  border: none;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;
  margin: 5px;
  justify-content: center;
  width: 100%;
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

function A2750LMSetup() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  const [inputs, setInputs] = useState({
    operationMode: 0,
    digitalOperation: 0,
    analogDeadband: 0,
    alarmThreshold: 0,
  });
  const operationMode = watch('operationMode');
  const digitalOperation = watch('digitalOperation');
  const analogDeadband = watch('analogDeadband');
  const alarmThreshold = watch('alarmThreshold');

  useIpcOn(CHANNEL_LM_SETUP, (evt, ...args) => {
    const setup = args;
    console.log(setup);
    setValue("operationMode", setup.operationMode);
    setValue("digitalOperation", setup.digitalOperation);
    setValue("analogDeadband", setup.analogDeadband);
    setValue("alarmThreshold", setup.alarmThreshold);
  });

  return (
    <FormBox onSubmit={handleSubmit(onSubmit)}>
      <Container>
        <Label>operation mode</Label>
        <Select name="operationMode" ref={register("operationMode")}>
          <Option value={0}>StandAlone</Option>
          <Option value={1}>2-Active</Option>
        </Select>
      </Container>
      <Container>
        <Label>digital operation</Label>
        <Select ref={register("digitalOperation")} defaultValue={1}>
          <option value={0}>AND</option>
          <option value={1}>OR </option>
        </Select>
      </Container>
      <Container>
        <Label>analog deadband</Label>
        <input  ref={register("analogDeadband")} defaultValue={0}></input>
      </Container>
      <Container>
        <Label>alarm threshold</Label>
        <input name="alarmThreshold"  ref={register("alarmThreshold")} defaultValue={0}></input>
      </Container>
      <SubmitContainer>
        <Apply type="submit" value="submit"></Apply>
      </SubmitContainer>
    </FormBox>
  );
}

export default A2750LMSetup;
