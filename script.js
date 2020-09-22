const form = document.querySelector("form");
const display = document.querySelector("#display");
const list = document.querySelector("#list");
const table = document.querySelector("table");
const tbody = document.querySelector("tbody");

let mylibrary = localStorage.getItem("MyLibrary") ? JSON.parse(localStorage.getItem("MyLibrary")):[];

localStorage.setItem("MyLibrary", JSON.stringify(mylibrary));

const data = JSON.parse(localStorage.getItem("MyLibrary"));
data.forEach((book) => {
        displayBook(book); 
});


function showForm() {
    form.style.display = (form.style.display == "block") ? "none" : "block";
}

function Book(title, author, pages, status){
    this.id = Date.now()
    this.title = title
    this.author = author
    this.pages = pages 
    this.isRead = status
}


function displayBook(book) {
    const divBook = document.createElement("div"); 
    divBook.classList.add("card");
    display.appendChild(divBook);
    for (let key in book) {
            if (key == "id") {
                divBook.id = book[key];
            } else {  
                const divKey = document.createElement("div");
                if (key =="author") divKey.textContent = "by ";
                divKey.textContent += book[key];
                if (key == "pages") divKey.textContent += " pages";
                divBook.appendChild(divKey);
                if (key == "isRead") {
                    divBook.appendChild(changeStatus());
                }
            }
        }
    divBook.appendChild(deleteBook());
}

function displayList(book) {
    const trBook = document.createElement("tr");
    tbody.appendChild(trBook);        
    for (let key in book) {
        if (key == "id") {
            trBook.id = book[key];
        } else { 
        const tdBook = document.createElement("td");
        if (key == "author") tdBook.textContent = "by ";
        tdBook.textContent += book[key];
        if (key == "pages") tdBook.textContent += " pages";
        trBook.appendChild(tdBook);
        }
    }
    trBook.appendChild(changeStatus());
    trBook.appendChild(deleteBook());
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
};
   

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
    displayBook(newBook);
    displayList(newBook);
    countBooks();
    form.reset();
}


function renderGrid() {
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild)
    }
    mylibrary.forEach((book) => {
        displayBook(book); 
    });
}
function renderList() {
    while (display.firstChild) {
        display.removeChild(display.firstChild)
    }
    mylibrary.forEach((book) => {
        displayList(book);    
    });
}
function showGrid() {
    if (display.style.display == "none") {
        list.style.display = "none";    
        display.style.display = "block";
        renderGrid();
    }
}
function showList() {
    if (list.style.display != "block") {
        display.style.display = "none";
        list.style.display = "block"; 
        renderList();
    }
}



function countBooks() {
    let read = mylibrary.filter(item => item.isRead == "Not Read").length;
    let inProgress = mylibrary.filter(item => item.isRead == "In Progress").length;
    let finished = mylibrary.filter(item => item.isRead == "Read").length;
    document.querySelector("#all").innerHTML = `${read} Not Read  &middot;  ${inProgress} In Progress  &middot;  ${finished} Finishied`; 
}

countBooks();
document.addEventListener("DOMContentLoaded", ()=> {
    document.querySelector("#addNewBook").addEventListener("click", addNewBook);
});
