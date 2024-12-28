// file imports
import "./dom/index/indexEventHandlers.js"
import "./dom/editor/editorEventHandlers.js"

// module imports
import { load_previews } from "./dom/shared/utils.js"
import { getSongsPreview } from "./dom/shared/ipcHandlers.js"


var previews = getSongsPreview(10000,"wszystko")
load_previews(previews)
















