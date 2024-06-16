const myLibrary = [];
const libraryContainer = document.querySelector(".container");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  this.toggleRead = () => {
    this.read = !this.read;
  };
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  updateLibraryDisplay();
}

function removeBookFromLibrary(index) {
  myLibrary.splice(index, 1);
  updateLibraryDisplay();
}

function updateLibraryDisplay() {
  libraryContainer.innerHTML = "";
  myLibrary.forEach((element, index) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.setAttribute("data-index", index);
    bookCard.innerHTML = `
      <h2>${element.title}</h2>
      <p>Author: ${element.author}</p>
      <p>Pages: ${element.pages}</p>
      <p>Read: ${element.read ? "Yes" : "No"}</p>
      <button class="toggle-read">${element.read ? "Not read" : "Read"}</button>
      <button class="delete-book">Delete</button>
      `;
    libraryContainer.appendChild(bookCard);
  });
}

libraryContainer.addEventListener("click", (event) => {
  const clickedElement = event.target;
  if (clickedElement.classList.contains("delete-book")) {
    const index = clickedElement
      .closest(".book-card")
      .getAttribute("data-index");
    removeBookFromLibrary(index);
  }
  if (clickedElement.classList.contains("toggle-read")) {
    const index = clickedElement
      .closest(".book-card")
      .getAttribute("data-index");
    toggleRead(index);
  }
});

function toggleRead(index) {
  myLibrary[index].toggleRead();
  updateLibraryDisplay();
}

const dialog = document.getElementById("book-info-dialog");

document.getElementById("open-dialog").addEventListener("click", (event) => {
  event.preventDefault();
  dialog.showModal();
});

document.getElementById("close-dialog").addEventListener("click", (event) => {
  event.preventDefault();
  dialog.close();
});

const form = dialog.querySelector("form");
const formSummitButton = form.querySelector("#submit");

formSummitButton.addEventListener("click", (event) => {
  event.preventDefault();
  const titleInput = form.querySelector("#book-title");
  const authorInput = form.querySelector("#author");
  const pagesInput = form.querySelector("#pages");
  const readStatus = form.querySelector("#read-status");
  const book = new Book(
    titleInput.value,
    authorInput.value,
    parseInt(pagesInput.value),
    readStatus.value === "read"
  );
  titleInput.value = authorInput.value = pagesInput.value = "";
  addBookToLibrary(book);
  dialog.close();
});
