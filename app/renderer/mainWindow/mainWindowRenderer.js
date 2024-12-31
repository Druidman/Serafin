// file imports
import "./dom/index/indexEventHandlers.js"
import "./dom/editor/editorEventHandlers.js"

// module imports
import { load_previews, load_displays } from "./dom/shared/utils.js"
import { getSongsPreview, getAllDisplays } from "./dom/shared/ipcHandlers.js"


var previews = getSongsPreview(100,"wszystko")
load_previews(previews)

var displays = getAllDisplays()
console.log(displays)
load_displays(displays)
















