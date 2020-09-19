const addForm = document.querySelector("#add-book");
const display = document.querySelector("#display");
const tableBooks = document.querySelector("table");
let mylibrary = [];
/*    
const book1 = {
title: "War and Peace",
author: "Leo Tolstoy",
pages: 569,
status: "read",
}
const book2 = {
    title: "Little Prince",
    author: "Antoine de Saint-Exupéry",
    pages: 234,
    status: "not read",
}
const book3 = {
    title: "Little Prince",
    author: "Antoine de Saint-Exupéry",
    pages: 234,
    status: " not read",
}
const book4 = {
    title: "Little Prince",
    author: "Antoine de Saint-Exupéry",
    pages: 234,
    status: "read",
}
let mylibrary = [book1, book2, book3, book4];
*/




function showForm() {
    addForm.style.display = (addForm.style.display == "none") ? "block" : "none";
}

function Book(title, author, pages, status){
    this.title = title
    this.author = author
    this.pages = pages 
    this.isRead = status
}
/*display all books, go through the array and show the book in the list from the end of the array
function displayBooks(){
    mylibrary.forEach(book => {
        let divBook = document.createElement("div"); 
        const btnDeleteBook = document.createElement("button");
        btnDeleteBook.innerHTML = "<img src='https://img.icons8.com/ios/30/000000/delete-forever.png'/>";
        display.appendChild(divBook);
        divBook.classList.add("card");
        for (let key in book) {
            let divKey = document.createElement("div");
            divKey.textContent = book[key];
            divBook.appendChild(divKey);
        }
        divBook.appendChild(btnDeleteBook);
        })
}
function displayListOfBooks() {
    mylibrary.forEach(book => { 
        
        let trBook = document.createElement("tr");
        tableBooks.appendChild(trBook);
        const btnDeleteBook = document.createElement("button");
        btnDeleteBook.innerHTML = "<img src='https://img.icons8.com/ios/30/000000/delete-forever.png'/>";
        for (let key in book) {
            const tdBook = document.createElement("td");
            tdBook.textContent = book[key];
            trBook.appendChild(tdBook);
        }
        trBook.appendChild(btnDeleteBook);
        
        })
}
*/

function displayBook(book) {
    let divBook = document.createElement("div"); 
    divBook.classList.add("card");
    const btnDeleteBook = document.createElement("button");
    btnDeleteBook.innerHTML = "<img src='https://img.icons8.com/ios/30/000000/delete-forever.png'/>";
    display.appendChild(divBook);
    for (let key in book) {
            let divKey = document.createElement("div");
            divKey.textContent = book[key];
            divBook.appendChild(divKey);
        }
    divBook.appendChild(btnDeleteBook);
}

function displayListOfBooks(book) {
    let trBook = document.createElement("tr");
    tableBooks.appendChild(trBook);        
    const btnDeleteBook = document.createElement("button");
    btnDeleteBook.innerHTML = "<img src='https://img.icons8.com/ios/30/000000/delete-forever.png'/>";
    for (let key in book) {
        const tdBook = document.createElement("td");
        tdBook.textContent = book[key];
        trBook.appendChild(tdBook);
    }
    trBook.appendChild(btnDeleteBook);
}


const addNewBook = (e) => {
    e.preventDefault(); //prevent form from submitting
    
    let newBook = new Book(
        document.querySelector("#title").value,
        document.querySelector("#author").value,
        document.querySelector("#pages").value,
        document.querySelector("#status").value
    );
    mylibrary.push(newBook);
    console.log(mylibrary);
    addForm.reset();
    displayBook(newBook);
    displayListOfBooks(newBook);
    
    //local storage
    localStorage.setItem("MyLibrary", JSON.stringify(mylibrary));
}

document.addEventListener("DOMContentLoaded", ()=> {
    document.querySelector("#addNewBook").addEventListener("click", addNewBook);
});


