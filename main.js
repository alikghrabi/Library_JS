const myLibrary = [];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

// Add a method to the Book prototype to toggle the read status
Book.prototype.toggleReadStatus = function () {
  this.isRead = !this.isRead;
};

function addBookToLibrary(title, author, pages, isRead) {
  const newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook);
  displayBooks();
}

function displayBooks() {
  const bookContainer = document.getElementById('bookContainer');
  bookContainer.innerHTML = ''; // Clear existing books

  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    bookCard.innerHTML = `
      <h2>${book.title}</h2>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p><strong>Read:</strong> ${book.isRead ? 'Yes' : 'No'}</p>
      <button data-index="${index}" class="remove-button">Remove</button>
      <button data-index="${index}" class="toggle-read-button">Toggle Read Status</button>
    `;
    bookContainer.appendChild(bookCard);
  });

  // Attach event listeners to buttons
  document.querySelectorAll('.remove-button').forEach((button) => {
    button.addEventListener('click', (e) => {
      removeBook(e.target.dataset.index);
    });
  });

  document.querySelectorAll('.toggle-read-button').forEach((button) => {
    button.addEventListener('click', (e) => {
      toggleReadStatus(e.target.dataset.index);
    });
  });
}

function removeBook(index) {
  myLibrary.splice(index, 1);
  displayBooks();
}

function toggleReadStatus(index) {
  myLibrary[index].toggleReadStatus();
  displayBooks();
}

// Show the "Add New Book" form when the button is clicked
document.getElementById('newBookButton').addEventListener('click', function () {
  document.getElementById('newBookForm').style.display = 'block';
});

// Close the form when the "Cancel" button is clicked
document.getElementById('closeFormButton').addEventListener('click', function () {
  document.getElementById('newBookForm').style.display = 'none';
});

// Handle form submission and prevent default form behavior
document.getElementById('bookForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form from submitting to a server

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const isRead = document.getElementById('isRead').checked;

  addBookToLibrary(title, author, pages, isRead);

  // Clear form inputs and hide the form
  document.getElementById('bookForm').reset();
  document.getElementById('newBookForm').style.display = 'none';
});

// Initial test books (optional)
addBookToLibrary("1984", "George Orwell", 328, true);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, false);
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, true);

displayBooks();
