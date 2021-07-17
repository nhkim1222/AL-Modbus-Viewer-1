import React, { useState, useEffect, useRef } from "react";
import { usePolling } from "../../Hooks/useIpcOn";
import { DataContent } from "../DataContent";
import { ContentBox, TitleLabel } from "../Style";

function LDInformation({ partner }) {
  const [information, setInformation] = useState({
    operationState: "UNIDENTIFIED",
    productCode: "R9",
    serialNumber: 10000,
    hardwareRevision: 0,
    applicationVersion: "0.0.000",
    kernelVersion: "0.0.000",
    bootloaderVersion: "0.0.000",
    pcbVersion: 0,
  });
  const channel =
    partner !== true ? "set-ld-information" : "set-ld-information-partner";

  usePolling(channel, setInformation);

  return (
    <ContentBox>
      <TitleLabel>Accura 2750LD {partner ? "(PARTNER)" : ""}</TitleLabel>
      <DataContent
        prop="operationState"
        value={information.operationState}
        priority="high"
      />
      <DataContent
        prop="productCode"
        value={information.productCode}
        priority="high"
      />
      <DataContent
        prop="serialNumber"
        value={information.serialNumber}
        priority="high"
      />
      <DataContent
        prop="hardwareRevision"
        value={information.hardwareRevision}
        priority="high"
      />
      <DataContent
        prop="applicationVersion"
        value={information.applicationVersion}
        priority="high"
      />
      <DataContent
        prop="kernelVersion"
        value={information.kernelVersion}
        priority="high"
      />
      <DataContent
        prop="bootloaderVersion"
        value={information.bootloaderVersion}
        priority="high"
      />
      <DataContent
        prop="pcbVersion"
        value={information.pcbVersion}
        priority="high"
      />
    </ContentBox>
  );
}
export default LDInformation;
