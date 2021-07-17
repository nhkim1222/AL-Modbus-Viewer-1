import React, { useState } from "react";
import styled from "styled-components";
import { DataContent } from "../DataContent";
import { ContentBox, TitleLabel } from "../Style";
import useIpcOn from "../../Hooks/useIpcOn";
import { SLICE_CHANNEL_IO_INFO } from "../../Modbus/Channel";

function IOInformation(params) {
  const { id } = params;

  const [information, setInformation] = useState({
    operationState: 0,
    moduleType: 0,
    productCode: 0,
    serialNumber: 0,
    hardwareRevision: 0,
    pcbVersion: 0,
    applicationVersion: "0.0.000",
    bootloaderVersion: "0.0.000",
  });
  const channel = `${SLICE_CHANNEL_IO_INFO}_${parseInt(id)}`;

  useIpcOn(channel, (evt, ...args) => {
    setInformation(...args);
  });
  return (
    <ContentBox>
      <TitleLabel>Accura 2750IO</TitleLabel>
      <DataContent
        prop="operation state"
        value={information.operationState}
        invalid={information.operationState === "UNIDENIFIED"}
        priority="high"
      ></DataContent>
      <DataContent
        prop="module type"
        value={information.moduleType}
        invalid={information.moduleType === "Invalid"}
      ></DataContent>
      <DataContent
        prop="produrct code"
        value={information.productCode}
      ></DataContent>
      <DataContent
        prop="serial number"
        value={information.serialNumber}
      ></DataContent>
      <DataContent
        prop="hardware revision"
        value={information.hardwareRevision}
      ></DataContent>
      <DataContent
        prop="pcb version"
        value={information.pcbVersion}
      ></DataContent>
      <DataContent
        prop="application version"
        value={information.applicationVersion}
      ></DataContent>
      <DataContent
        prop="bootloader version"
        value={information.bootloaderVersion}
      ></DataContent>
    </ContentBox>
  );
}
export default IOInformation;
