import React, { useState, useEffect, useRef } from "react";
import { usePolling } from "../../Hooks/useIpcOn";
import { DataContent } from "../DataContent";
import { ContentBox, TitleLabel } from "../Style";
const operation_state = (val) => {
  if (val === 1) return "Bootloader";
  if (val === 2) return "Application";
  return "UNIDENIFIED";
};
function LDInformation({ partner }) {
  const [information, setInformation] = useState({
    operationState: 0,
    productCode: 0,
    serialNumber: 0,
    hardwareRevision: 0,
    applicationVersion: 0,
    kernelVersion: 0,
    bootloaderVersion: 0,
    pcbVersion: 0,
  });
  const channel =
    partner !== true ? "set-ld-information" : "set-ld-information-partner";

  usePolling(channel, setInformation);

  return (
    <ContentBox>
      <TitleLabel>Accura 2750LD {partner ? "(P)" : "(A)"}</TitleLabel>
      <DataContent
        prop="operationState"
        value={operation_state(information.operationState)}
        invalid={information.operationState === 0}
        priority="high"
      />
      <DataContent prop="productCode" value={information.productCode} />
      <DataContent prop="serialNumber" value={information.serialNumber} />
      <DataContent
        prop="hardwareRevision"
        value={information.hardwareRevision}
      />
      <DataContent
        prop="applicationVersion"
        value={information.applicationVersion}
      />
      <DataContent prop="kernelVersion" value={information.kernelVersion} />
      <DataContent
        prop="bootloaderVersion"
        value={information.bootloaderVersion}
      />
      <DataContent prop="pcbVersion" value={information.pcbVersion} />
    </ContentBox>
  );
}
export default LDInformation;
