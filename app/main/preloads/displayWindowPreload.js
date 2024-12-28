const { contextBridge, ipcRenderer } = require("electron")




contextBridge.exposeInMainWorld("electronAPI", {
    onData: (callback) => ipcRenderer.on("dataToWrite",(event, data)=> callback(data)),
    
})