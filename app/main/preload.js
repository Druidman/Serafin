const { contextBridge, ipcRenderer } = require("electron")


contextBridge.exposeInMainWorld("electronAPI", {
    getSongsPreview: (amount) => ipcRenderer.sendSync("getSongsPreview",amount),
    getSongsByPrefix: (prefix) => ipcRenderer.sendSync("getSongsByPrefix",prefix)
})
