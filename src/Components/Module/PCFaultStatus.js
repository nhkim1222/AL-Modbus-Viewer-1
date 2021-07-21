import React, { useState } from "react";
import { ContentBox, TitleLabel } from "../Style";
import { usePolling } from "../../Hooks/useIpcOn";
import { FAULTContent } from "../DIOContent";

function PCFaultStatus(params) {
  const { id } = params;

  const [faultStatus, setFaultStatus] = useState({
    ocr: false,
    thr: false,
    pocr: false,
    psr: false,
    ubcr: false,
    jam: false,
    lsr: false,
    grzct: false,
    grct: false,
    ucr: false,
    externalalarm:false,
  });
  

  usePolling("set-pc-fault-status", setFaultStatus);

  return (
    <ContentBox>
      <TitleLabel>Falut occur status</TitleLabel>
      <FAULTContent ch={'ocr'} value={faultStatus.ocr} />
      <FAULTContent ch={'thr'} value={faultStatus.thr} />
      <FAULTContent ch={'pocr'} value={faultStatus.pocr} />
      <FAULTContent ch={'psr'} value={faultStatus.psr} />
      <FAULTContent ch={'ubcr'} value={faultStatus.ubcr} />
      <FAULTContent ch={'jam'} value={faultStatus.jam} />
      <FAULTContent ch={'lsr'} value={faultStatus.lsr} />
      <FAULTContent ch={'grzct'} value={faultStatus.grzct} />
      <FAULTContent ch={'grct'} value={faultStatus.grct} />
      <FAULTContent ch={'ucr'} value={faultStatus.ucr} />
      <FAULTContent ch={'externalalarm'} value={faultStatus.externalalarm} />
    </ContentBox>
  );
}

export default PCFaultStatus;
