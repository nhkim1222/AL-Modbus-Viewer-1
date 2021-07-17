const operation_state = (val) => {
  if (val === 1) return "Bootloader";
  if (val === 2) return "Application";
  return "UNIDENIFIED";
};

const io_module_type = (val) => {
  switch (val) {
    case 0:
      return "invalid";
    case 1:
      return "A2750IO-DI";
    case 2:
      return "A2750IO-DO";
    case 3:
      return "A2750IO-AI";
    case 4:
      return "A2750IO-DI2";
    case 5:
      return "A2750IO-DIO";
    case 6:
      return "A2750IO-DO2";
    case 7:
      return "A2750IO-AIO";
    case 8:
      return "A2750IO-AI2";
  }
};
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

export { parseIOProductInformation };
