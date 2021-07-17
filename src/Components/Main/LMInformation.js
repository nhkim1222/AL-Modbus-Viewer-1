import React, { useState, useEffect, useRef } from "react";
import { usePolling } from "../../Hooks/useIpcOn";
import { DataContent } from "../DataContent";
import { ContentBox, TitleLabel } from "../Style";

const operation_state = (val) => {
  if (val === 1) return "Bootloader";
  if (val === 2) return "Application";
  return "UNIDENIFIED";
};

function LMInformation({ partner }) {
  const [information, setInformation] = useState({
    operationState: 1,
    productCode: 0,
    serialNumber: 0,
    hardwareRevision: 0,
    pcbVersion: 0,
    applicationVersion: 0,
    bootloaderVersion: 0,
  });

  if (partner !== true) usePolling("set-lm-information", setInformation);
  else usePolling("set-lm-information-partner", setInformation);

  return (
    <ContentBox>
      <TitleLabel>Accura 2750LM {partner ? "(P)" : "(A)"}</TitleLabel>
      <DataContent
        prop="operation state"
        value={operation_state(information.operationState)}
      />
      <DataContent prop="produrct code" value={information.productCode} />
      <DataContent
        prop="serial number"
        value={information.serialNumber}
      ></DataContent>
      <DataContent
        prop="hardware revision"
        value={information.hardwareRevision}
      />
      <DataContent prop="pcb version" value={information.pcbVersion} />
      <DataContent
        prop="application version"
        value={information.applicationVersion}
      />
      <DataContent
        prop="bootloader version"
        value={information.bootloaderVersion}
      />
    </ContentBox>
  );
}
export default LMInformation;
