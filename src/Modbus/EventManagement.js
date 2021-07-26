import { ipcMain } from "electron";
import { modbusClient, Protocol } from "./Connection";
import { MapForRTU, Map } from "./RegisterMap";
import Mutex from "../Hooks/Mutex";

import React, { useState } from "react";
import styled from "styled-components";

// LM ID Set (ID : 0,1) - 63700

// Event Capacity   | length: 1w | 63701
// Index Selection  | length: 2w | 63702
// Event Update Mode| length: 1w | 63704

// event buffer info| length: 5w | 63705
// - event buffer count  (1)
// - oldest index  (2)
// - newest index  (2)

// event fetch data | length: 4w | 63710
//  - fetch data  (1)
//  - remaining event count (1)
//  - fetched index (2)

// event data       | length: 16w| 63714
/**
 * 
 * 	uint32_t info;
	uint32_t sec;
	uint16_t msec;
	uint16_t index;
	uint32_t detail[5];
 * 
 */
