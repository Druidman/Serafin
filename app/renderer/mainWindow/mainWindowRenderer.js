// file imports
import { setupIndexEventHandlers } from "./dom/index/indexEventHandlers.js"
import { setupEditorEventHandlers } from "./dom/editor/editorEventHandlers.js"


// module imports
import { load_previews, load_displays } from "./dom/shared/utils.js"
import { getSongsPreview, getAllDisplays } from "./dom/shared/ipcHandlers.js"

document.addEventListener("DOMContentLoaded",()=>{
    setupIndexEventHandlers()
    setupEditorEventHandlers()

    const el = document.getElementById('playlist')
    const sortable = Sortable.create(el, {
        animation: 150,
        ghostClass: "sortable-ghost",
        forceFallback: false,
        chosenClass: "sortable-chosen",
        
        
    })

    const category = "wszystko"

    var previews = getSongsPreview(category)
    load_previews(previews)

    var displays = getAllDisplays()

    load_displays(displays)
})

















