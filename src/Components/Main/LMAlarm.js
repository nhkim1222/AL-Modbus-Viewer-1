import React, { useState } from "react";
import styled from "styled-components";
import { usePolling } from "../../Hooks/useIpcOn";

const Container = styled.div`
  color: white;
  margin-bottom: 15px
`;
function LMAlarm() {
  const [alarm, setAlarm] = useState({
    state: false,
  });
  console.log("test");
  usePolling("set-mismatch-alarm", setAlarm);
  
  return <Container>Missmatch Alarm: {alarm.state ? "ON": "OFF"}</Container>;
}
export default LMAlarm;
