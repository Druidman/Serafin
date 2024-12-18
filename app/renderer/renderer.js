// file imports
import "./dom/eventHandlers.js"

// module imports
import { load_categories, load_previews } from "./dom/dbutils.js"
import { getSongCategories, getSongsPreview } from "./dom/ipcHandlers.js"
import { openNewWindow } from "./dom/windowManager/window.js"

var previews = getSongsPreview(100,"wszystko")
load_previews(previews)

openNewWindow("display.html","displayWind")
















