const { contextBridge, ipcRenderer } = require("electron/renderer")

contextBridge.exposeInMainWorld("electronAPI", {
    getData: (amount) => ipcRenderer.sendSync("getData",amount)
    
})
