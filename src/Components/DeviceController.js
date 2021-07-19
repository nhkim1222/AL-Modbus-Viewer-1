import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";

import Modal from 'styled-react-modal'
import ApplyButton from './ApplyButton'
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
  width: 20rem;
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
`
const Input = styled.input`
    width: 100%;
    border: 1px solid grey;
    outline: none;
    border-radius: 0px;
    line-height: 2.5rem;
    font-size: 1.2rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
`;
const IPForm = styled.form`

`


function DeviceController() {
  const [modelIsOpen, setIsOpen] = useState(false);
  const [ipAddr, setIpAddr] = useState("localhost");
  const { register, handleSubmit, watch, errors } = useForm();

  useEffect(() => {
    ipcRenderer.on('connect-info', (evt,arg) => {
      const {connectState, ip} = arg;
      if (connectState === true) {
        console.log(ip);
        setIpAddr(ip);
      } else {
        setIpAddr('disconnected');
      }
    })
  });

  const onSubmit = ({ ipAddress }) => {
    setIpAddr(ipAddress);
    closeModal();
    ipcRenderer.send('connect-server', {ip: ipAddress});
    setIpAddr('connecting');
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
      <InfoLabel>connected device IP</InfoLabel>
      <IpAddress>{ipAddr}</IpAddress>
      <button onClick={openModal}>Change connection</button>
      <StyledModal
        isOpen={modelIsOpen}
        onBackgroundClick={closeModal}
        onEscapeKeydown={closeModal}
      >
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <label>ip address</label>
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

            <ApplyButton >Apply</ApplyButton>
          </form>
      </StyledModal>
    </Container>
  );
}

export default DeviceController;
