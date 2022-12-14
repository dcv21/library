class Book {
    constructor(author, title, pages) {
        this._author = author;
        this._title = title;
        this._pages = pages;
        this._status = 0;
    }

    get author() {
        return this._author;
    }

    get title() {
        return this._title;
    }

    get pages() {
        return this._pages;
    }

    get status() {
        return this._status;
    }

    changeStatus() {
        this._status = this._status ^ 1;
    }
}

let myLibrary = [
    new Book(
        "foo",
        "bar",
        100
    )
];

function addBookToLibrary(form) {
    const book = new Book(
        form.elements["author"].value,
        form.elements["title"].value,
        form.elements["pages"].value
    );

    myLibrary.push(book);

    return book;
}

function renderBook(book) {
    let div = document.createElement("div");
    div.className = "book";
    div.innerHTML += `<header>Status: ${
        book.status ? "Completed" : "Reading"
    }</header>`;

    const info = document.createElement("main");
    info.innerHTML += `<div class="title">${book.title}</div>`;
    info.innerHTML += `<div class="author">by ${book.author}</div>`;
    info.innerHTML += `<div class="pages">${book.pages} pages</div>`;

    div.appendChild(info);

    const options = document.createElement("footer");

    const markReadBtn = document.createElement("button");
    markReadBtn.className = "mark_read";
    markReadBtn.type = "button";
    markReadBtn.innerHTML = "Mark As Read";
    markReadBtn.addEventListener("click", () => {
        book.changeStatus();
        div.querySelector("header").innerHTML = `Status: ${
            book.status ? "Completed" : "Reading"
        }`;
    });

    options.appendChild(markReadBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete";
    deleteBtn.type = "button";
    deleteBtn.innerHTML = "Delete";
    deleteBtn.addEventListener("click", () => {
        const index = myLibrary.indexOf(book);
        myLibrary.splice(index, 1);
        document.querySelector("main").removeChild(div);
    });

    options.appendChild(deleteBtn);

    div.appendChild(options);

    return div;
}

window.addEventListener("DOMContentLoaded", () => {
    const div = document.querySelector("main");
    div.innerHTML = "";
    for (let i = 0; i < myLibrary.length; i++) {
        div.appendChild(renderBook(myLibrary[i]));
    }

    const overlay = document.querySelector(".overlay");

    overlay.addEventListener("click", () => {
        document.querySelector(".modal").className = "modal";
        document.querySelector(".overlay").className = "overlay";
    });

    document.querySelector(".add_book").addEventListener("click", () => {
        document.querySelector(".modal").className = "modal active";
        overlay.className = "overlay active";
    });

    const form = document.querySelector("form");

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const book = addBookToLibrary(form);
        document.querySelector(".modal").className = "modal";
        document.querySelector(".overlay").className = "overlay";
        document.querySelector("form").reset();
        document.querySelector("main").appendChild(renderBook(book));
    });
});
