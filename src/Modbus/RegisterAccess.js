import { ipcMain } from "electron";
import { modbusClient } from "./Connection";
import { map } from "./RegisterMap";
import Mutex from "../Hooks/Mutex";

/* utility functions */
Array.prototype.ToShort = (index) => {
  // javascript standard include object Number
  return this[index];
};

Array.prototype.ToShortInverse = (index) => {
  var h = (this[index] & 0xff) << 8;
  var l = (this[index] >> 8) & 0xff;
  return h | l;
};

Array.prototype.ToInt = (index) => {
  return this[index] | (this[index + 1] << 16);
};

Array.prototype.ToIntReverse = (index) => {
  return (this[index] << 16) | this[index + 1];
};
const mutex = new Mutex();

const readRegister = async (address, length) => {
  await mutex.acquire();
  console.log(`[0] address : ${address}, length: ${length}`);
  const result = await modbusClient.readHoldingRegisters(address, length);
  console.log(`[1] address : ${address}, length: ${length}`);
  await mutex.release();
  return result;
};

const readCoil = async (address, length) => {
  await mutex.acquire();
  console.log(`[0] address : ${address}, length: ${length}`);
  const result = await modbusClient.readCoils(address, length);
  console.log(`[1] address : ${address}, length: ${length}`);
  await mutex.release();
  return result;
};

// setup lock
const ADDR_SETUP_LOCK = 61000;
const setupUnlock = async () => {
  if (modbusClient.isOpen) {
    const unlockCommand = [1, 2300, 0, 700];
    await modbusClient.writeRegisters(ADDR_SETUP_LOCK, unlockCommand);
  }
};

/*
 *   getter
 *   : convert the buffer to data object
 */
const get_lm_information = async (evt, partner) => {
  if (modbusClient.isOpen) {
    const {
      address,
      length,
      data: information,
    } = partner !== true ? map.REG_LM_INFO : map.REG_LM_INFO_PARTNER;

    const replyChannel =
      partner !== true ? "set-lm-information" : "set-lm-information-partner";
    const { data } = await readRegister(address, length);

    information.operationState = data[0];
    information.productCode = data[1];
    information.serialNumber = data[2] | (data[3] << 16);
    information.hardwareRevision = data[4];
    information.pcbVersion = data[8];
    information.applicationVersion = data[9];
    information.bootloaderVersion = data[10];

    evt.reply(replyChannel, information);
  }
};

const get_ld_information = async (evt, payload) => {
  if (modbusClient.isOpen) {
    const {
      address,
      length,
      data: information,
    } = payload !== true ? map.REG_LD_INFO : map.REG_LD_INFO_PARTNER;

    const replyChannel =
      payload !== true ? "set-ld-information" : "set-ld-information-partner";

    const { data } = await readRegister(address, length);

    information.operationState = data[0];
    information.productCode = data[1];
    information.serialNumber = data[2] | (data[3] << 16);
    information.hardwareRevision = data[4];
    information.applicationVersion = data[5];
    information.kernelVersion = data[6];
    information.bootloaderVersion = data[7];
    information.pcbVersion = data[8];
    evt.reply(replyChannel, information);
  }
};

const get_lm_di_status = async (evt, payload) => {
  if (modbusClient.isOpen) {
    const { address, length, data: diStatus } = map.REG_LM_DI_STATUS;
    const { data } = await readCoil(address, length);
    diStatus.channel1 = data[0];
    diStatus.channel2 = data[1];
    diStatus.channel3 = data[2];
    diStatus.channel4 = data[3];
    diStatus.channel5 = data[4];
    diStatus.channel6 = data[5];
    diStatus.channel7 = data[6];
    diStatus.channel8 = data[7];
    diStatus.channel9 = data[8];
    diStatus.channel10 = data[9];
    diStatus.channel11 = data[10];
    diStatus.channel12 = data[11];
    diStatus.channel13 = data[12];
    diStatus.channel14 = data[13];
    diStatus.channel15 = data[14];
    diStatus.channel16 = data[15];
    diStatus.channel17 = data[16];
    diStatus.channel18 = data[17];
    evt.reply("set-lm-di-status", diStatus);
  }
};

const get_lm_do_status = async (evt, payload) => {
  if (modbusClient.isOpen) {
    const { address, length, data: doStatus } = map.REG_LM_DO_STATUS;
    const { data } = await readCoil(address, length);

    doStatus.channel1 = data[0];
    doStatus.channel2 = data[1];
    doStatus.channel3 = data[2];
    doStatus.channel4 = data[3];
    doStatus.channel5 = data[4];
    doStatus.channel6 = data[5];
    doStatus.channel7 = data[6];
    doStatus.channel8 = data[7];
    doStatus.channel9 = data[8];
    evt.reply("set-lm-do-status", doStatus);
  }
};

const set_lm_do_cmd = (evt, { ch, value }) => {
  const buf = value;
  if (modbusClient.isOpen) {
    modbusClient.writeCoil(1348 + ch, buf);
  }
};

const get_mismatch_alarm = async (evt, payload) => {
  if (modbusClient.isOpen) {
    const { address, length, data: alarm } = map.REG_MISSMATCH_ALARM;
    const { data } = await readCoil(address, length);
    alarm.state = data[0];

    evt.reply("set-mismatch-alarm", alarm);
  }
};

const get_lm_setup = async (evt, payload) => {
  if (modbusClient.isOpen) {
    const { address, length, data: setup } = map.REG_SETUP_LM;
    const { data } = await readRegister(address, length);
    setup.access = data.ToShort(0);
    setup.operationMode = data.ToShort(1);
    setup.digitalOperation = data.ToShort(2);
    setup.analogDeadband = data.ToInt(3);
    setup.alarmThreshold = data.ToInt(5);
  }
};

const set_lm_setup = async (evt, setup) => {
  if (modbusClient.isOpen) {
    const { address, length } = map.REG_SETUP_LM;
    setupUnlock();
    const buffer = [
      setup.operationMode,
      setup.digitalOperation,
      setup.analogDeadband & 0xffff,
      (setup.analogDeadband >> 16) & 0xffff,
      setup.alarmThreshold & 0xffff,
      (setup.alarmThreshold >> 16) & 0xffff,
    ];
    modbusClient.writeRegisters(address + 1, buffer);
    modbusClient.writeRegister(address, 1); // access write
  }
};

export function initRegisterAccess() {
  // main process 에서 동작
  ipcMain.on("get-lm-information", get_lm_information);
  ipcMain.on("get-ld-information", get_ld_information);
  ipcMain.on("get-mismatch-alarm", get_mismatch_alarm);
  ipcMain.on("get-lm-di-status", get_lm_di_status);
  ipcMain.on("get-lm-do-status", get_lm_do_status);
  ipcMain.on("set-lm-do-cmd", set_lm_do_cmd);
  ipcMain.on("get-lm-setup", get_lm_setup);
}
