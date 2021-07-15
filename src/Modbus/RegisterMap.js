import {
  parseA2750LDInformation,
  parseA2750LMMismatchAlarm,
  parseA2750LMSetup,
  parseLMDIStatus,
  parseLMDOStatus,
  parseLMProductInformation,
} from "./A2750LM.Model";
import {
  CHANNEL_LD_INFO,
  CHANNEL_LD_MISMATCH_ALARM,
  CHANNEL_LD_PARTNER_INFO,
  CHANNEL_LM_DI_STATUS,
  CHANNEL_LM_DO_STATUS,
  CHANNEL_LM_INFO,
  CHANNEL_LM_PARTNER_INFO,
  CHANNEL_LM_SETUP,
} from "./Channel";

export const a2700registerMap = [
  {
    fc: 3,
    address: 62001,
    length: 11,
    channel: CHANNEL_LM_INFO,
    data: {
      operationState: "", //1w
      productCode: 0, // 1w
      serialNumber: 0, // 2w
      hardwareRevision: 1, // 2w
      pcbVersion: "", // 1w
      applicationVersion: "", // 1w
      bootloaderVersion: "", // 1w
    },
    parser: parseLMProductInformation,
  },
  {
    fc: 3,
    address: 62031,
    length: 11,
    channel: CHANNEL_LM_PARTNER_INFO,
    data: {
      operationState: "", //1w
      productCode: 0, // 1w
      serialNumber: 0, // 2w
      hardwareRevision: 1, // 2w
      pcbVersion: "", // 1w
      applicationVersion: "", // 1w
      bootloaderVersion: "", // 1w
    },
    parser: parseLMProductInformation,
  },
  {
    fc: 1,
    address: 1001,
    length: 18,
    channel: CHANNEL_LM_DI_STATUS,
    data: {
      channel1: "",
      channel2: "",
      channel3: "",
      channel4: "",
      channel5: "",
      channel6: "",
      channel7: "",
      channel8: "",
      channel9: "",
      channel10: "",
      channel11: "",
      channel12: "",
      channel13: "",
      channel14: "",
      channel15: "",
      channel16: "",
      channel17: "",
      channel18: "",
    },
    parser: parseLMDIStatus,
  },
  {
    fc: 1,
    address: 1349,
    length: 9,
    channel: CHANNEL_LM_DO_STATUS,
    data: {
      channel1: "",
      channel2: "",
      channel3: "",
      channel4: "",
      channel5: "",
      channel6: "",
      channel7: "",
      channel8: "",
      channel9: "",
    },
    parser: parseLMDOStatus,
  },
  {
    fc: 1,
    address: 62300,
    length: 9,
    channel: CHANNEL_LD_INFO,
    data: {
      operationState: "",
      productCode: "",
      serialNumber: "",
      hardwareRevision: "",
      applicationVersion: "",
      kernelVersion: "",
      bootloaderVersion: "",
      pcbVersion: "",
    },
    parser: parseA2750LDInformation,
  },
  {
    fc: 3,
    address: 62320,
    length: 9,
    channel: CHANNEL_LD_PARTNER_INFO,
    data: {
      operationState: "",
      productCode: "",
      serialNumber: "",
      hardwareRevision: "",
      applicationVersion: "",
      kernelVersion: "",
      bootloaderVersion: "",
      pcbVersion: "",
    },
    parser: parseA2750LDInformation,
  },
  {
    fc: 1,
    address: 1000,
    length: 1,
    channel: CHANNEL_LD_MISMATCH_ALARM,
    data: {
      alarm: 0,
    },
    parser: parseA2750LMMismatchAlarm,
  },
  {
    fc: 3,
    address: 60000,
    length: 4,
    channel: CHANNEL_LM_SETUP,
    data: {
      operationMode: 0,
      digitalOperation: 0,
      analogDeadband: 0,
      alarmThreshold: 1,
    },
    parser: parseA2750LMSetup,
  },
];
