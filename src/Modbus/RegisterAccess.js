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
  if (modbusClient.isOpen) {
    await mutex.acquire();
    //console.log(`[0] address : ${address}, length: ${length}`);
    try {
      const result = await modbusClient.readHoldingRegisters(
        address - 1,
        length
      );
      mutex.release();
      return result;
    } catch (err) {
      console.log(err);
      mutex.release();
      return null;
    }
  }
};

const readCoil = async (address, length) => {
  if (modbusClient.isOpen) {
    await mutex.acquire();
    //console.log(`[0] address : ${address}, length: ${length}`);
    const result = await modbusClient.readCoils(address - 1, length);
    //console.log(`[1] address : ${address}, length: ${length}`);
    mutex.release();
    return result;
  }
};

// setup lock
const ADDR_SETUP_LOCK = 51000;
const setupUnlock = async () => {
  if (modbusClient.isOpen) {
    await mutex.acquire();
    const { read } = await modbusClient.readHoldingRegisters(
      ADDR_SETUP_LOCK - 1,
      1
    );
    try {
      await modbusClient.writeRegister(ADDR_SETUP_LOCK - 1, 2300);
      await modbusClient.writeRegister(ADDR_SETUP_LOCK - 1, 0);
      await modbusClient.writeRegister(ADDR_SETUP_LOCK - 1, 700);
      await modbusClient.writeRegister(ADDR_SETUP_LOCK - 1, 1);
    } catch (err) {
      console.log(err);
    }

    const { data } = await modbusClient.readHoldingRegisters(
      ADDR_SETUP_LOCK - 1,
      1
    );
    await mutex.release();
  }
};

/*
 *   getter
 *   : convert the buffer to data object
 */
const get_lm_information = async (evt, partner) => {
  if (modbusClient.isOpen) {
    try {
      const {
        address,
        length,
        data: information,
      } = partner !== true ? map.REG_LM_INFO : map.REG_LM_INFO_PARTNER;

      const replyChannel =
        partner !== true ? "set-lm-information" : "set-lm-information-partner";
      const { data } = await readRegister(address, length);
      console.log(`info read ${data}`);
      information.operationState = data[0];
      information.productCode = data[1];
      information.serialNumber = data[2] | (data[3] << 16);
      information.hardwareRevision = data[4];
      information.pcbVersion = data[8];
      information.applicationVersion = data[9];
      information.bootloaderVersion = data[10];

      evt.reply(replyChannel, information);
    } catch (error) {
      console.log(error);
    }
  }
};

const get_ld_information = async (evt, payload) => {
  if (modbusClient.isOpen) {
    try {
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
    } catch (err) {}
  }
};

const get_lm_di_status = async (evt, payload) => {
  if (modbusClient.isOpen) {
    try {
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
    } catch (error) {}
  }
};

const get_lm_do_status = async (evt, payload) => {
  if (modbusClient.isOpen) {
    try {
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
    } catch (err) {}
  }
};

const set_lm_do_cmd = (evt, { ch, value }) => {
  const buf = value;
  if (modbusClient.isOpen) {
    try {
      modbusClient.writeCoil(2347 + ch, buf);
    } catch (err) {}
  }
};

const get_mismatch_alarm = async (evt, payload) => {
  if (modbusClient.isOpen) {
    try {
      const { address, length, data: alarm } = map.REG_MISSMATCH_ALARM;
      const { data } = await readCoil(address, length);
      alarm.state = data[0];

      evt.reply("set-mismatch-alarm", alarm);
    } catch (err) {}
  }
};

const get_lm_setup = async (evt, payload) => {
  if (modbusClient.isOpen) {
    try {
      const { address, length, data: setup } = map.REG_SETUP_LM;
      const { data } = await readRegister(address, length);
      setup.access = data[0];
      setup.operationMode = data[1];
      setup.digitalOperation = data[2];
      setup.analogDeadband = data[3] | (data[4] << 16);
      setup.alarmThreshold = data[5] | (data[6] << 16);
      evt.reply("set-lm-setup", setup);
    } catch (error) {}
  }
};

