const { contextBridge, ipcRenderer } = require("electron")






contextBridge.exposeInMainWorld("electronAPI", {
    getSongsPreview: (amount,categoryName) => ipcRenderer.sendSync("getSongsPreview",amount,categoryName),
    getSongsByPrefix: (prefix,categoryName) => ipcRenderer.sendSync("getSongsByPrefix",prefix,categoryName),
    getSongFullById: (id) => ipcRenderer.sendSync("getSongFullById",id),
    getSongCategories: () => ipcRenderer.sendSync("getSongCategories"),
    updateSongById: (id,values)=> ipcRenderer.sendSync("updateSongById",id,values),
    openDisplayWindow: (cords) => ipcRenderer.sendSync("openDisplayWindow",cords),
    checkDisplayWindowActive: (id) => ipcRenderer.sendSync("checkDisplayWindowActive",id),
    writeToDisplayWindow: (id,data)=> ipcRenderer.sendSync("writeToDisplayWindow",id,data),
    getAllDisplays: ()=> ipcRenderer.sendSync("getAllDisplays"),
    openFileDialog: (properties) => ipcRenderer.sendSync("openFileDialog",properties),
    createSong: (values)=> ipcRenderer.sendSync("createSong",values),
    saveConfig: (values)=> ipcRenderer.sendSync("saveConfig",values),
    getConfig: ()=> ipcRenderer.sendSync("getConfig"),
    createDatabaseFromJSON: (JSONData) =>ipcRenderer.sendSync("createDatabaseFromJSON",JSONData),
    loadDatabase: (DBPath) => ipcRenderer.sendSync("loadDatabase",DBPath),
    switchToIndex: ()=>ipcRenderer.sendSync("switchToIndex")

    
})
