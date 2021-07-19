import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { set, useForm } from "react-hook-form";

import Modal from "styled-react-modal";
import ApplyButton from "./ApplyButton";
import A2750LMSetup from "./Main/LMSetup";
import LMAlarm from "./Main/LMAlarm";
import { useInterval } from "../Hooks/useInterval";
const { ipcRenderer } = window.require("electron");

const pattern =
  /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
const Container = styled.div`
  color: black;
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const InfoLabel = styled.label`
  color: #fafafa;
  font-size: 10px;
  margin-bottom: 5px;
`;
const IpAddress = styled.label`
  color: white;
  font-weight: 600;
  font-size: 15px;
  margin-bottom: 5px;
`;

const DialogContainer = styled.div`
  height: 100%;
  background-color: grey;
`;

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

const StateToDisplay = (state) => {
  switch (state) {
    case 0:
      return "CONNECTING...";
    case 1:
      return "CONNECTED";
    case 2:
      return "DISCONNECTED";
    default:
      return "INVALID";
  }
};

const STATE_CONNECTING = 0;
const STATE_CONNECTED = 1;
const STATE_DISCONNECTED = 2;

function DeviceController() {
  const [modelIsOpen, setIsOpen] = useState(false);
  const [ipAddr, setIpAddr] = useState("10.10.23.49");
  const [state, setState] = useState(STATE_DISCONNECTED);

  const { register, handleSubmit, watch, errors } = useForm();

  useEffect(() => {
    ipcRenderer.on("connect-info", (evt, arg) => {
      const { connectState, ip } = arg;
      console.log(arg);
      if (connectState === true) {
        setState(STATE_CONNECTED);
      } else {
        console.log("disconnected..");
        setState(STATE_DISCONNECTED);
      }
    });

    ipcRenderer.on("server-connection-state", (evt, isConnected) => {
      if (isConnected === false) {
        console.log("disconnected from server");
        setState(STATE_DISCONNECTED);
      }
    });

    console.log("send connect server");
    ipcRenderer.send("connect-server", { ip: ipAddr });
    setState(STATE_CONNECTING);
    return () => {
      ipcRenderer.removeAllListeners("connect-info");
    };
  }, []);

  useInterval(() => {
    if (state === STATE_DISCONNECTED) {
      console.log("connect... try...");
      ipcRenderer.send("connect-server", { ip: ipAddr });
      setState(STATE_CONNECTING);
    } else if (state === STATE_CONNECTED) {
      ipcRenderer.send("get-connect-server-state");
    }
  }, 5000);

  const onSubmit = ({ ipAddress }) => {
    setIpAddr(ipAddress);
    closeModal();
    ipcRenderer.send("connect-server", { ip: ipAddress });
    setState(STATE_CONNECTING);
  };
  const onError = (error) => {
    console.log(error);
  };
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Container>
      <InfoLabel>device IP</InfoLabel>
      <IpAddress>{ipAddr}</IpAddress>
      <InfoLabel>{StateToDisplay(state)}</InfoLabel>
      <ApplyButton onClick={openModal}>Change connection</ApplyButton>
      <LMAlarm></LMAlarm>
      <A2750LMSetup />
      <StyledModal isOpen={modelIsOpen} onEscapeKeydown={closeModal}>
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
      </StyledModal>
    </Container>
  );
}

export default DeviceController;
