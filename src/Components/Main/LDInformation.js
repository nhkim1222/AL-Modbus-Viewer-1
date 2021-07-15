import React, { useState } from "react";
import styled from "styled-components";
import useIpcOn from "../../Hooks/useIpcOn";
import { CHANNEL_LD_INFO, CHANNEL_LD_PARTNER_INFO } from "../../Modbus/Channel";
import { DataContent } from "../DataContent";
import { ContentBox, TitleLabel } from "../Style";

function LDInformation({ partner }) {
  const [ldInfo, setLdInfo] = useState({
    operationState: "",
    productCode: "",
    serialNumber: "",
    hardwareRevision: "",
    applicationVersion: "",
    kernelVersion: "",
    bootloaderVersion: "",
    pcbVersion: "",
  });
  const channel = partner ? CHANNEL_LD_PARTNER_INFO : CHANNEL_LD_INFO;
  useIpcOn(channel, (evt, ...args) => {
    setLdInfo(...args);
  });
  return (
    <ContentBox>
      <TitleLabel>Accura 2750LD {partner ? "(PARTNER)" : ""}</TitleLabel>
      <DataContent
        prop="operationState"
        value={ldInfo.operationState}
        priority="high"
      />
      <DataContent
        prop="productCode"
        value={ldInfo.productCode}
        priority="high"
      />
      <DataContent
        prop="serialNumber"
        value={ldInfo.serialNumber}
        priority="high"
      />
      <DataContent
        prop="hardwareRevision"
        value={ldInfo.hardwareRevision}
        priority="high"
      />
      <DataContent
        prop="applicationVersion"
        value={ldInfo.applicationVersion}
        priority="high"
      />
      <DataContent
        prop="kernelVersion"
        value={ldInfo.kernelVersion}
        priority="high"
      />
      <DataContent
        prop="bootloaderVersion"
        value={ldInfo.bootloaderVersion}
        priority="high"
      />
      <DataContent
        prop="pcbVersion"
        value={ldInfo.pcbVersion}
        priority="high"
      />
    </ContentBox>
  );
}
export default LDInformation;
