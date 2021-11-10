import React, { useState } from "react";
import styled from 'styled-components';

import { ContentBox, TitleLabel } from "../Style";
import { usePolling } from "../../Hooks/useIpcOn";
import { AIContent } from "../DIOContent";

export const MainContainer = styled.div`
  display: inline-block;
  justify-content: left;
  align-items: baseline;
  margin: 10px;
  border-radius: 5px;
  padding: 0px;
`;

function IOAnalogInput(params) {
  const { id } = params;

  const [aiStatus, setAiStatus] = useState({
    channel1: 0,
    channel2: 0,
    channel3: 0,
    channel4: 0,
    channel5: 0,
    channel6: 0,
    channel7: 0,
    channel8: 0,
    channel9: 0,
    channel10: 0,
    channel11: 0,
    channel12: 0,
  });
  

  usePolling("set-io-ai-status", setAiStatus);

  return (
    <ContentBox>
      <TitleLabel>Analog Input</TitleLabel>
      <AIContent ch={1} value={aiStatus.channel1} />
      <AIContent ch={2} value={aiStatus.channel2} />
      <AIContent ch={3} value={aiStatus.channel3} />
      <AIContent ch={4} value={aiStatus.channel4} />
      <AIContent ch={5} value={aiStatus.channel5} />
      <AIContent ch={6} value={aiStatus.channel6} />
      <AIContent ch={7} value={aiStatus.channel7} />
      <AIContent ch={8} value={aiStatus.channel8} />
      <AIContent ch={9} value={aiStatus.channel9} />
      <AIContent ch={10} value={aiStatus.channel10} />
      <AIContent ch={11} value={aiStatus.channel11} />
      <AIContent ch={12} value={aiStatus.channel12} />
    </ContentBox>
  );
}

export default IOAnalogInput;
