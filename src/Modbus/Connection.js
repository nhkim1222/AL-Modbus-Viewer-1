import ModbusRTU from "modbus-serial";
import { ipcMain } from "electron";
import { release } from "./RegisterAccess";
import SerialPort from "serialport";

export const modbusClient = new ModbusRTU();
export var Protocol = 'none';

export async function connectServer({ ip, port }) {
  release();
  if (modbusClient.isOpen) {
    console.log("connect server: isOpened");
    modbusClient.close();
  }

  try {
    console.log(`try to connect : ${ip}`);
    modbusClient.setTimeout(5000);
    await modbusClient.connectTCP(ip, { port });
    Protocol = 'tcp';
    return true;
  } catch (err) {
    return false;
  }
}

export async function connectServerRTU({serial, baudrate, stopbit, parity}) {
  release();
  if (modbusClient.isOpen) {
    console.log("connect server: isOpened");
    modbusClient.close();
  }

  try {
    console.log(`try to connect : ${serial}`);
    modbusClient.setTimeout(5000);
    await modbusClient.connectRTU(serial, {
      baudRate: baudrate,
      stopBits: stopbit,
      parity: parity
    });
    Protocol = 'rtu';
    return true;

  } catch (err) {

    return false;
  }
}

export function initServer() {
  ipcMain.on("connect-to-server", async (evt, arg) => {
    const { ip } = arg;
    try {
      console.log("start to connect server ...");
      const state = await connectServer({ ip, port: 502 });
      console.log(`connect result = ${state}`);
      evt.reply("resp-connect-to-server", { connectState: state, ip });
    } catch (err) {
      console.log(err);
      evt.reply("resp-connect-to-server", { connectState: false, ip });
    }
  });
  
  ipcMain.on("connect-to-server-rtu", async (evt, arg) => {
    const { serial, baudrate, stopbit, parity } = arg;
    try {
      const state = await connectServerRTU({serial, baudrate, stopbit, parity});
      
      evt.reply("resp-connect-to-server", { connectState: state, ip: serial });
    } catch (err) {

    }
  });

  ipcMain.on("get-connect-server-state", (evt, arg) => {
    evt.reply("server-connection-state", modbusClient.isOpen);
  });

  

  ipcMain.on("disconnect-to-server", (evt, callback) => {
    if (modbusClient.isOpen) {
      modbusClient.close(callback);
    }
  });

  ipcMain.on("get-serial-list", (evt, arg) => {
    SerialPort.list().then((ports) => {
      const paths = ports.map((p) => {
        return { id: p.locationId, key: p.path };
      });
      evt.reply("resp-serial-list", paths);
    });
  });
}
