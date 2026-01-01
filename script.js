function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("Use the 'new' operator to call the constructor.");
  }
  this.title = title;
  this.author = author;
  this.pages = " " + pages;
  if (read == "yes" || read == "read") {
    this.read = " read";
  } else {
    this.read = " not read yet";
  }
  this.info = function () {
    const finalStr =
      this.title +
      " by " +
      this.author +
      "," +
      this.pages +
      " pages" +
      "," +
      this.read;
    return finalStr;
  };
}

const Hobbit = new Book("Hoola", "me", 1, "yes");
console.log(Hobbit.info());
