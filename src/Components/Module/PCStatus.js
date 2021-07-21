import React, { useState } from "react";
import styled from "styled-components";
import { DataContent } from "../DataContent";
import { ContentBox, TitleLabel } from "../Style";
import { usePolling } from "../../Hooks/useIpcOn";

const operation_state = (val) => {
  if (val === false) return "STOP";
  if (val === true) return "RUN";
  return "UNIDENIFIED";
};
const remote_state = (val) => {
    if (val === false) return "Local";
    if (val === true) return "Remote";
    return "UNIDENIFIED";
  };
const toStringState = (val) => {
    if (val === false) return "OFF";
    if (val === true) return "ON";
    return "UNIDENIFIED";
  };
function PCStatus(params) {
  const { id } = params;

  const [status, setStatus] = useState({
    startingblock: 0,
    operationState: 0,
    remotemode: 0,
    abnormal: 0,
    alarm: 0,
    fault: 0,
  });

  usePolling('set-pc-status', setStatus);

  return (
    <ContentBox>
      <TitleLabel>Accura 2750PC status</TitleLabel>      
      <DataContent
        prop="starting block"
        value={toStringState(status.startingblock)}
      ></DataContent>
      <DataContent
        prop="operation state"
        value={operation_state(status.operationState)}
        invalid={status.operationState === false}
        priority="high"
      ></DataContent>
      <DataContent
        prop="remode mode"
        value={remote_state(status.remotemode)}
        invalid={status.remotemode === true}
        priority="high"
      ></DataContent>
      <DataContent
        prop="abnormal"
        value={toStringState(status.abnormal)}
      ></DataContent>
      <DataContent
        prop="alarm"
        value={toStringState(status.alarm)}
      ></DataContent>
      <DataContent
        prop="fault"
        value={toStringState(status.fault)}
      ></DataContent>
    </ContentBox>
  );
}
export default PCStatus;
