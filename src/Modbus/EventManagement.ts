import { ipcMain } from "electron";
import { modbusClient, Protocol } from "./Connection";
import { Map } from "./RegisterMap";
import Mutex from "../Hooks/Mutex";
import ModbusRTU from "modbus-serial";
import Worker from "worker_threads";
import { AsyncData, AsyncFunction, asyncPoll } from "../Hooks/async-poller";
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

const event_buffer = new Array<eventData>();

interface eventData {
  info: number;
  sec: number;
  msec: number;
  index: number;
  detail: Array<number>;
}
async function dataFetch(client: ModbusRTU): Promise<AsyncData<eventData>> {
  try {
    if (client.isOpen) {
      const result = await client.readHoldingRegisters(63700, 16);
      const event: eventData = {
        info: result.buffer.readUInt32BE(0),
        sec: result.buffer.readUInt32BE(2),
        msec: result.buffer.readUInt16BE(4),
        index: result.buffer.readUInt16BE(5),
        detail: [
          result.buffer.readUInt32BE(6),
          result.buffer.readUInt32BE(8),
          result.buffer.readUInt32BE(10),
          result.buffer.readUInt32BE(12),
          result.buffer.readUInt32BE(14),
        ],
      };

      return Promise.resolve({
        done: true,
        data: event,
      });
    }
  } catch (err) {
    Promise.reject(err);
  }
}
export class EventFetcher {
  client: ModbusRTU;

  constructor(modbusClient: ModbusRTU) {
    //console.log(modbusClient);
    this.client = modbusClient;
  }

  async start() {
    const id = setInterval(async () => {
      try {
        const e = await asyncPoll(dataFetch, this.client, 1000, 5000);
        event_buffer.push(e);
      } catch (err) {
        clearInterval(id);
      }
    }, 1000);
  }

  stop() {}
}
