const form = document.querySelector("form");
const display = document.querySelector("#display");
const list = document.querySelector("#list");
const tbody = document.querySelector("tbody");

let mylibrary = localStorage.getItem("MyLibrary") ? JSON.parse(localStorage.getItem("MyLibrary")):[];

localStorage.setItem("MyLibrary", JSON.stringify(mylibrary));
const data = JSON.parse(localStorage.getItem("MyLibrary"));
data.forEach((book) => {
        displayAll(display, "div", "div", book); 
});


const showForm = () => form.style.display = (form.style.display == "block") ? "none" : "block";

function Book(title, author, pages, status){
    this.id = Date.now()
    this.title = title
    this.author = author
    this.pages = pages 
    this.isRead = status
}

function displayAll(parent, element, elementChild, book) {
    const el = document.createElement(element);
    parent.appendChild(el);    
    if (parent == display) el.classList.add("card");
    for (let key in book) {
        if (key == "id") {
            el.id = book[key];
        } else { 
        const elChild = document.createElement(elementChild);
        if (key == "author") elChild.textContent = "by ";
        elChild.textContent += book[key];
        if (key == "pages") elChild.textContent += " pages";
        el.appendChild(elChild);
        }
    }
    el.appendChild(changeStatus());
    el.appendChild(deleteBook());
}

function countBooks() {
    let read = mylibrary.filter(item => item.isRead == "Not Read").length;
    let inProgress = mylibrary.filter(item => item.isRead == "In Progress").length;
    let finished = mylibrary.filter(item => item.isRead == "Read").length;
    document.querySelector("#all").innerHTML = `${read} Not Read  &middot;  ${inProgress} In Progress  &middot;  ${finished} Finishied`; 
}
function deleteBook() {
    const button = document.createElement("button");
    button.classList.add("btn-icons");
    button.innerHTML = '<i class="material-icons">delete</i>'; 
    button.addEventListener('click', function() {
        let index = mylibrary.findIndex(item => item.id == parseFloat(button.parentElement.id));
        mylibrary.splice(index, 1);
        localStorage.setItem("MyLibrary", JSON.stringify(mylibrary));
        button.parentElement.remove();
        countBooks();
    });
    return button;
}
function changeStatus() {
    const button = document.createElement("button");
    button.innerHTML = "Change Status";
    button.classList.add("btn-style", "btn-status");
    button.addEventListener('click', function() {
        let status = button.previousSibling;
        if (status.innerHTML == "Read") status.innerHTML = "In Progress";
        else if (status.innerHTML == "In Progress") status.innerHTML = "Not Read";
        else status.innerHTML = "Read";
        let index = mylibrary.findIndex(item => item.id == parseFloat(button.parentElement.id));
        mylibrary[index]["isRead"] = status.innerHTML;
        localStorage.setItem("MyLibrary", JSON.stringify(mylibrary));
        countBooks();
    })
    return button;
}
const addNewBook = (e) => {
    e.preventDefault(); 
    let newBook = new Book(
        document.querySelector("#title").value,
        document.querySelector("#author").value,
        document.querySelector("#pages").value,
        document.querySelector("#status").value
    );
    mylibrary.push(newBook);
    localStorage.setItem("MyLibrary", JSON.stringify(mylibrary));
    displayAll(display, "div", "div", newBook); 
    displayAll(tbody, "tr", "td", newBook);
    countBooks();
    form.reset();
}
function clear(el) {
    while (el.firstChild) {
        el.removeChild(el.firstChild)
    }
}
function showGrid() {
    if (display.style.display == "none") {
        list.style.display = "none";    
        display.style.display = "block";
        clear(display);
        mylibrary.forEach((book) => {
            displayAll(display, "div", "div", book); 
        });

    }
}
function showList() {
    if (list.style.display != "block") {
        display.style.display = "none";
        list.style.display = "block"; 
        clear(tbody);
        mylibrary.forEach((book) => {
            displayAll(tbody, "tr", "td", book);   
        });
    }
}


countBooks();
document.addEventListener("DOMContentLoaded", ()=> {
    document.querySelector("#addNewBook").addEventListener("click", addNewBook);
});
