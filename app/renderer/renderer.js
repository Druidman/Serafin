// file imports
import "./dom/eventHandlers.js"

// module imports
import { load_previews } from "./dom/dbutils.js"
import { getSongsPreview } from "./dom/ipcHandlers.js"
import { openNewWindow } from "./dom/windowManager/window.js"

var previews = getSongsPreview(100,"")
load_previews(previews)

openNewWindow("display.html","displayWind")
