const set_lm_setup = async (evt, setup) => {
  if (modbusClient.isOpen) {
    try {
      const { address, length } = map.REG_SETUP_LM;
      console.log("setup lock");
      setupUnlock();
      const buffer = [
        setup.operationMode,
        setup.digitalOperation,
        setup.analogDeadband & 0xffff,
        (setup.analogDeadband >> 16) & 0xffff,
        setup.alarmThreshold & 0xffff,
        (setup.alarmThreshold >> 16) & 0xffff,
      ];
      await mutex.acquire();
      console.log("setup lm1");
      await modbusClient.writeRegisters(address, buffer);
      await modbusClient.writeRegister(address - 1, 1); // access write
      console.log("setup lm2");
      mutex.release();
    } catch (err) {
      console.log(err);
    }
  }
};

const get_io_information = async (evt, { io_id }) => {
  if (modbusClient.isOpen) {
    try {
      const { address, length, data: information } = map.REG_IO_INFORMATION;

      const addr = address + (io_id - 1) * length;

      const replyChannel = "set-io-information";
      const { data } = await readRegister(addr, length);

      information.operationState = data[0];
      information.moduleType = data[1];
      information.serialNumber = data[2] | (data[3] << 16);
      information.productCode = data[4];
      information.applicationVersion = data[5];
      information.bootloaderVersion = data[6];
      information.hardwareRevision = data[7];
      information.pcbVersion = data[8];

      evt.reply(replyChannel, information);
    } catch (err) {}
  }
};

const get_io_di_status = async (evt, { io_id }) => {
  if (modbusClient.isOpen) {
    try {
      const { address, length, data: information } = map.REG_IO_DI_STATUS;

      const addr = address + (io_id - 1) * length;

      const replyChannel = "set-io-di-status";
      const { data } = await readCoil(addr, length);

      information.channel1 = data[0];
      information.channel2 = data[1];
      information.channel3 = data[2];
      information.channel4 = data[3];
      information.channel5 = data[4];
      information.channel6 = data[5];
      information.channel7 = data[6];
      information.channel8 = data[7];
      information.channel9 = data[8];
      information.channel10 = data[9];
      information.channel11 = data[10];
      information.channel12 = data[11];
      information.channel13 = data[12];
      information.channel14 = data[13];
      information.channel15 = data[14];
      information.channel16 = data[15];
      information.channel17 = data[16];
      information.channel18 = data[17];
      information.channel19 = data[18];
      information.channel20 = data[19];
      information.channel21 = data[20];
      information.channel22 = data[21];

      evt.reply(replyChannel, information);
    } catch (err) {}
  }
};

const get_io_do_status = async (evt, { io_id }) => {
  if (modbusClient.isOpen) {
    try {
      const { address, length, data: information } = map.REG_IO_DO_STATUS;

      const addr = address + (io_id - 1) * length;

      const replyChannel = "set-io-do-status";
      const { data } = await readCoil(addr, length);

      information.channel1 = data[0];
      information.channel2 = data[1];
      information.channel3 = data[2];
      information.channel4 = data[3];
      information.channel5 = data[4];
      information.channel6 = data[5];
      information.channel7 = data[6];
      information.channel8 = data[7];
      information.channel9 = data[8];
      information.channel10 = data[9];
      information.channel11 = data[10];
      information.channel12 = data[11];
      information.channel13 = data[12];

      evt.reply(replyChannel, information);
    } catch (err) {}
  }
};

const set_io_do_cmd = async (evt, { id, ch, value }) => {
  const buf = value;
  if (modbusClient.isOpen) {
    try{
      await mutex.acquire();
      const addr = 2357 + (id - 1) * 12 + (ch - 1);
      await modbusClient.writeCoil(addr, buf);
      mutex.release();
    }
    catch(err) {

    }
  }
};

const get_io_ai_status = async (evt, { io_id }) => {
  if (modbusClient.isOpen) {
    try {
      const { address, length, data: information } = map.REG_IO_AI_STATUS;

      const addr = address + (io_id - 1) * (length - 1);

      const replyChannel = "set-io-ai-status";
      const { data, buffer } = await readRegister(addr, length);

      information.channel1 = buffer.readFloatBE(0);
      information.channel2 = buffer.readFloatBE(2);
      information.channel3 = buffer.readFloatBE(4);
      information.channel4 = buffer.readFloatBE(6);
      information.channel5 = buffer.readFloatBE(8);
      information.channel6 = buffer.readFloatBE(10);
      information.channel7 = buffer.readFloatBE(12);
      information.channel8 = buffer.readFloatBE(14);
      information.channel9 = buffer.readFloatBE(16);
      information.channel10 = buffer.readFloatBE(18);
      information.channel11 = buffer.readFloatBE(20);
      information.channel12 = buffer.readFloatBE(22);

      evt.reply(replyChannel, information);
    } catch (err) {}
  }
};

