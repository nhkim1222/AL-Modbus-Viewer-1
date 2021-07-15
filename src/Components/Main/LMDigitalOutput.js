import React, { useState } from "react";
import { ContentBox, TitleLabel } from "../Style";
import useIpcOn from "../../Hooks/useIpcOn";
import {
  CHANNEL_LM_DO_COMMAND,
  CHANNEL_LM_DO_STATUS,
} from "../../Modbus/Channel";
import { DOContent } from "../DIOContent";

function LMDigitalOutput() {
  const setCommand = ({ ch, value }) => {
    console.log(`command = ${ch}`);
    const data = {
      ch,
      value: value === "Close" ? 0 : 1,
    };
    ipcRenderer.send(CHANNEL_LM_DO_COMMAND, data);
  };
  const [doStatus, setDOStatus] = useState({
    channel1: "",
    channel2: "",
    channel3: "",
    channel4: "",
    channel5: "",
    channel6: "",
    channel7: "",
    channel8: "",
    channel9: "",
  });

  useIpcOn(CHANNEL_LM_DO_STATUS, (evt, ...args) => {
    setDOStatus(...args);
  });
  return (
    <ContentBox>
      <TitleLabel>Digital Output</TitleLabel>
      <DOContent ch={1} value={doStatus.channel1} setCommand={setCommand} />
      <DOContent ch={2} value={doStatus.channel2} setCommand={setCommand} />
      <DOContent ch={3} value={doStatus.channel3} setCommand={setCommand} />
      <DOContent ch={4} value={doStatus.channel4} setCommand={setCommand} />
      <DOContent ch={5} value={doStatus.channel5} setCommand={setCommand} />
      <DOContent ch={6} value={doStatus.channel6} setCommand={setCommand} />
      <DOContent ch={7} value={doStatus.channel7} setCommand={setCommand} />
      <DOContent ch={8} value={doStatus.channel8} setCommand={setCommand} />
      <DOContent ch={9} value={doStatus.channel9} setCommand={setCommand} />
    </ContentBox>
  );
}

export default LMDigitalOutput;
