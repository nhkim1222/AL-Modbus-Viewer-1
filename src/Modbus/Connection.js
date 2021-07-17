import ModbusRTU from "modbus-serial";

export const modbusClient = new ModbusRTU();

export function connectServer({ ip, port, webContents }) {
  modbusClient
    .connectTCP(ip, { port })
    .then(() => {
      console.log(`client [${ip}] connected`);
      //startToUpdate(webContents);
      return true;
    })
    .catch(() => {
      console.log(`cannot connect to client [${ip}]`);
      return false;
    });
}
