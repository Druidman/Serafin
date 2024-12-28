const { contextBridge, ipcRenderer } = require("electron")



contextBridge.exposeInMainWorld("electronAPI", {
    getSongsPreview: (amount,categoryName) => ipcRenderer.sendSync("getSongsPreview",amount,categoryName),
    getSongsByPrefix: (prefix,categoryName) => ipcRenderer.sendSync("getSongsByPrefix",prefix,categoryName),
    getSongsFullById: (ids) => ipcRenderer.sendSync("getSongsFullById",ids),
    getSongFullById: (id) => ipcRenderer.sendSync("getSongFullById",id),
    getSongCategories: () => ipcRenderer.sendSync("getSongCategories"),
    updateSongById: (id,rowToEdit,valueToInsert)=> ipcRenderer.sendSync("updateSongById",id,rowToEdit,valueToInsert)
})
