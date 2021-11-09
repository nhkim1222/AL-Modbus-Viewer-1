import React, { useState } from "react";
import styled from "styled-components";
import { DataContent } from "../DataContent";
import { ContentBox, TitleLabel } from "../Style";
import { usePolling } from "../../Hooks/useIpcOn";

const operation_state = (val) => {
  if (val === 2) return "Bootloader";
  if (val === 3) return "Application";
  return "UNIDENIFIED";
};

const io_module_type = (val) => {
  switch (val) {
    case 0:
      return "invalid";
    case 1:
      return "A2750IO-DI";
    case 2:
      return "A2750IO-DO";
    case 3:
      return "A2750IO-AI";
    case 4:
      return "A2750IO-DI2";
    case 5:
      return "A2750IO-DIO";
    case 6:
      return "A2750IO-DO2";
    case 7:
      return "A2750IO-AIO";
    case 8:
      return "A2750IO-AI2";
  }
};
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

  usePolling('set-io-information', setInformation);

  return (
    <ContentBox>
      <TitleLabel>Accura 2750IO</TitleLabel>
      <DataContent
        prop="operation state"
        value={operation_state(information.operationState)}
        invalid={information.operationState === 0}
        priority="high"
      ></DataContent>
      <DataContent
        prop="module type"
        value={io_module_type(information.moduleType)}
        invalid={information.moduleType === 0}
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
