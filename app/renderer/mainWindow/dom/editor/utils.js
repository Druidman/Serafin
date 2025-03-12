function addEditableText(text,element){
    if (!text){
        return ""

    }
    if (element.id == "chorusEditingArea"){
        element.innerHTML += text
        return ""
    }
 
    for (var verse of text){
        if (!verse){
            continue
        }
  
        element.innerHTML += '<br><br>'
        element.innerText += `<Z>`
        element.innerHTML += `<br>${verse.replaceAll("\n","<br>")}`
        
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