import requests, json

from bs4 import BeautifulSoup


    
check = input("Update?: (Y or N)").upper()
if check == "Y":
    data = requests.get("https://musicamsacram.pl/spiewnik/kategorie/17-hymny")
    data = data.text
    with open("data.txt", "w") as file:
        file.write(data)
        file.close()

else:
    with open("data.txt", "r") as file:
        lines = file.readlines()
        file.close()
    data = ""
    for line in lines:
        data += line


document = BeautifulSoup(data,"html.parser")

table = document.find(class_="table-responsive")
body = table.tbody
elements = body.find_all("td")

with open("data.json", "w") as file:
    data = {"SampleDataSongs": []}
    for element in elements:
        a = element.a
        if not a:
            continue
        name = a.text
        link = a['href']

        dataa = requests.get(link)
        document = BeautifulSoup(dataa.text,"html.parser")

        container = document.find_all(class_="tab-content")
        lyrics = container[0].p.text

      
        model = [name,lyrics]
        data["SampleDataSongs"].append(model)
        
        
    data  = json.dumps(data)
    file.write(data)
    file.close()





    









