
let input = document.querySelector("form input:first-child")
let form = document.querySelector(`form input[type = "submit"]`).parentElement
let sup = document.querySelector(`form input[type = "submit"]`)
let parent_text = document.querySelector(".text-tasc")
let deelAll = document.querySelector("#dellAll")
parent_text.onclick = e => {
    if (e.target.classList.contains('btn')) {
        e.target.parentElement.remove()
        if(dataArry.length > 8) {
            console.log(dataArry)
            deelAll.classList.add("show")
        }
        else{
            deelAll.classList.remove("show")
        }
        remove_item_inTo_local(e.target.parentElement.getAttribute("data-id"))
        
    }
    if (e.target.classList.contains('tasc')) {
        complete_edit(e.target.getAttribute("data-id"))
        e.target.classList.toggle('done')
    }
    
}
deelAll.onclick = _=>{
    dellAll()
}
// console.log(parent_text.getAttribute("class"))

let dataArry = []
parent_text.classList.contains
if (localStorage.getItem("taskes")) {
    dataArry = JSON.parse(localStorage.getItem("taskes"))
}

function get_data_from_localstoreg() {
    let data_local_storg = localStorage.getItem("taskes")
    if (data_local_storg) {
        add_elment_to_page(JSON.parse(data_local_storg))
    }
}

get_data_from_localstoreg()

// **** input customize ****

form.onsubmit = e => {
    e.preventDefault()
    if (input.value !== "") {
        get_value_and_add_arry(input.value)
        add_Arry_toLocalstoreg(dataArry)
        input.value = ""
        if(dataArry.length >= 8) {
            deelAll.classList.add("show")
        }
        else{
            deelAll.classList.remove("show")
        }
    }
}

// **** add elment to arry **** 
function get_value_and_add_arry(title) {
    let data = {
        title: title,
        id: Date.now(),
        complete: false
    }
    dataArry.push(data)
    
    add_elment_to_page(dataArry)
}
// **** get Element from arry to bage  **** 
function add_elment_to_page(dataArry) {
 
    parent_text.innerHTML = ""
    dataArry.forEach(all_task => {
        let div_task = document.createElement('div')
        div_task.setAttribute("data-id", all_task.id)
        div_task.className = "tasc"
        div_task.appendChild(document.createTextNode(all_task.title.charAt(0).toUpperCase() + all_task.title.slice(1)))
        if (all_task.complete) {
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
    console.log(dataArry)
}
// end
function add_Arry_toLocalstoreg(dataArry) {
    localStorage.setItem("taskes", JSON.stringify(dataArry))
}





function remove_item_inTo_local(id) {
    dataArry = dataArry.filter(task => {
        return task.id != id
    })
    add_Arry_toLocalstoreg(dataArry)
    
}


function complete_edit(id) {
    for (let i = 0; i < dataArry.length; i++) {
        if (dataArry[i].id == id) {
        
            dataArry[i].complete == false ? dataArry[i].complete = true : dataArry[i].complete = false
        }
        
    }
    
    add_Arry_toLocalstoreg(dataArry)
    
}

function dellAll () {
    if(dataArry.length >= 8) {
        deelAll.classList.add("show")
    }
    else{
        deelAll.classList.remove("show")
    }
    window.localStorage.clear()
    parent_text.innerHTML = ""
    location.reload()
    
}

console.log()
