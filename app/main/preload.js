const { contextBridge, ipcRenderer } = require("electron")


contextBridge.exposeInMainWorld("electronAPI", {
    getData: (amount) => ipcRenderer.sendSync("getData",amount)
    
})
