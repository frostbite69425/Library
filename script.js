// SELECTORS

const container = document.querySelector("div.container");
const cardDisplay = document.querySelector("div.card-display");
const newBookBtn = document.querySelector(".new-book-btn > button");

const modal = document.querySelector("dialog.modal");
const form = document.querySelector("#book-form");
const modalConfirmBtn = document.querySelector("button#modalConfirmBtn");
const modalCancelBtn = document.querySelector("button#modalCancelBtn");
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
    this.read = "not read yet";
  }
}

Book.prototype = {
  uidGen() {
    return crypto.randomUUID();
  },

  readBook(uid) {
    for (books of myLibrary) {
      if (books.bookUid == uid) {
        books.read = books.read === "read" ? "not read yet" : "read";
        displayBooks();
      }
    }
  },

  delBook(uid) {
    i = 0;
    for (books of myLibrary) {
      if (books.bookUid == uid) {
        myLibrary.splice(i, 1);
        displayBooks();
      } else {
        i++;
      }
    }
  },
};

// FUNCTION FOR CREATING BOOKS

function addBookToLibrary(title, author, pages, readingStatus, info) {
  let book = new Book(title, author, pages, readingStatus, info);
  myLibrary.push(book);
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

  delFunction(deleteBtnList);
  toggleFunction(toggleBtnList);
}

// FUNCTION FOR TOGGLING READ STATUS

function toggleFunction(toggleBtnList) {
  toggleBtnList.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const uid = e.target.parentNode.dataset.UUID;
      books.readBook(uid);
      // HERE books POINTS TO THE LAST OBJECT IN THE ARRAY. I DON'T KNOW HOW TO FIX THAT YET BUT THE LOGIC WORKS AS INTENDED.
    });
  });
}

// FUNCTION FOR DELETING BOOKS USING THE BUTTON

function delFunction(deleteBtnList) {
  deleteBtnList.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const uid = e.target.parentNode.dataset.UUID;
      books.delBook(uid);
      // SAME THING HERE. IT POINTS TO THE LAST CREATED OBJECT BUT THE INTERNAL LOGIC WORKS CORRECTLY
    });
  });
}

// FUNCTION FOR ADDING NEW BOOKS USING THE BUTTON

newBookBtn.addEventListener("click", (e) => {
  e.preventDefault();
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
  ];

  for (entry of validityCheck) {
    if (entry == "default" || entry == "") {
      modal.close();
      form.reset();
      return;
    }
  }
  addBookToLibrary(
    modalTitle.value,
    modalAuthor.value,
    modalPages.value,
    modalReading.value,
    modalNotes.value
  );
  form.reset();
  modal.close();
  return;
});

modalCancelBtn.addEventListener("click", () => {
  form.reset();
});

addBookToLibrary("Hoola", "me", 1, "yes", "i");
addBookToLibrary("Hoola2", "not me", 1, "yes", "i");
addBookToLibrary("Hoola3 the sequel", "me", 100, "no", "i");
