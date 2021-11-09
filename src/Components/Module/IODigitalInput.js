import React, { useState } from "react";
import { ContentBox, TitleLabel } from "../Style";
import { usePolling } from "../../Hooks/useIpcOn";
import { DIContent } from "../DIOContent";

function IODigitalInput(params) {  
  const { id } = params;
  const type  = 5;
  const setCommand = ({ ch, value }) => {
    const data = {
      id,
      type,
      ch,
      value: value ? false : true,
    };
    ipcRenderer.send("set-iom-di-test-cmd", data);
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
  });
  

  usePolling("set-io-di-status", setDiStatus);

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
    </ContentBox>
  );
}

export default IODigitalInput;
