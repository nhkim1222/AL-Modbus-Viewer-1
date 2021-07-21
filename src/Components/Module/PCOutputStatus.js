import React, { useState } from "react";
import { ContentBox, TitleLabel } from "../Style";
import { usePolling } from "../../Hooks/useIpcOn";
import { PCDOContent } from "../DIOContent";

function PCOutputStatus(params) {
  const { id } = params;

  const [doStatus, setDoStatus] = useState({
    channel1: "",
    channel2: "",
    channel3: "",
    channel4: "",
  });
  

  usePolling("set-pc-do-status", setDoStatus);

  return (
    <ContentBox>
      <TitleLabel>Digital Output</TitleLabel>
      <PCDOContent ch={1} value={doStatus.channel1} />
      <PCDOContent ch={2} value={doStatus.channel2} />
      <PCDOContent ch={3} value={doStatus.channel3} />
      <PCDOContent ch={4} value={doStatus.channel4} />
    </ContentBox>
  );
}

export default PCOutputStatus;
