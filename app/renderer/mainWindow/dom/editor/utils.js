function createEditableText(lyrics){
    if (!lyrics){
        return ""
    }
    var fullText = ""
    var slideNum = 0
    for (var verse of lyrics){
        if (!verse){
            continue
        }
        if (verse.includes("Refren:")){
            var addon = "( REFREN )"
        }
        else {
            slideNum++
            var addon = `( ZWROTKA ${slideNum} )`
        }
        fullText += `<br><br>${addon}<br>${verse}`
        
    }
    return fullText.replaceAll("\n","<br>")
}

function elementWarning(element){
    element.classList.add("elementWarning")
    window.setTimeout(()=>{
        element.classList.remove("elementWarning")
    }, 1000)
}

function succesfulSummary(button){
    button.classList.add("succesfulSummary")
    window.setTimeout(()=>{
        button.classList.remove("succesfulSummary")
    }, 1000)
}
function failedSummary(button){
    button.classList.add("failedSummary")
    window.setTimeout(()=>{
        button.classList.remove("failedSummary")
    }, 1000)
}

export { createEditableText, elementWarning, failedSummary, succesfulSummary }