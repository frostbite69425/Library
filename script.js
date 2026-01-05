// SELECTORS

const cardDisplay = document.querySelector("div.card-display");
const newBookBtn = document.querySelector(".new-book-btn > button");
const themeBtn = document.querySelector("button.theme");

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
    let toggleReadBtn = document.createElement("input");
    // BUG ?
    let readStsContainer = document.createElement("div");

    toggleReadBtn.setAttribute("type", "checkbox");

    cardDisplay.appendChild(completeBook);
    completeBook.appendChild(displayTitle);
    completeBook.appendChild(displayAuthor);
    completeBook.appendChild(displayPages);
    completeBook.appendChild(readStsContainer);
    readStsContainer.appendChild(toggleReadBtn);
    readStsContainer.appendChild(displayReadingStatus);
    completeBook.appendChild(displayInfo);
    completeBook.appendChild(deleteBtn);

    displayTitle.textContent = `Title: ${books.title}`;
    displayAuthor.textContent = `Author: ${books.author}`;
    displayPages.textContent = `Number of pages: ${books.pages}`;
    displayReadingStatus.textContent = books.read;
    displayInfo.textContent = `Note: ${books.info}`;

    if (document.body.classList.contains("light")) {
      deleteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffffff"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg> Delete`;
    } else {
      deleteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg> Delete`;
    }

    completeBook.dataset.UUID = books.bookUid;
    deleteBtn.className = "delete-btn";
    if (books.read == "read") {
      toggleReadBtn.checked = true;
    } else {
      toggleReadBtn.checked = false;
    }
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
      const uid = e.target.parentNode.parentNode.dataset.UUID;
      books.readBook(uid);
      // HERE books POINTS TO THE LAST OBJECT IN THE ARRAY. I DON'T KNOW HOW TO FIX THAT YET BUT THE LOGIC WORKS AS INTENDED.
    });
    btn.focus({ preventScroll: true });
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

// THEME SWITCHING FUNCTION

themeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  document.body.classList.toggle("light");
  themeBtn.classList.toggle("light");

  if (themeBtn.classList.contains("light")) {
    themeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z"/></svg>`;
    displayBooks();
  } else {
    themeBtn.innerHTML = `<svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#ffffff"
          >
            <path
              d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z"
            />`;
    displayBooks();
  }
});

addBookToLibrary(
  "The Hobbit",
  "J. R. R. Tolkein",
  596,
  "yes",
  "It's a comfort read for me"
);
addBookToLibrary(
  "Harry Potter and The Philosopher's Stone",
  "J K Rowling",
  378,
  "yes",
  "Childhood Favourite."
);
addBookToLibrary(
  "Sapiens",
  "Yuval Noah Harari",
  589,
  "no",
  "Love the pacing of this book."
);
