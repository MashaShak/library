const form = document.querySelector("form");
const display = document.querySelector("#display");
const table = document.querySelector("table");

let mylibrary = localStorage.getItem("MyLibrary") ? JSON.parse(localStorage.getItem("MyLibrary")):[];

localStorage.setItem("MyLibrary", JSON.stringify(mylibrary));
const data = JSON.parse(localStorage.getItem("MyLibrary"));

function showForm() {
    form.style.display = (form.style.display == "block") ? "none" : "block";
}

function Book(title, author, pages, status){
    this.id = Date.now();
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
            }
        }
    divBook.appendChild(deleteBtn());
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

function deleteBtn() {
    const button = document.createElement("button");
    button.classList.add("btn-delete");
    button.innerHTML = "<img src='https://img.icons8.com/ios/30/000000/delete-forever.png'/>"; 
    button.addEventListener('click', function() {
        const parentId = parseFloat(button.parentElement.id);
        let removeIndex = mylibrary.map(item => {return item.id;}).indexOf(parentId);
        mylibrary.splice(removeIndex, 1);
        localStorage.setItem("MyLibrary", JSON.stringify(mylibrary));
        button.parentElement.remove();
    });
    return button;
};

function bookUpdate() {
    const parentId = parseFloat(button.parentElement.id);
    let Index = mylibrary.map(item => {return item.id;}).indexOf(parentId);
        
    mylibrary[removeIndex].status = "";    
        

    mylibrary.splice(Index, 1);
    button.parentElement.remove();
    localStorage.setItem("MyLibrary", JSON.stringify(mylibrary));
}
    


function bookStatus() {
    const button = document.createElement("button");
    button.innerHTML = "Change";
    const div = document.createElement("div");
    div.classList.add = "div-wrapper";
    div.style.display = "none;"
    const btnRead = document.createElement("button");
    btnRead.innerHTML = "Not Read";
    const btnInProgress = document.createElement("button");
    btnInProgress.innerHTML = "In Progress";
    const btnFinished = document.createElement("button");
    btnFinished.innerHTML = "Finished";
    
    div.appendChild(btnRead);
    div.appendChild(btnInProgress);
    div.appendChild(btnFinished);
    
    button.addEventListener('click',function() {
        button.parentNode.appendChild(div);
        div.style.display = (div.style.display == "block")? "none":"block";
    });
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
    displayList(newBook);
    form.reset();
}

data.forEach((book) => {
    displayBook(book);
    displayList(book);
});

document.addEventListener("DOMContentLoaded", ()=> {
    document.querySelector("#addNewBook").addEventListener("click", addNewBook);
});
