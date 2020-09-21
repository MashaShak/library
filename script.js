const form = document.querySelector("form");
const display = document.querySelector("#display");
const list = document.querySelector("#list");
const table = document.querySelector("table");

let mylibrary = localStorage.getItem("MyLibrary") ? JSON.parse(localStorage.getItem("MyLibrary")):[];

localStorage.setItem("MyLibrary", JSON.stringify(mylibrary));
const data = JSON.parse(localStorage.getItem("MyLibrary"));



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
                divKey.textContent = book[key];
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
    table.appendChild(trBook);        
    for (let key in book) {
        if (key == "id") {
            trBook.id = book[key];
        } else { 
        const tdBook = document.createElement("td");
        tdBook.textContent = book[key];
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
        const parentId = parseFloat(button.parentElement.id);
        let index = mylibrary.map(item => {return item.id;}).indexOf(parentId);
        mylibrary.splice(index, 1);
        localStorage.setItem("MyLibrary", JSON.stringify(mylibrary));
        button.parentElement.remove();
    });
    return button;
};


    

function changeStatus() {
    const button = document.createElement("button");
    button.innerHTML = "Change";
    button.classList.add("btn-style", "btn-status");
    button.addEventListener('click', function() {
        let status = button.previousSibling;
        if (status.innerHTML == "Read") status.innerHTML = "In Progress";
        else if (status.innerHTML == "In Progress") status.innerHTML = "Not Read";
        else status.innerHTML = "Read";
        let parentId = parseFloat(button.parentElement.id);
        let index = mylibrary.map(item => {return item.id;}).indexOf(parentId);
        mylibrary[index]["isRead"] = status.innerHTML;
        localStorage.setItem("MyLibrary", JSON.stringify(mylibrary));

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
    form.reset();
}

data.forEach((book) => {
    displayBook(book);
    displayList(book);
});


function showGrid() {
    list.style.display = "none";
    display.style.display = "block";
}
function showList() {
    list.style.display = "block";
    display.style.display = "none";  
}


document.addEventListener("DOMContentLoaded", ()=> {
    document.querySelector("#addNewBook").addEventListener("click", addNewBook);
});
