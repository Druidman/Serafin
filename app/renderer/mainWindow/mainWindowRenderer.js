// file imports
import { setupIndexEventHandlers } from "./dom/index/indexEventHandlers.js"
import { setupEditorEventHandlers } from "./dom/editor/editorEventHandlers.js"


// module imports
import { load_previews, load_displays } from "./dom/shared/utils.js"
import { getSongsPreview, getAllDisplays } from "./dom/shared/ipcHandlers.js"
import { sortPreviews } from "./dom/shared/utils.js"

document.addEventListener("DOMContentLoaded",()=>{
    setupIndexEventHandlers()
    setupEditorEventHandlers()


    const category = "wszystko"

    var previews = getSongsPreview(category)
    previews = sortPreviews(previews)
    load_previews(previews)

    var displays = getAllDisplays()

    load_displays(displays)
})

















