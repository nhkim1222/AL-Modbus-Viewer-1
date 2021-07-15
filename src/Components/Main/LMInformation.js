import React, { useState } from "react";
import styled from "styled-components";
import { DataContent } from "../DataContent";
import { ContentBox, TitleLabel } from "../Style";
import useIpcOn from "../../Hooks/useIpcOn";
import { CHANNEL_LM_INFO, CHANNEL_LM_PARTNER_INFO } from "../../Modbus/Channel";

function LMInformation({ partner }) {
  const [information, setInformation] = useState({
    operationState: 0,
    productCode: 0,
    serialNumber: 0,
    hardwareRevision: 0,
    pcbVersion: 0,
    applicationVersion: "0.0.000",
    bootloaderVersion: "0.0.000",
  });
  const channel = !partner ? CHANNEL_LM_INFO : CHANNEL_LM_PARTNER_INFO;
  useIpcOn(channel, (evt, ...args) => {
    setInformation(...args);
  });
  return (
    <ContentBox>
      <TitleLabel>
        Accura 2750LM {partner === true ? "(PARTNER)" : ""}
      </TitleLabel>
      <DataContent
        prop="operation state"
        value={information.operationState}
        invalid={information.operationState === "UNIDENIFIED"}
        priority="high"
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
export default LMInformation;
