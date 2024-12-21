// file imports
import "./dom/eventHandlers.js"

// module imports
import { load_previews } from "./dom/dbutils.js"
import { getSongsPreview } from "./dom/ipcHandlers.js"


var previews = getSongsPreview(10000,"wszystko")
load_previews(previews)
















