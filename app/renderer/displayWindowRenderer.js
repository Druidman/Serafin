
function setFontSize(){
 
    var displayDoc = document
    var verseBox = displayDoc.getElementById("currVerse")
    var boxRect = verseBox.getBoundingClientRect()

    var text = verseBox.children[0]
    var textRect = text.getBoundingClientRect()
    var fontSizeInPx = getComputedStyle(text).fontSize
    var fontSize = Number(fontSizeInPx.slice(0,fontSizeInPx.length-2))

    while (textRect.bottom < boxRect.bottom-10){
        text.style.fontSize = `${fontSize + 1}px`
        var boxRect = verseBox.getBoundingClientRect()

        text = verseBox.children[0]
        textRect = text.getBoundingClientRect()
        fontSizeInPx = getComputedStyle(text).fontSize
        fontSize = Number(fontSizeInPx.slice(0,fontSizeInPx.length-2))

    }
    text.style.fontSize = `${fontSize - 1}px`
}

window.electronAPI.onData((data)=>{
    console.log(data)
    var container = document.getElementById("container")
    
    container.innerHTML = ""

    var verseBox = document.createElement("div")
    verseBox.classList.add("verseBox")
    verseBox.setAttribute("id","currVerse")
    var textHolder = document.createElement("p")
    textHolder.textContent = data
    verseBox.appendChild(textHolder)

    container.appendChild(verseBox)
    if (data != " " && data!= ""){
        setFontSize()
    }
})

