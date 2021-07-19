import ModbusRTU from "modbus-serial";
import { ipcMain } from "electron";
export const modbusClient = new ModbusRTU();

export async function connectServer({ ip, port }) {
  if (modbusClient.isOpen) {
    modbusClient.close();
  }

  return await modbusClient.connectTCP(ip, { port });
}

export function initServer() {
  ipcMain.on("connect-server", async (evt, arg) => {
    const { ip } = arg;
    console.log(ip);
    try {
      await connectServer({ ip, port: 502 });
      evt.reply("connect-info", { connectState: true, ip });
    } catch (err) {
      evt.reply("connect-info", { connectState: false, ip });
    }
  });
}
