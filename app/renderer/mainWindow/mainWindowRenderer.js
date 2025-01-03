// file imports
import "./dom/index/indexEventHandlers.js"
import "./dom/editor/editorEventHandlers.js"

// module imports
import { load_previews, load_displays } from "./dom/shared/utils.js"
import { getSongsPreview, getAllDisplays } from "./dom/shared/ipcHandlers.js"

const category = "wszystko"

var previews = getSongsPreview(category)
load_previews(previews)

var displays = getAllDisplays()

load_displays(displays)
















