function addEditableText(text){
    var element = document.getElementById("textEditingArea")
    if (!text){
        return ""

    }
    var chorus = text.chorus
    var lyrics = text.lyrics
    var ind = 0 
    var chorusText = chorus["main"]
    if (chorusText != ""){
        element.innerHTML += '<br>'
        element.innerText += `<R>`
        element.innerHTML += `<br>${chorusText}`
    }
    for (var verse of lyrics){
        
        if (!verse){
            continue
        }
  
        if (String(ind - 1) in chorus){
       
            element.innerHTML += '<br>'
            element.innerText += `<R>`
            let singleChorus = chorus[String(ind -1 )]
            element.innerHTML += `<br>${singleChorus}`
        }
        element.innerHTML += '<br><br>'
        element.innerText += `<Z>`
        element.innerHTML += `<br>${verse.replaceAll("\n","<br>")}`
        ind++
        
        
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

function parseEditedSong(editedText){
    var chorus = {"main": ""}
    var lyrics = []
    
    var startInd =0
    var endInd =0

    

    while ( endInd != -1){
    
        var ind1 = editedText.indexOf("<Z>")
        var ind2 = editedText.indexOf("<R>")
        if (ind1 == -1 && ind2 == -1){
            break
        }

        if (ind2 == -1){
            startInd = ind1
        }
        else if (ind1 == -1){
            startInd == ind2
        }
        else {
            startInd = Math.min(ind1,ind2)
        }

        ind1 = editedText.indexOf("<Z>",startInd + 1 )
        ind2 = editedText.indexOf("<R>",startInd + 1 )
        if (ind1 == -1 && ind2 == -1){
            endInd = editedText.length
        }
    
        if (ind2 == -1){
            endInd = ind1
        }
        else if (ind1 == -1){
            endInd = ind2
        }
        else {
            endInd = Math.min(ind1,ind2)
        }
        

        var text = editedText.slice(startInd, endInd)
        console.log(text)
        editedText = editedText.slice(endInd)

        switch (text.slice(0,3)){
            case "<Z>":
                if (text.slice(3) != ""){
                    lyrics.push(text.slice(3))
                }
                

                break
            case "<R>":
                if (text.slice(3) == ""){
                    break
                }
                if (Object.keys(chorus).length === 1){
                    chorus["main"] = text.slice(3)
                }
                else{
                    chorus[String(lyrics.length - 1)] = text.slice(3)
                }
                break
                
        }

    }

    return {
        "chorus": chorus,
        "lyrics": lyrics
    }
}

export { addEditableText, elementWarning, failedSummary, succesfulSummary, parseEditedSong }