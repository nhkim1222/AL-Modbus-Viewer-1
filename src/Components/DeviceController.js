import React, { useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { useForm } from "react-hook-form";
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

function DeviceController() {
  const [modelIsOpen, setIsOpen] = useState(false);
  const [ipAddr, setIpAddr] = useState("localhost");
  const { register, handleSubmit, watch, errors } = useForm();

  const onSubmit = ({ ipAddress }) => {
    setIpAddr(ipAddress);
    closeModal();
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
      <Modal
        isOpen={modelIsOpen}
        onRequestClose={closeModal}
        contentLabel="example"
      >
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <label>ip address</label>
          <input
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
          {errors.ipAddress && "ipaddress is invalid"}
          <input type="submit" />
        </form>
      </Modal>
    </Container>
  );
}

export default DeviceController;
