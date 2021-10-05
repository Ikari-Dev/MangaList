
function itemCreate(name = "Manga", desc = "Manga dscription", imgurl = "../asset/default.jpg", link = "#", genre = "Default"){

    let card = document.createElement("div")
    card.classList.add("card")

    let main = document.createElement("div")
    main.classList.add("main")

    let img = document.createElement("img")
    img.setAttribute("src",imgurl)

    let cardbody = document.createElement("div")
    cardbody.classList.add("card-body")

    let hcinq = document.createElement("h3")
    hcinq.classList.add("card-title")
    hcinq.innerText = name

    let pdesc = document.createElement("p")
    pdesc.classList.add("card-text")
    pdesc.innerText = desc

    let gre = document.createElement("p")
    gre.classList.add("card-text","genre")
    gre.innerText = genre

    let linkbutton = document.createElement("a")  
    linkbutton.classList.add("btn", "btn-link", "effect01")
    linkbutton.setAttribute("href", link)
    linkbutton.innerText = "Detail"
   
    let divbot = document.createElement("div")
    divbot.classList.add("divlink")

    cardbody.append(hcinq, pdesc, gre)

    divbot.appendChild(linkbutton)
 
    main.append(img,cardbody)
    card.append(main, divbot)

    let currentdiv = document.querySelector(".container")
    currentdiv.appendChild(card)
    
}

function cleancontainer(){
    let container = document.querySelector(".container")
    container.innerHTML = ""
}


document.querySelector(".search").addEventListener("click", function(e){

    e.preventDefault()

    let searchbar = document.querySelector(".form")
    if(searchbar.value != "") {
        
        cleancontainer()
        parserJson(searchbar.value)
    }
})

function handleEvent(e){
    var contain = document.querySelector(".barcontain").style.display = "block"
    var container = document.querySelector(".container").style.display = "none"
    var container = document.querySelector(".up").style.display = "none"
    var nav = document.querySelector(".navbar").style.display = "none"
    
    document.querySelector(".pb").innerHTML = e.loaded
    document.querySelector(".bar").style.width = 60 * e.loaded / 100 + "vw"
       
    
    if(e.type = "loadend") {
        var stamp = setInterval(() => {
            fadeOut(document.querySelector(".barcontain"))

            var stamp2 = setInterval(() => {
                //fadeIn(document.querySelector(".container"))
                //fadeIn(document.querySelector(".navbar"))
                //fadeIn(document.querySelector(".up"))
                document.querySelector(".container").style.display = "flex"
                document.querySelector(".navbar").style.display = "flex"
                document.querySelector(".up").style.display = "flex"


                clearInterval(stamp2)
            }, 1500)
            clearInterval(stamp)
        }, 2000);
    }
}

function parserJson(value = ""){ 
    var request = new XMLHttpRequest();
    let cpt=0;
    request.addEventListener('loadstart',handleEvent,false)
    request.addEventListener('load',handleEvent,false)
    request.addEventListener('progress',handleEvent,false)
    request.addEventListener('loadend',handleEvent,false)
    request.open("GET", "./data/data.json", true)
    request.responseType = 'json'
    request.send()
    request.onload = function (){
        if(request.readyState === 4 && request.status === 200){
            var data = request.response
            if(value != ""){
                data.manga.forEach(element => {
                    if(element.name.toUpperCase().includes(value.toUpperCase()) || 
                    element.genre.toUpperCase().includes(value.toUpperCase()) ||
                    element.description.toUpperCase().includes(value.toUpperCase())){
                        itemCreate(element.name, element.description, element.img, element.wikilink, element.genre)
                    
                    }
                })
            }
            else {
                data.manga.forEach(element => {
                    itemCreate(element.name, element.description, element.img, element.wikilink, element.genre)
                })
            }
        }
    }
    
    
    
}

function fadeOut(element) {
    var op = 1
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer)
            element.style.display = "none"
        }
        element.style.opacity = op
        element.style.filter = 'alpha(opacity=' + op * 100 + ")"
        op -= op * 0.1
    }, 50)
}

function fadeIn(element) {
    var op = 0.1
    element.style.display = "flex"
    var timer1 = setInterval(function () {
        if (op >= 0.9){
            clearInterval(timer1)
            console.log("test")
        }
        element.style.opacity = op
        //element.style.filter = "alpha(opacity=" + op * 100 + ")"
        op += op * 0.1
        console.log(op)
    }, 50)
}

let portal = document.querySelector(".navbar-brand")
portal.addEventListener("click", function(e){
    e.preventDefault()
    
    if(portal.innerHTML.toUpperCase() == "MANGALIST"){
        portal.innerHTML = "ANIMELIST"
    }
    else {
        portal.innerHTML = "MANGALIST"
    }
    

})