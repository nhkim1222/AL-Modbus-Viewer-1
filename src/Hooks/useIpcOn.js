import { useRef, useEffect } from "react";
const { ipcRenderer } = window.require("electron");

export default function useIpcOn(channel, callbackFunction) {
  const savedHandler = useRef();
  useEffect(() => {
    savedHandler.current = callbackFunction;
  }, [callbackFunction]);
  useEffect(() => {
    if (!ipcRenderer)
      throw new Error(
        "electron-use-ipc-listener: Use useIpcListener in the Renderer process only"
      );
    const eventHandler = (event, ...rest) =>
      savedHandler.current(event, ...rest);
    ipcRenderer.on(channel, eventHandler);
    return () => {
      ipcRenderer.removeListener(channel, eventHandler);
    };
  }, [channel]);
}
