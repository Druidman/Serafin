const { contextBridge, ipcRenderer } = require("electron")




contextBridge.exposeInMainWorld("electronAPI", {
    getSongsPreview: (amount,categoryName) => ipcRenderer.sendSync("getSongsPreview",amount,categoryName),
    getSongsByPrefix: (prefix,categoryName) => ipcRenderer.sendSync("getSongsByPrefix",prefix,categoryName),
    getSongsFullById: (ids) => ipcRenderer.sendSync("getSongsFullById",ids),
    getSongFullById: (id) => ipcRenderer.sendSync("getSongFullById",id),
    getSongCategories: () => ipcRenderer.sendSync("getSongCategories"),
    updateSongById: (id,rowToEdit,valueToInsert)=> ipcRenderer.sendSync("updateSongById",id,rowToEdit,valueToInsert),
    openDisplayWindow: () => ipcRenderer.sendSync("openDisplayWindow"),
    checkDisplayWindowActive: (id) => ipcRenderer.sendSync("checkDisplayWindowActive",id),
    writeToDisplayWindow: (id,data)=> ipcRenderer.sendSync("writeToDisplayWindow",id,data),
    setDisplayWindowFontSize: (id)=> ipcRenderer.sendSync("setDisplayWindowFontSize", id)
})
