import React, { useState } from "react";
import { ContentBox, TitleLabel } from "../Style";
import  { usePolling } from "../../Hooks/useIpcOn";
import { DOContent } from "../DIOContent";

function IODigitalOutput(params) {
  const { id } = params;
  const setCommand = ({ ch, value }) => {
    const data = {
      id,
      ch,
      value: value ? false : true,
    };
    ipcRenderer.send("set-io-do-cmd", data);
  };
  const [doStatus, setDOStatus] = useState({
    channel1: "",
    channel2: "",
    channel3: "",
    channel4: "",
    channel5: "",
    channel6: "",
  });

  usePolling("set-io-do-status", setDOStatus);

  return (
    <ContentBox>
      <TitleLabel>Digital Output</TitleLabel>
      <DOContent ch={1} value={doStatus.channel1} setCommand={setCommand} />
      <DOContent ch={2} value={doStatus.channel2} setCommand={setCommand} />
      <DOContent ch={3} value={doStatus.channel3} setCommand={setCommand} />
      <DOContent ch={4} value={doStatus.channel4} setCommand={setCommand} />
      <DOContent ch={5} value={doStatus.channel5} setCommand={setCommand} />
      <DOContent ch={6} value={doStatus.channel6} setCommand={setCommand} />
    </ContentBox>
  );
}

export default IODigitalOutput;
