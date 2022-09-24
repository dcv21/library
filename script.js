let myLibrary = [
    {
        title: "foo",
        author: "bar",
        pages: 100,
        status: 0,
    },
];

function Book(author, title, pages, status) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.status = 0;
}

function addBookToLibrary(form) {
    myLibrary.push(
        new Book(
            form.elements["author"].value,
            form.elements["title"].value,
            form.elements["pages"].value
        )
    );
}

window.addEventListener("DOMContentLoaded", () => {
    function refreshContent() {
        const content = document.querySelector(".content");

        content.innerHTML = "";

        myLibrary.forEach((book) => {
            content.innerHTML += `<div class="book"><div>Status: ${
                book.status === 0 ? "Reading" : "Completed"
            }</div><div class="info"><div class="title">${
                book.title
            }</div><div class="author">by ${
                book.author
            }</div><div class="pages">${
                book.pages
            } pages</div></div><div class="options"><button class="mark_read">Mark As Read</button><button class="delete">Delete</button></div></div>`;
        });

        const markReadBtn = content.querySelectorAll(".mark_read");
        for (const element of markReadBtn) {
            element.addEventListener("click", (event) => {
                const targetElement = event.target;
                const parentElement = targetElement.parentElement.parentElement;
                const title = parentElement.querySelector(".title").innerHTML;
                for (let i = 0; i < myLibrary.length; i++) {
                    if (myLibrary[i].title === title) {
                        myLibrary[i].status = myLibrary[i].status ^ 1;
                        if (myLibrary[i].status === 0) {
                            parentElement.querySelector(
                                "div:first-of-type"
                            ).innerHTML = "Status: Reading";
                        } else {
                            myLibrary[i].status = 1;
                            parentElement.querySelector(
                                "div:first-of-type"
                            ).innerHTML = "Status: Completed";
                        }
                    }
                }
            });
        }

        const deleteBtn = content.querySelectorAll(".delete");
        for (const element of deleteBtn) {
            element.addEventListener("click", (event) => {
                const targetElement = event.target;

                const title =
                    targetElement.parentElement.parentElement.querySelector(
                        ".title"
                    ).innerHTML;

                for (let i = 0; i < myLibrary.length; i++) {
                    if (myLibrary[i].title === title) {
                        myLibrary.splice(i, 1);
                        break;
                    }
                }

                refreshContent();
            });
        }
    }

    refreshContent();

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
        addBookToLibrary(form);
        document.querySelector(".modal").className = "modal";
        document.querySelector(".overlay").className = "overlay";
        document.querySelector("form").reset();
        refreshContent();
    });
});
