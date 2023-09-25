
// ****** to do task app ********** start 
let input = document.querySelector("form input:first-child")
let form = document.querySelector(`form input[type = "submit"]`).parentElement
let sup = document.querySelector(`form input[type = "submit"]`)
let parent_text = document.querySelector(".text-tasc")
let deelAll = document.querySelector("#dellAll")
let dataTask_arry = []
if (localStorage.getItem('theTask')) {
    dataTask_arry = JSON.parse(localStorage.getItem('theTask'))
}
parent_text.onclick = e => {
    if (e.target.classList.contains("btn")) {
        removeTask(e.target.parentElement.dataset.id)
    }
    if (e.target.classList.contains("tasc")) {
        e.target.classList.toggle("done")
        completeStatus(e.target.dataset.id)
    }
    if (dataTask_arry.length > 7) {
        deelAll.classList.add("show")
    }
    else {

        deelAll.classList.remove("show")
    }
}
form.onsubmit = e => {
    e.preventDefault()
    if (input.value !== "") {
        fromInptoArry(input.value)
        saveArrytoLocalStoreg(dataTask_arry)
        input.value = ""
    }
    if (dataTask_arry.length > 7) {
        deelAll.classList.add("show")
    }
    else {

        deelAll.classList.remove("show")
    }

}
function fromInptoArry(title) {
    let thetask = {
        titleTask: title,
        id: Date.now(),
        complete: false
    }
    dataTask_arry.push(thetask)
    creatElmentfrom(dataTask_arry)
}
// creatElment in page from

function creatElmentfrom(fromArry) {
    parent_text.innerHTML = ""
    fromArry.forEach(task => {
        let div_task = document.createElement('div')
        div_task.setAttribute("data-id", task.id)
        div_task.className = "tasc"
        div_task.appendChild(document.createTextNode(task.titleTask.charAt(0).toUpperCase() + task.titleTask.slice(1)))
        if (task.complete) {
            div_task.className = "tasc done"
        }
        let imgDone = document.createElement("img")
        imgDone.src = "imgs/done.png"
        div_task.append(imgDone)
        let theBtn = document.createElement("button")
        theBtn.className = "btn"
        theBtn.append(document.createTextNode("حذف"))
        div_task.appendChild(theBtn)
        parent_text.appendChild(div_task)
    })
}
function saveArrytoLocalStoreg(arry) {
    window.localStorage.setItem("theTask", JSON.stringify(arry))
}
function addDatafromLocaltopage() {
    if (localStorage.theTask) {
        creatElmentfrom(dataTask_arry)
    }
    if (dataTask_arry.length > 7) {
        deelAll.classList.add("show")
    }
    else {

        deelAll.classList.remove("show")
    }
}
addDatafromLocaltopage()
function removeTask(checkId) {
    dataTask_arry = dataTask_arry.filter(ele => {
        return ele.id != checkId
    })
    saveArrytoLocalStoreg(dataTask_arry)
    creatElmentfrom(dataTask_arry)
}

function completeStatus(check) {
    for (i = 0; i < dataTask_arry.length; i++) {
        if (dataTask_arry[i].id == check) {
            dataTask_arry[i].complete == false ? dataTask_arry[i].complete = true : dataTask_arry[i].complete = false
        }

    }
    saveArrytoLocalStoreg(dataTask_arry)
}
// dell all btn 
deelAll.onclick = _ => {
    parent_text.innerHTML = ""
    localStorage.removeItem("theTask")
    window.location.reload()
}
// ****** to do task app ********** end 

// ********* settings ***********
setTimeout(() => {
    parent_text.classList.add("show")
}, 500);
let settingsSpan = document.getElementById("set")
let settingsDiv = document.getElementById("set").nextElementSibling
let close_settingsDiv = document.getElementById("close_st")
window.document.body.onclick = e => {
    if (e.target.id == "set") {
        settingsDiv.classList.add("show")
    }
    if (e.target.tagName == "DIV" || e.target.tagName == "MAIN") {
        settingsDiv.classList.remove("show")
    }
    if (e.target.id == "close_st") {
        settingsDiv.classList.remove("show")
    }
}

/// click bacground 

let colors_div = document.getElementById("colors")
let allColorfromDiv = document.querySelectorAll(".colors > div")
var root = document.querySelector(":root")
var rootStyle = getComputedStyle(root)
var bc = rootStyle.getPropertyValue("--main-bacground")
if (localStorage.getItem("bacground")) {
    root.style.setProperty("--main-bacground", localStorage.getItem("bacground"))
}
else {
    root.style.setProperty("--main-bacground", "#795548")
}
allColorfromDiv.forEach((div) => {
    div.addEventListener("click", (e) => {
        allColorfromDiv.forEach(e => {
            e.classList.remove("active")
        })
        div.classList.add("active")
        root.style.setProperty("--main-bacground", `${e.target.dataset.color}`)
        localStorage.setItem("bacground", e.target.dataset.color)
    })
})




