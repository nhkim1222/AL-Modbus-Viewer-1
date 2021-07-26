export default class Mutex {
  constructor() {
    this.lock = false;
  }
  async acquire() {
    while (true) {
      if (this.lock === false) {
        break;
      }
      // custom sleep (setTimeout)
      await sleep(100);
    }
    this.lock = true;
  }
  release() {
    this.lock = false;
  }
}
function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}
