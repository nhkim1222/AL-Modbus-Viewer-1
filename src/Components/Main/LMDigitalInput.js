import React, { useState } from "react";
import { ContentBox, TitleLabel } from "../Style";
import useIpcOn, { usePolling } from "../../Hooks/useIpcOn";
import { CHANNEL_LM_DI_STATUS } from "../../Modbus/Channel";
import { DIContent } from "../DIOContent";

function LMDigitalInput() {
  const setCommand = ({ ch, value }) => {
    const data = {
      ch,
      value: value ? false : true,
    };
    ipcRenderer.send("set-lm-di-test-cmd", data);
  };
  const [diStatus, setDiStatus] = useState({
    channel1: false,
    channel2: false,
    channel3: false,
    channel4: false,
    channel5: false,
    channel6: false,
    channel7: false,
    channel8: false,
    channel9: false,
    channel10: false,
    channel11: false,
    channel12: false,
    channel13: false,
    channel14: false,
    channel15: false,
    channel16: false,
    channel17: false,
    channel18: false,
  });

  usePolling("set-lm-di-status", setDiStatus);

  return (
    <ContentBox>
      <TitleLabel>Digital Input</TitleLabel>
      <DIContent ch={1} value={diStatus.channel1} setCommand={setCommand}/>
      <DIContent ch={2} value={diStatus.channel2} setCommand={setCommand}/>
      <DIContent ch={3} value={diStatus.channel3} setCommand={setCommand}/>
      <DIContent ch={4} value={diStatus.channel4} setCommand={setCommand}/>
      <DIContent ch={5} value={diStatus.channel5} setCommand={setCommand}/>
      <DIContent ch={6} value={diStatus.channel6} setCommand={setCommand}/>
      <DIContent ch={7} value={diStatus.channel7} setCommand={setCommand}/>
      <DIContent ch={8} value={diStatus.channel8} setCommand={setCommand}/>
      <DIContent ch={9} value={diStatus.channel9} setCommand={setCommand}/>
      <DIContent ch={10} value={diStatus.channel10} setCommand={setCommand}/>
      <DIContent ch={11} value={diStatus.channel11} setCommand={setCommand}/>
      <DIContent ch={12} value={diStatus.channel12} setCommand={setCommand}/>
      <DIContent ch={13} value={diStatus.channel13} setCommand={setCommand}/>
      <DIContent ch={14} value={diStatus.channel14} setCommand={setCommand}/>
      <DIContent ch={15} value={diStatus.channel15} setCommand={setCommand}/>
      <DIContent ch={16} value={diStatus.channel16} setCommand={setCommand}/>
      <DIContent ch={17} value={diStatus.channel17} setCommand={setCommand}/>
      <DIContent ch={18} value={diStatus.channel18} setCommand={setCommand}/>
    </ContentBox>
  );
}

export default LMDigitalInput;
