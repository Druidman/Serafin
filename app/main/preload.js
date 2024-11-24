const { contextBridge, ipcRenderer } = require("electron/renderer")

contextBridge.exposeInMainWorld("electronAPI", {
    getData: () => ipcRenderer.sendSync("getData")
    
})
