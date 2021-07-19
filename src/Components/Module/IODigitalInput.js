import React, { useState } from "react";
import { ContentBox, TitleLabel } from "../Style";
import { usePolling } from "../../Hooks/useIpcOn";
import { DIContent } from "../DIOContent";

function IODigitalInput(params) {
  const { id } = params;

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
      <DIContent ch={1} value={diStatus.channel1} />
      <DIContent ch={2} value={diStatus.channel2} />
      <DIContent ch={3} value={diStatus.channel3} />
      <DIContent ch={4} value={diStatus.channel4} />
      <DIContent ch={5} value={diStatus.channel5} />
      <DIContent ch={6} value={diStatus.channel6} />
      <DIContent ch={7} value={diStatus.channel7} />
      <DIContent ch={8} value={diStatus.channel8} />
      <DIContent ch={9} value={diStatus.channel9} />
      <DIContent ch={10} value={diStatus.channel10} />
      <DIContent ch={11} value={diStatus.channel11} />
    </ContentBox>
  );
}

export default IODigitalInput;
