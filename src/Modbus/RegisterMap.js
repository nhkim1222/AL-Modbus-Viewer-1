export const Map = {

  /** lm register **/
  REG_LM_INFO: {
    fc: 3,
    address: 61501,
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
  REG_LM_INFO_PARTNER: {
    fc: 3,
    address: 61513,
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
    address: 61525,
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
    address: 61539,
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
    address: 2000,
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
    address: 2348,
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
    address: 1999,
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
  REG_SETUP_USED_LOGIC: {
    fc: 3,
    address: 61875,
    length: 2,
    data: {
      access : 0,
      usedLogic: 0,
    },
  },
  REG_SETUP_EVENT: {
    fc: 3,
    address: 61870,
    length: 4,
    data: {
      access: 0,
      eventEnableFlag : 0,
      aiChangeDB: 0, 
      aoChangeDB: 0, 
    },
  },
  REG_SETUP_LM_LED: {
    fc: 3,
    address: 61832,
    length: 5,
    data: {
      access: 0,
      deviceLedPeriod : 0,
      deviceLedOntime: 0, 
      rs485LedPeriod : 0,
      rs485LedOntime: 0, 
    },
  },
  REG_SETUP_LD_LED: {
    fc: 3,
    address: 61841,
    length: 7,
    data: {
      access: 0,
      rs485LedPeriod : 0,
      rs485LedOntime: 0, 
      eventLedPeriod : 0,
      eventLedOntime: 0, 
      deviceLedPeriod : 0,
      deviceLedOntime: 0, 
    },
  },
  REG_SETUP_RS485: {
    fc: 3,
    address: 61856,
    length: 5,
    data: {
      deviceAddress : 0,
      baudrate: 0, 
      parity : 0,
      stopBits: 0, 
    },
  },

  REG_SETUP_LM_DIO: {
    fc: 3,
    address: 61881,
    length: 28,
    data: {
      di_setup: [],
    },
  },

  REG_SETUP_IOH_DIO: {
    fc: 3,
    address: 61910,
    length: 20,
    data: {
      access: 0,
      control_ch: 0,
      type_exist : 0,
      dio_setup: [],
    },
  },
  REG_SETUP_IOH_AIO: {
    fc: 3,
    address: 61932,
    length: 86,
    data: {
      access: 0,
      type: 0,
      exist: 0,
      ai_type: [],
      unit: [],
      mapping: [],
      min_value: [],
      max_value: []
    }
  },
  REG_IO_INFORMATION: {
    fc: 3,
    address: 61553,
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
    },
  },
  REG_IO_DI_STATUS: {
    fc: 1,
    address: 2018,
    length: 22,
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
      channel19: 0,
      channel20: 0,
      channel21: 0,
      channel22: 0,
    },
  },
  REG_IO_DO_STATUS: {
    fc: 1,
    address: 2357,
    length: 12,
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
    },
  },
  REG_IO_AI_STATUS: {
    fc: 3,
    address: 63271,
    length: 24,
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
    },
  },
  REG_PC_DI_STATUS: {
    fc: 1,
    address: 9,
    length: 10,
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
    },
  },
  REG_PC_DO_STATUS: {
    fc: 1,
    address: 19,
    length: 4,
    data: {
      channel1: 0,
      channel2: 0,
      channel3: 0,
      channel4: 0,
    },
  },
  REG_PC_FAULT_STATUS: {
    fc: 1,
    address: 23,
    length: 11,
    data: {
      ocr: 0,
      thr: 0,
      pocr: 0,
      psr: 0,
      ubcr: 0,
      jam: 0,
      lsr: 0,
      grzct: 0,
      grct: 0,
      ucr: 0,
      externalalarm: 0,
    },
  },
  REG_PC_STATUS: {
    fc: 1,
    address: 3,
    length: 6,
    data: {
      startingblock: 0,
      operationState: 0,
      remotemode: 0,
      abnormal: 0,
      alarm: 0,
      fault: 0,
    },
  },
  REG_PC_AI_STATUS: {
    fc: 3,
    address: 45001,
    length: 8,
    data: {
      avgcurrent: 0,
      activepower: 0,
      powerfactor: 0,
      ratingcurrent: 0,
    },
  },
  REG_EVENT_STATUS: {
    fc: 3,
    address: 63714,
    length: 16,
    data: {
      info: 0,
      sec: 0,
      msec: 0,
      index: 0,
      detail:0,
      detail1:0,
      detail2:0,
      detail3:0,
      detail4:0,

    },
  },
  REG_EVENT_FATCH: {
    fc: 3,
    address: 63710,
    length: 4,
    data: {
      fetchData: 0,
      remainingCount: 0,
      fetchedIndex: 0,
    },
  },
};
