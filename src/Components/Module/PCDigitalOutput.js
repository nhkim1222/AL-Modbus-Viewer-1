import React, { useState } from "react";
import { ContentBox, TitleLabel } from "../Style";
import  { usePolling } from "../../Hooks/useIpcOn";
import { CMDContent } from "../DIOContent";
import { DOContent } from "../DIOContent";
import styled from 'styled-components';


function PCDigitalOutput(params) {
  const { id } = params;
  
  const [status, setStatus] = useState({
    startingblock: 0,
  });

  usePolling('set-pc-status', setStatus);

  const setCommand = ({ ch, value }) => {
    console.log("set command ");
    const data = {
      id,
      ch,
      value: true,
    };
    ipcRenderer.send("set-pc-do-cmd", data);
  };

 const setCommand2 = ({ ch, value }) => {
    const data = {
      id,
      ch,
      value: value ? false : true,
    };
    console.log(`ch=${ch}, value=${data.value}`);
    ipcRenderer.send("set-pc-do-cmd", data);
  };

  
  return (
    <ContentBox>
      <TitleLabel>Command</TitleLabel>
      <CMDContent name={'Start Command'} setCommand={setCommand} ch={1}/>   
      <CMDContent name={'Stop Command'} setCommand={setCommand} ch={2}/>  
      <DOContent value={status.startingblock} setCommand={setCommand2} ch={3} />
    </ContentBox>
  );
}

export default PCDigitalOutput;
