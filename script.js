// SELECTORS

const container = document.querySelector("div.container");
const cardDisplay = document.querySelector("div.card-display");
const newBookBtn = document.querySelector(".new-book-btn > button");

const modal = document.querySelector("dialog.modal");
const modalConfirmBtn = document.querySelector("button#modalConfirmBtn");
const modalTitle = document.querySelector("#book-title");
const modalAuthor = document.querySelector("#book-author");
const modalPages = document.querySelector("#book-pages");
const modalReading = document.querySelector("#book-reading-status");
const modalNotes = document.querySelector("#book-notes");

// MAIN LOGIC

// logger function

function log(x) {
  console.log(x);
}

// MAIN LIBRARY ARRAY FOR STORING THE BOOK OBJECTS.

const myLibrary = [];

// BOOK OBJECT CONSTRUCTOR

function Book(title, author, pages, read, info) {
  if (!new.target) {
    throw Error("Use the 'new' operator to call the constructor.");
  }
  this.info = info;
  this.bookUid = Book.prototype.uidGen();
  this.title = title;
  this.author = author;
  this.pages = pages;
  if (read == "yes" || read == "read") {
    this.read = "read";
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

function addBookToLibrary(title, author, pages, readingStatus, info) {
  let book = new Book(title, author, pages, readingStatus, info);
  myLibrary.push(book);
  // log(myLibrary);
  displayBooks();
}

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
    let displayInfo = document.createElement("div");
    let deleteBtn = document.createElement("button");
    let toggleReadBtn = document.createElement("button");

    cardDisplay.appendChild(completeBook);
    completeBook.appendChild(displayTitle);
    completeBook.appendChild(displayAuthor);
    completeBook.appendChild(displayPages);
    completeBook.appendChild(displayReadingStatus);
    completeBook.appendChild(displayInfo);
    completeBook.appendChild(deleteBtn);
    completeBook.appendChild(toggleReadBtn);

    displayTitle.textContent = books.title;
    displayAuthor.textContent = books.author;
    displayPages.textContent = books.pages;
    displayReadingStatus.textContent = books.read;
    displayInfo.textContent = books.info;
    deleteBtn.textContent = "Delete this book from the library";
    completeBook.dataset.UUID = books.bookUid;
    deleteBtn.className = "delete-btn";
    toggleReadBtn.textContent = "✅";
    toggleReadBtn.className = "toggle-read-btn";
  }

  const deleteBtnList = document.querySelectorAll(".delete-btn");
  const toggleBtnList = document.querySelectorAll(".toggle-read-btn");

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
        } else {
          i++;
        }
      }
    });
  });

  // FUNCTION FOR TOGGLING READ STATUS

  toggleBtnList.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      i = 0;
      const uid = e.target.parentNode.dataset.UUID;
      for (books of myLibrary) {
        if (books.bookUid == uid) {
          books.read = books.read === "read" ? "not read yet" : "read";
          displayBooks();
        } else {
          i++;
        }
      }
    });
  });
}

// FUNCTION FOR ADDING NEW BOOKS USING THE BUTTON

newBookBtn.addEventListener("click", (e) => {
  e.preventDefault();
  // addBookToLibrary("Hoola2", "not me", 1, "yes", "i");
  modal.showModal();
});

// MODAL LOGIC

modalConfirmBtn.addEventListener("click", (e) => {
  e.preventDefault();
  validityCheck = [
    modalTitle.value,
    modalAuthor.value,
    modalPages.value,
    modalReading.value,
    modalNotes.value,
  ];

  for (entry of validityCheck) {
    if (entry == "default" || entry == "") {
      modal.close();
      return;
    } else {
      addBookToLibrary(
        modalTitle.value,
        modalAuthor.value,
        modalPages.value,
        modalReading.value,
        modalNotes.value
      );

      modal.close();
      return;
    }
  }
});

addBookToLibrary("Hoola", "me", 1, "yes", "i");
addBookToLibrary("Hoola2", "not me", 1, "yes", "i");
addBookToLibrary("Hoola3 the sequel", "me", 100, "no", "i");
