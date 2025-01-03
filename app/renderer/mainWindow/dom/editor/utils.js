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

export { createEditableText }