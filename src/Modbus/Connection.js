import ModbusRTU from "modbus-serial";
import { ipcMain } from "electron";

export const modbusClient = new ModbusRTU();

export async function connectServer({ ip, port }) {
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
      const state = await connectServer({ ip, port: 502 });
      evt.reply("get-connection-result", { connectState: state, ip });
    } catch (err) {
      console.log(err);
      evt.reply("get-connection-result", { connectState: false, ip });
    }
  });

  ipcMain.on("get-connect-server-state", (evt, arg) => {
    evt.reply("server-connection-state", modbusClient.isOpen);
  });

  ipcMain.on('disconnect-to-server', (evt,callback) => {
    if(modbusClient.isOpen) {
      modbusClient.close(callback);
    }
  })
}
