import React from "react";
import styled, { keyframes } from "styled-components";
import { set, useForm } from "react-hook-form";
import oc from "open-color";
import Modal from "styled-react-modal";
import ApplyButton from "./ApplyButton";
import LMAlarm from "./Main/LMAlarm";
import { useInterval } from "../Hooks/useInterval";
const { ipcRenderer } = window.require("electron");

const pattern =
  /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

const StyledModal = Modal.styled`
  width: 200px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
`;
const Input = styled.input`
  width: 100%;
  border: 1px solid grey;
  outline: none;
  border-radius: 0px;
  line-height: 1.2rem;
  font-size: 12px;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`;
const IPForm = styled.form`
  padding: 10px;
`;

const IPLabel = styled.label`
  font-size: 10px;
  font-weight: 600;
  color: black;
`;

function DeviceConfig(modelIsOpen, closeModal) {
  const { register, handleSubmit, watch, errors } = useForm();

  const onSubmit = () => {};

  const onError = () => {};

  return (
    <IPForm onSubmit={handleSubmit(onSubmit, onError)}>
          <IPLabel>ip address</IPLabel>
          <Input
            type="text"
            defaultValue="0.0.0.0"
            placeholder="ip address"
            {...register("ipAddress", {
              pattern: {
                value: pattern,
                message: "invalid ip address",
              },
              required: true,
            })}
          />

          <ApplyButton>Apply</ApplyButton>
    </IPForm>
  );
}

export default DeviceConfig;
