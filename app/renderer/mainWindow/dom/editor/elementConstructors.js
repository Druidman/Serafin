function constructOptionCategoryTag(categoryName){
    var option = document.createElement("option")
    option.textContent = categoryName
    option.setAttribute("value",categoryName)
    return option

}
export { constructOptionCategoryTag }