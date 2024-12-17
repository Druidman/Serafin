// file imports
import "./dom/eventHandlers.js"

// module imports
import { load_categories } from "./dom/dbutils.js"
import { getSongCategories } from "./dom/ipcHandlers.js"
import { openNewWindow } from "./dom/windowManager/window.js"

var categories = getSongCategories()
load_categories(categories)

openNewWindow("display.html","displayWind")
















