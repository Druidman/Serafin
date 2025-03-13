function addEditableText(text){
    var element = document.getElementById("textEditingArea")
    if (!text){
        return ""

    }
    var chorus = text.chorus
    var lyrics = text.lyrics
    var ind = 0 
    var chorusText = ""
    for (var verse of lyrics){
        if (ind in chorus){
            chorusText = chorus[String(ind)]
        }
        if (!verse){
            continue
        }
  
        element.innerHTML += '<br><br>'
        element.innerText += `<Z>`
        element.innerHTML += `<br>${verse.replaceAll("\n","<br>")}`
        if (chorusText != ""){
            element.innerHTML += '<br>'
            element.innerText += `<R>`
            element.innerHTML += `<br>${chorusText}`
        }
        
        
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