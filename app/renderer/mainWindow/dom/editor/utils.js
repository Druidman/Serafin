function createEditableText(lyrics){
    if (!lyrics){
        return ""
    }
    var fullText = ""
    var slideNum = 1
    for (var verse of lyrics){
        fullText += `<br><br>( SLAJD ${slideNum} )<br>${verse}`
        slideNum++
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