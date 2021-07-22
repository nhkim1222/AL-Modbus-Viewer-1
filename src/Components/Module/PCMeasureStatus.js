import React, { useState } from "react";
import { ContentBox, TitleLabel } from "../Style";
import { usePolling } from "../../Hooks/useIpcOn";
import { PCAIContent } from "../DIOContent";

function PCMeasureStatus(params) {
  const { id } = params;

  const [aiStatus, setAiStatus] = useState({
    avgcurrent: 0,
    activepower: 0,
    powerfactor: 0,
    ratingcurrent: 0,
  });
  

  usePolling("set-pc-ai-status", setAiStatus);

  return (
    <ContentBox>
      <TitleLabel>Analog Input</TitleLabel>
      <PCAIContent name={'Average current'} value={aiStatus.avgcurrent} />
      <PCAIContent name={'Acitve Power'} value={aiStatus.activepower} />
      <PCAIContent name={'Power factor'} value={aiStatus.powerfactor} />
      <PCAIContent name={'Motor rating current'} value={aiStatus.ratingcurrent} />
    </ContentBox>
  );
}

export default PCMeasureStatus;
