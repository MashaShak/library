const form = document.querySelector("form");
const display = document.querySelector("#display");
const table = document.querySelector("table");

let mylibrary = localStorage.getItem("MyLibrary") ? JSON.parse(localStorage.getItem("MyLibrary")):[];

localStorage.setItem("MyLibrary", JSON.stringify(mylibrary));
const data = JSON.parse(localStorage.getItem("MyLibrary"));

function showForm() {
    form.style.display = (form.style.display == "block") ? "none" : "block";
}

function chooseGrid() {};

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
    trBook.appendChild(bookStatus());
    trBook.appendChild(deleteBtn());
}

function update(button, parent) {
    const parentId = parseFloat(parent.id);
    let index = mylibrary.map(item => {return item.id;}).indexOf(parentId);
    if (button.id == "change") { 
        mylibrary[index]["isRead"] = status.innerHTML;     
    } 
    else if (button.id =="delete"){
        mylibrary.splice(index, 1);
        button.parentElement.remove();
    }
    localStorage.setItem("MyLibrary", JSON.stringify(mylibrary));
}

function deleteBook() {
    const button = document.createElement("button");
    button.classList.add("btn-delete");
    button.id = "delete";
    button.innerHTML = "<img src='https://img.icons8.com/ios/30/000000/delete-forever.png'/>"; 
    button.addEventListener('click', function() {
    //update(button, button.parentElement));
    
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
    button.innerHTML = "Change Status";
    button.id = "change";
    button.classList.add("btn-style", "btn-status");
    button.addEventListener('click', function() {
        let status = button.previousSibling;
        if (status.innerHTML == "Read") status.innerHTML = "In Progress";
        else if (status.innerHTML == "In Progress") status.innerHTML = "Not Read";
        else status.innerHTML = "Read";
        //update(button);
        
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
    console.log(mylibrary);
    
    //local storage
    localStorage.setItem("MyLibrary", JSON.stringify(mylibrary));

    displayBook(newBook);
    //displayList(newBook);
    form.reset();
}

data.forEach((book) => {
    displayBook(book);
    //displayList(book);
});

document.addEventListener("DOMContentLoaded", ()=> {
    document.querySelector("#addNewBook").addEventListener("click", addNewBook);
});