const get_pc_di_status = async (evt, { pc_id }) => {
  if (modbusClient.isOpen) {
    try {
      const { address, length, data: information } = map.REG_PC_DI_STATUS;

      const addr = address + (pc_id - 1) * length;

      const replyChannel = "set-pc-di-status";
      const { data } = await readCoil(addr, length);
      information.channel1 = data[0];
      information.channel2 = data[1];
      information.channel3 = data[2];
      information.channel4 = data[3];
      information.channel5 = data[4];
      information.channel6 = data[5];
      information.channel7 = data[6];
      information.channel8 = data[7];
      information.channel9 = data[8];
      information.channel10 = data[9];

      evt.reply(replyChannel, information);
    } catch (err) {}
  }
};

const get_pc_do_status = async (evt, { pc_id }) => {
  if (modbusClient.isOpen) {
    try {
      const { address, length, data: information } = map.REG_PC_DO_STATUS;

      const addr = address + (pc_id - 1) * length;

      const replyChannel = "set-pc-do-status";
      const { data } = await readCoil(addr, length);

      information.channel1 = data[0];
      information.channel2 = data[1];
      information.channel3 = data[2];
      information.channel4 = data[3];

      evt.reply(replyChannel, information);
    } catch (err) {}
  }
};

const get_pc_fault_status = async (evt, { pc_id }) => {
  if (modbusClient.isOpen) {
    try {
      const { address, length, data: information } = map.REG_PC_FAULT_STATUS;

      const addr = address + (pc_id - 1) *33;

      const replyChannel = "set-pc-fault-status";
      const { data } = await readCoil(addr, length);

      information.ocr = data[0];
      information.thr = data[1];
      information.pocr = data[2];
      information.psr = data[3];
      information.ubcr = data[4];
      information.jam = data[5];
      information.lsr = data[6];
      information.grzct = data[7];
      information.grct = data[8];
      information.ucr = data[9];
      information.externalalarm = data[10];

      console.log(`id : ${pc_id} addr: ${addr}, data: ${information.externalalarm} , length :${length}`);
      evt.reply(replyChannel, information);
    } catch (err) {}
  }
};
const get_pc_status = async (evt, { pc_id }) => {
  if (modbusClient.isOpen) {
    try {
      const { address, length, data: information } = map.REG_PC_STATUS;

      const addr = address + (pc_id - 1) * 33 + length;

      const replyChannel = "set-pc-status";
      const { data } = await readCoil(addr, length);

      information.startingblock = data[0];
      information.operationState = data[1];
      information.remotemode = data[2];
      information.abnormal = data[3];
      information.alarm = data[4];
      information.fault = data[5];

      evt.reply(replyChannel, information);
    } catch (err) {}
  }
};
const set_pc_do_cmd = async (evt, { id, ch, value }) => {
  const buf = value;
  console.log(buf);
  console.log("set pc do cmd1");
  if (modbusClient.isOpen) {
    console.log("set pc do cmd2");
    try{
      await mutex.acquire();
      
    console.log("set pc do cmd3");
      const addr = 1 + (id - 1) * 33 + (ch - 1);
      await modbusClient.writeCoil(addr - 1, buf);
      mutex.release();
    }
    catch(err) {
      console.log(err);
    }
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
  ipcMain.on("set-lm-setup", set_lm_setup);
  ipcMain.on("get-io-information", get_io_information);
  ipcMain.on("get-io-di-status", get_io_di_status);
  ipcMain.on("get-io-do-status", get_io_do_status);
  ipcMain.on("set-io-do-cmd", set_io_do_cmd);
  ipcMain.on("get-io-ai-status", get_io_ai_status);
  ipcMain.on("get-pc-di-status", get_pc_di_status);
  ipcMain.on("get-pc-do-status", get_pc_do_status);
  ipcMain.on("get-pc-falut-status", get_pc_fault_status);
  ipcMain.on("set-pc-do-cmd", set_pc_do_cmd);
  ipcMain.on("get-pc-status", get_pc_status);
}
