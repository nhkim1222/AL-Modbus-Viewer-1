import { ipcMain } from "electron";
import { modbusClient, Protocol } from "./Connection";
import { MapForRTU, Map } from "./RegisterMap";
import Mutex from "../Hooks/Mutex";

import React, { useState } from "react";
import styled from "styled-components";
import { usePolling } from "../../Hooks/useIpcOn";


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

const readRegister = async (address, length) => {
	await mutex.acquire();
	if (debug) console.log(`[${address}] req len: ${length}`);
  
	const result = await modbusClient.readHoldingRegisters(address - 1, length);
  
	if (debug) console.log(`[${address}] resp`);
  
	mutex.release();
	return result;
  };
  const handleError = (evt, err) => {
	console.log(`handle error = ${err} ${evt}`);
  };

 export const get_event = async (evt) => {
	if (modbusClient.isOpen) {
	  try {
		const { address, length, data: event } = Map.REG_EVENT_STATUS;
  
		const addr = address;
  
		const replyChannel = "set-event";
		const { data } = await readRegister(addr, length);
  
		event.info = data[0] | (data[1] << 16);
		event.sec = data[2] | (data[3] << 16);
		event.msec = data[4];
		event.index = data[5];
		event.detail = data[6] | (data[7] << 16);
		event.detail1 = data[8] | (data[9] << 16);
		event.detail2 = data[10] | (data[11] << 16);
		event.detail3 = data[12] | (data[13] << 16);
		event.detail4 = data[14] | (data[15] << 16);
		
		evt.reply(replyChannel, event);
	  } catch (err) {
		handleError(evt);
	  }
	}
  };