export const Map = {
  "tcp": {
    /** lm register **/
    REG_LM_INFO: {
      fc: 3,
      address: 63001,
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
      parser : (data) => {
        return {
          operationState: data[0],
          productCode: data[1],
          serialNumber: data[2] | data[3] << 16,
          hardwareRevision: data[4],
          pcbVersion: data[8],
          applicationVersion: data[9],
          bootloaderVersion: data[10],
        }
      },
    },
    REG_LM_INFO_PARTNER: {
      fc: 3,
      address: 63021,
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
      address: 63041,
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
      address: 63061,
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
      address: 2001,
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
      address: 2349,
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
      address: 2000,
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
      address: 63081,
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
      address: 2019,
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
      address: 2358,
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
  },
  "rtu": {
    REG_LM_INFO: {
      fc: 3,
      address: 1,
      length: 12,
      data: {
        operationState: {index: 0, data: 0}, //1w
        productCode: {index: 0, data: 0}, // 1w
        serialNumber: {index: 0, data: 0}, // 2w
        hardwareRevision: {index: 0, data: 0}, // 2w
        pcbVersion: {index: 0, data: 0}, // 1w
        applicationVersion: {index: 0, data: 0}, // 1w
        bootloaderVersion: {index: 0, data: 0}, // 1w
      },
    },
    REG_LM_INFO_PARTNER: {
      fc: 3,
      address: 63021,
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
      address: 63041,
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
      address: 63061,
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
      address: 2001,
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
      address: 2349,
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
      address: 2000,
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
      address: 63081,
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
      address: 2019,
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
      address: 2358,
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
  },
};
