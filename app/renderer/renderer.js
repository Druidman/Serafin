// file imports
import "./dom/index/eventHandlers.js"

// module imports
import { load_previews } from "./dom/index/utils.js"
import { getSongsPreview } from "./dom/index/ipcHandlers.js"


var previews = getSongsPreview(10000,"wszystko")
load_previews(previews)
















