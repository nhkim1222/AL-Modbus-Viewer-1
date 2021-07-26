import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import {
  DataContainer,
  DataField,
  FormLabel,
  FormText,
  FormSelect,
  FormApply,
  TitleLabel,
} from "../Style";

const { ipcRenderer } = window.require("electron");

const SubmitContainer = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  margin: 0px;
  align-items: center;
  justify-content: center;
`;

function LMCommonSetup() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const [inputs, setInputs] = useState({
    operationMode: 0,
    digitalOperation: 0,
    analogDeadband: 0,
    alarmThreshold: 0,
  });

  useEffect(() => {
    ipcRenderer.on("set-lm-setup", (evt, args) => {
      setValue("operationMode", args.operationMode);
      setValue("digitalOperation", args.digitalOperation);
      setValue("analogDeadband", args.analogDeadband);
      setValue("alarmThreshold", args.alarmThreshold);
    });

    ipcRenderer.send("get-lm-setup");
    return () => {
      ipcRenderer.removeAllListeners("set-lm-setup");
    };
  }, []);

  const onSubmit = (data) => {
    ipcRenderer.send("set-lm-setup", data);
    ipcRenderer.send("get-lm-setup");
  };

  return (
    <DataContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TitleLabel style={{ color: "black" }}>LM Common setup</TitleLabel>
        <DataField>
          <FormLabel>operation mode</FormLabel>
          <FormSelect name="operationMode" {...register("operationMode")}>
            <option value={0}>StandAlone</option>
            <option value={1}>2-Active</option>
          </FormSelect>
        </DataField>
        <DataField>
          <FormLabel>digital operator</FormLabel>
          <FormSelect name="digitalOperator" {...register("digitalOperator")}>
            <option value={0}>AND</option>
            <option value={1}>OR</option>
          </FormSelect>
        </DataField>
        <DataField>
          <FormLabel>analog deadband</FormLabel>
          <FormText
            type="text"
            {...register("analogDeadband")}
            defaultValue={0}
          />
        </DataField>
        <DataField>
          <FormLabel>alarm threshold</FormLabel>
          <FormText
            type="text"
            {...register("alarmThreshold")}
            defaultValue={0}
          />
        </DataField>
        <SubmitContainer>
          <FormApply type="submit" value="apply"></FormApply>
        </SubmitContainer>
      </form>
    </DataContainer>
  );
}

export default LMCommonSetup;
