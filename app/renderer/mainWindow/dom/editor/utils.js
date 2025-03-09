function addEditableText(lyrics){
    var textEditor = document.getElementById("textEditingArea")
    if (!lyrics){
        return ""
    }
 
    for (var verse of lyrics){
        if (!verse){
            continue
        }
        if (verse.includes("Refren:")){
            var addon = "<R>"
        }
        else {
         
            var addon = `<Z>`
        }
        textEditor.innerHTML += '<br><br>'
        textEditor.innerText += addon
        textEditor.innerHTML += `<br>${verse.replaceAll("\n","<br>")}`
        
    }
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

export { addEditableText, elementWarning, failedSummary, succesfulSummary }