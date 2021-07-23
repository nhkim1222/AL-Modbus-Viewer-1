import ModbusRTU from "modbus-serial";
import { ipcMain } from "electron";
import { release } from "./RegisterAccess";
import SerialPort from "serialport";

export const modbusClient = new ModbusRTU();

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
