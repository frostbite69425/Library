// SELECTORS

const container = document.querySelector("div.container");
const cardDisplay = document.querySelector("div.card-display");
const newBook = document.querySelector(".new-book-btn > button");

// MAIN LOGIC

// logger function

function log(x) {
  console.log(x);
}

// MAIN LIBRARY ARRAY FOR STORING THE BOOK OBJECTS.

const myLibrary = [];

// BOOK OBJECT CONSTRUCTOR

function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("Use the 'new' operator to call the constructor.");
  }
  this.bookUid = Book.prototype.uidGen();
  this.title = title;
  this.author = author;
  this.pages = pages;
  if (read == "yes" || read == "read") {
    this.read = " read";
  } else {
    this.read = " not read yet";
  }
}

Book.prototype = {
  uidGen() {
    return crypto.randomUUID();
  },
};

// FUNCTION FOR CREATING BOOKS

function addBookToLibrary(title, author, pages, readingStatus) {
  let book = new Book(title, author, pages, readingStatus);
  myLibrary.push(book);
  // log(myLibrary);
  displayBooks();
}

addBookToLibrary("Hoola", "me", 1, "yes");
addBookToLibrary("Hoola2", "not me", 1, "yes");
addBookToLibrary("Hoola3 the sequel", "me", 100, "no");

// FUNCTION FOR DISPLAYING THE BOOKS ON THE PAGE

function displayBooks() {
  while (cardDisplay.firstChild) {
    cardDisplay.removeChild(cardDisplay.lastChild);
  }
  for (books of myLibrary) {
    // NODES
    let completeBook = document.createElement("div");
    let displayTitle = document.createElement("div");
    let displayAuthor = document.createElement("div");
    let displayPages = document.createElement("div");
    let displayReadingStatus = document.createElement("div");
    let deleteBtn = document.createElement("button");

    cardDisplay.appendChild(completeBook);
    completeBook.appendChild(displayTitle);
    completeBook.appendChild(displayAuthor);
    completeBook.appendChild(displayPages);
    completeBook.appendChild(displayReadingStatus);
    completeBook.appendChild(deleteBtn);

    displayTitle.textContent = books.title;
    displayAuthor.textContent = books.author;
    displayPages.textContent = books.pages;
    displayReadingStatus.textContent = books.read;
    deleteBtn.textContent = "Delete this book from the library";
    completeBook.dataset.UUID = books.bookUid;
    deleteBtn.className = "delete-btn";
  }
}

const deleteBtnList = document.querySelectorAll(".delete-btn");

// FUNCTION FOR ADDING NEW BOOKS USING THE BUTTON

newBook.addEventListener("click", (e) => {
  e.preventDefault();
  addBookToLibrary("Hoola2", "not me", 1, "yes");
});

// FUNCTION FOR DELETING BOOKS USING THE BUTTON

deleteBtnList.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    i = 0;
    const uid = e.target.parentNode.dataset.UUID;
    for (books of myLibrary) {
      if (books.bookUid == uid) {
        myLibrary.splice(i, 1);
        displayBooks();
        const deleteBtnList = document.querySelectorAll(".delete-btn");
      } else {
        i++;
      }
    }
  });
});
