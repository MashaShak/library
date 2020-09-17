const display = document.querySelector("#display");
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

//displayBooks();
displayListOfBooks();

function Book(title, author, pages, status){
    this.title = title
    this.author = author
    this.pages = pages 
    this.isRead = status
}


function addBookToLibrary() {
//add user input to library
}

//display all books, go through the array and show the book in the list from the end of the array
function displayBooks(){
    mylibrary.forEach(book => {
        let divBook = document.createElement("div"); 
        const btnDeleteBook = document.createElement("button");
        btnDeleteBook.innerHTML = "<img src='https://img.icons8.com/ios/30/000000/delete-forever.png'/>";
        display.appendChild(divBook);
        divBook.classList.add("book-grid");
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
        let tableBooks = document.querySelector("#tableBooks");
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



function addNewBook() {
    //make a form to enter the book, add it to mylibrary and display it
}


function isRead() {
//change book status read/unread
}

function deleteBook() {

}

