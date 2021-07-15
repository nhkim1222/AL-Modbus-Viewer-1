import React, { useState } from "react";
import { ContentBox, TitleLabel } from "../Style";
import useIpcOn from "../../Hooks/useIpcOn";
import { CHANNEL_LM_DI_STATUS } from "../../Modbus/Channel";
import { DIContent } from "../DIOContent";

function LMDigitalInput() {
  const [diStatus, setDiStatus] = useState({
    channel1: "",
    channel2: "",
    channel3: "",
    channel4: "",
    channel5: "",
    channel6: "",
    channel7: "",
    channel8: "",
    channel9: "",
    channel10: "",
    channel11: "",
    channel12: "",
    channel13: "",
    channel14: "",
    channel15: "",
    channel16: "",
    channel17: "",
    channel18: "",
  });

  useIpcOn(CHANNEL_LM_DI_STATUS, (evt, ...args) => {
    setDiStatus(...args);
  });
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
