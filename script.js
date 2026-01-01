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
  this.bookUid = crypto.randomUUID();
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
  info() {
    const finalStr =
      this.title +
      " by " +
      this.author +
      "," +
      this.pages +
      " pages" +
      "," +
      this.read +
      ", " +
      this.bookUid;
    return finalStr;
  },
};

// FUNCTION FOR CREATING BOOKS

function bookCreator(title, author, pages, readingStatus) {
  let book = new Book(title, author, pages, readingStatus);
  log(book.info());
  myLibrary.push(book);
  log(myLibrary);
}

bookCreator("Hoola", "me", 1, "yes");
bookCreator("Hoola2", "not me", 1, "yes");

// const Hobbit = new Book("Hoola", "me", 1, "yes");
// console.log(Hobbit.info());
