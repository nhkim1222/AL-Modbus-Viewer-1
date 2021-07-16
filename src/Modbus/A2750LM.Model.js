const operation_state = (val) => {
  if (val === 1) return "Bootloader";
  if (val === 2) return "Application";
  return "UNIDENIFIED";
};

const io_module_type = (val) =>
{
  switch(val)
  {
    case 0:
      return "invalid"
    case 1:
      return "A2750IO-DI" ;
    case 2:
      return "A2750IO-DO" ;
    case 3:
      return "A2750IO-AI" ;
    case 4:
      return "A2750IO-DI2" ;
    case 5:
      return "A2750IO-DIO" ;
    case 6:
      return "A2750IO-DO2" ;
    case 7:
      return "A2750IO-AIO" ;
    case 8:
      return "A2750IO-AI2" ;
  }
}
const product_code = (val) => {
  return val;
};

const module_type = (val) => {
  return val === 1 ? "A2750LMH" : "A2750LM";
};

const convertVersion = (val) => {
  // 10100

  const major = parseInt(val / 10000);
  const minor = parseInt((val - major * 10000) / 1000);
  const build = parseInt((val - minor * 1000) / 100);

  return `${major}.${minor}.${build}`;
};

const parseLMProductInformation = (data) => {
  const serialNumber = (data[2] << 8) | data[3];

  const A2750LMProductInfo = {
    operationState: operation_state(data[0]),
    productCode: product_code(data[1]),
    serialNumber: serialNumber,
    hardwareRevision: data[4],
    pcbVersion: data[8],
    applicationVersion: convertVersion(data[9]),
    bootloaderVersion: convertVersion(data[10]),
  };

  return A2750LMProductInfo;
};

const parseLMDIStatus = (data) => {
  const diStatus = {
    channel1: data[0] ? "Energized" : "De-energized",
    channel2: data[1] ? "Energized" : "De-energized",
    channel3: data[2] ? "Energized" : "De-energized",
    channel4: data[3] ? "Energized" : "De-energized",
    channel5: data[4] ? "Energized" : "De-energized",
    channel6: data[5] ? "Energized" : "De-energized",
    channel7: data[6] ? "Energized" : "De-energized",
    channel8: data[7] ? "Energized" : "De-energized",
    channel9: data[8] ? "Energized" : "De-energized",
    channel10: data[9] ? "Energized" : "De-energized",
    channel11: data[10] ? "Energized" : "De-energized",
    channel12: data[11] ? "Energized" : "De-energized",
    channel13: data[12] ? "Energized" : "De-energized",
    channel14: data[13] ? "Energized" : "De-energized",
    channel15: data[14] ? "Energized" : "De-energized",
    channel16: data[15] ? "Energized" : "De-energized",
    channel17: data[16] ? "Energized" : "De-energized",
    channel18: data[17] ? "Energized" : "De-energized",
  };
  return diStatus;
};

const parseLMDOStatus = (data) => {
  const doStatus = {
    channel1: data[0] ? "Close" : "Open",
    channel2: data[1] ? "Close" : "Open",
    channel3: data[2] ? "Close" : "Open",
    channel4: data[3] ? "Close" : "Open",
    channel5: data[4] ? "Close" : "Open",
    channel6: data[5] ? "Close" : "Open",
    channel7: data[6] ? "Close" : "Open",
    channel8: data[7] ? "Close" : "Open",
    channel9: data[8] ? "Close" : "Open",
  };
  return doStatus;
};

const parseA2750LDInformation = (data) => {
  const ldInformation = {
    operationState: operation_state(data[0]),
    productCode: data[1],
    serialNumber: (data[2] << 16) | data[3],
    hardwareRevision: data[4],
    applicationVersion: data[5],
    kernelVersion: data[6],
    bootloaderVersion: data[7],
    pcbVersion: data[8],
  };
  return ldInformation;
};
const parseA2750LMMismatchAlarm = (data) => {
  const alarm = {
    alarm: data[0],
  };
  return alarm;
};

export function parseA2750LMSetup(data) {
  console.log(data);
  return {
    operationMode: data[1],
    digitalOperation: data[2],
    analogDeadband: data[3] | data[4]<<16, 
    alarmThreshold: data[5] | data[6]<<16,
  };
};

const parseIOProductInformation = (data) => {
  const serialNumber = (data[2] << 8) | data[3];

  const A2750IOProductInfo = {
    operationState: operation_state(data[0]),
    moduleType: io_module_type(data[1]),
    serialNumber: serialNumber,
    productCode: product_code(data[4]),    
    applicationVersion: convertVersion(data[5]),
    bootloaderVersion: convertVersion(data[6]),
    hardwareRevision: data[7],
    pcbVersion: data[8],
  };

  return A2750IOProductInfo;
};
export {
  parseLMDIStatus,
  parseLMProductInformation,
  parseLMDOStatus,
  parseA2750LDInformation,
  parseA2750LMMismatchAlarm,
  parseIOProductInformation,
};
