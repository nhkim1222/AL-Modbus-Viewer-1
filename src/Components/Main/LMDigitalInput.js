import React, { useState } from "react";
import { ContentBox, TitleLabel } from "../Style";
import useIpcOn, { usePolling } from "../../Hooks/useIpcOn";
import { CHANNEL_LM_DI_STATUS } from "../../Modbus/Channel";
import { DIContent } from "../DIOContent";

function LMDigitalInput() {
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
      <DIContent ch={12} value={diStatus.channel12} />
      <DIContent ch={13} value={diStatus.channel13} />
      <DIContent ch={14} value={diStatus.channel14} />
      <DIContent ch={15} value={diStatus.channel15} />
      <DIContent ch={16} value={diStatus.channel16} />
      <DIContent ch={17} value={diStatus.channel17} />
      <DIContent ch={18} value={diStatus.channel18} />
    </ContentBox>
  );
}

export default LMDigitalInput;
