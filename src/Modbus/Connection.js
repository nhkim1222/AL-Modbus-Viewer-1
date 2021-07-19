import ModbusRTU from "modbus-serial";
import { ipcMain } from "electron";

export const modbusClient = new ModbusRTU();

const maintainConnection = () => {
  const timeOut = modbusClient.getTimeout();
  console.log(timeOut);
};

export async function connectServer({ ip, port }) {
  if (modbusClient.isOpen) {
    console.log("connect server: isOpened");
    modbusClient.close();
  }
  maintainConnection();
  try {
    modbusClient.setTimeout(3000);
    await modbusClient.connectTCP(ip, { port });
    return true;
  } catch (err) {
    return false;
  }
}

export function initServer() {
  ipcMain.on("connect-server", async (evt, arg) => {
    const { ip } = arg;
    console.log(ip);
    try {
      console.log(`connect : ${ip}`);
      const state = await connectServer({ ip, port: 502 });
      evt.reply("connect-info", { connectState: state, ip });
    } catch (err) {
      evt.reply("connect-info", { connectState: false, ip });
    }
  });

  ipcMain.on("get-connect-server-state", (evt, arg) => {
    evt.reply("server-connection-state", modbusClient.isOpen);
  });
}
