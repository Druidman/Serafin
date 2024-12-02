// file imports
import "./dom/eventHandlers.js"

// module imports
import { load_previews } from "./dom/dbutils.js"
import { getSongsPreview } from "./dom/ipcHandlers.js"

var prevs = getSongsPreview(10)
load_previews(prevs)














