import { parseIOProductInformation } from "./A2750LM.Model";
import { SLICE_CHANNEL_IO_INFO } from "./Channel";

export const map = {
  /** lm register **/
  REG_LM_INFO: {
    fc: 3,
    address: 62001,
    length: 11,
    data: {
      operationState: 0, //1w
      productCode: 0, // 1w
      serialNumber: 0, // 2w
      hardwareRevision: 0, // 2w
      pcbVersion: 0, // 1w
      applicationVersion: 0, // 1w
      bootloaderVersion: 0, // 1w
    },
  },
  REG_LM_INFO_PARTNER: {
    fc: 3,
    address: 62031,
    length: 11,
    data: {
      operationState: "", //1w
      productCode: 0, // 1w
      serialNumber: 0, // 2w
      hardwareRevision: 1, // 2w
      pcbVersion: "", // 1w
      applicationVersion: "", // 1w
      bootloaderVersion: "", // 1w
    },
  },
  REG_LD_INFO: {
    fc: 3,
    address: 62300,
    length: 9,
    data: {
      operationState: 0,
      productCode: 0,
      serialNumber: 0,
      hardwareRevision: 0,
      applicationVersion: 0,
      kernelVersion: 0,
      bootloaderVersion: 0,
      pcbVersion: 0,
    },
  },
  REG_LD_INFO_PARTNER: {
    fc: 3,
    address: 62320,
    length: 9,
    data: {
      operationState: 0,
      productCode: 0,
      serialNumber: 0,
      hardwareRevision: 0,
      applicationVersion: 0,
      kernelVersion: 0,
      bootloaderVersion: 0,
      pcbVersion: 0,
    },
  },
  REG_LM_DI_STATUS: {
    fc: 1,
    address: 1001,
    length: 18,
    data: {
      channel1: 0,
      channel2: 0,
      channel3: 0,
      channel4: 0,
      channel5: 0,
      channel6: 0,
      channel7: 0,
      channel8: 0,
      channel9: 0,
      channel10: 0,
      channel11: 0,
      channel12: 0,
      channel13: 0,
      channel14: 0,
      channel15: 0,
      channel16: 0,
      channel17: 0,
      channel18: 0,
    },
  },
  REG_LM_DO_STATUS: {
    fc: 1,
    address: 1349,
    length: 9,
    data: {
      channel1: 0,
      channel2: 0,
      channel3: 0,
      channel4: 0,
      channel5: 0,
      channel6: 0,
      channel7: 0,
      channel8: 0,
      channel9: 0,
    },
  },
  REG_MISSMATCH_ALARM: {
    fc: 1,
    address: 1000,
    length: 1,
    data: {
      state: 0,
    },
  },
  REG_SETUP_LM: {
    fc: 3,
    address: 64010,
    length: 7,
    data: {
      access: 0,
      operationMode: 0,
      digitalOperation: 0,
      analogDeadband: 0,
      alarmThreshold: 0,
    },
  },
  REG_IO_INFORMATION: {
    fc: 3,
    address: 62050,
    length: 12,
    data: {
      operationState: "", //1w
      moduleType: "",
      productCode: 0, // 1w
      serialNumber: 0, // 2w
      hardwareRevision: 1, // 2w
      pcbVersion: "", // 1w
      applicationVersion: "", // 1w
      bootloaderVersion: "", // 1w
    }
  }
};

export const a2700registerMap = [
  {
    fc: 3,
    address: 62050,
    length: 12,
    channel: SLICE_CHANNEL_IO_INFO,
    slice: true,
    slice_id: 15,
    data: {
      operationState: "", //1w
      moduleType: "",
      productCode: 0, // 1w
      serialNumber: 0, // 2w
      hardwareRevision: 1, // 2w
      pcbVersion: "", // 1w
      applicationVersion: "", // 1w
      bootloaderVersion: "", // 1w
    },
    parser: parseIOProductInformation,
  },
];
