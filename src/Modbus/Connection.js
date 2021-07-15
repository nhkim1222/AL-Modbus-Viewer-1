import { ipcMain } from "electron";
import ModbusRTU from "modbus-serial";
import { CHANNEL_LM_DO_COMMAND } from "./Channel";
import { a2700registerMap } from "./RegisterMap";

const modbusClient = new ModbusRTU();

export function connectServer({ ip, port, webContents }) {
  console.log("test");
  ipcMain.on(CHANNEL_LM_DO_COMMAND, (evt, { ch, value }) => {
    const buf = value;
    if (modbusClient.isOpen) {
      modbusClient.writeCoil(1348 + (ch - 1), buf);
    }
  });

  modbusClient
    .connectTCP(ip, { port })
    .then(() => {
      console.log(`client [${ip}] connected`);
      startToUpdate(webContents);
      return true;
    })
    .catch(() => {
      console.log(`cannot connect to client [${ip}]`);
      return false;
    });
}

function startToUpdate(webContents) {
  setInterval(async () => {
    console.log(modbusClient.isOpen);
    if (modbusClient.isOpen) {
      await Promise.all(
        a2700registerMap.map(async (register) => {
          if (register.fc === 3) {
            const { data } = await readRegister(register);
            if (register.parser != null) {
              register.data = register.parser(data);
            }
            webContents.send(register.channel, register.data);
          } else if (register.fc === 1) {
            const { data } = await readCoil(register);
            register.data = register.parser(data);
            webContents.send(register.channel, register.data);
          }
        })
      );
    }
  }, 1500);
}

const readRegister = async (register) => {
  return await modbusClient.readHoldingRegisters(
    register.address - 1,
    register.length
  );
};

const readCoil = async (register) => {
  return await modbusClient.readCoils(register.address - 1, register.length);
};
