const { contextBridge, ipcRenderer } = require("electron")



contextBridge.exposeInMainWorld("electronAPI", {
    getSongsPreview: (amount) => ipcRenderer.sendSync("getSongsPreview",amount),
    getSongsByPrefix: (prefix) => ipcRenderer.sendSync("getSongsByPrefix",prefix),
    getSongsFullById: (ids) => ipcRenderer.sendSync("getSongsFullById",ids),
    getSongFullById: (id) => ipcRenderer.sendSync("getSongFullById",id),
    getSongCategories: () => ipcRenderer.sendSync("getSongCategories")
})
