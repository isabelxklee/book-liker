// document.addEventListener("DOMContentLoaded", function() {})

const booksURL = `http://localhost:3000/books`

fetch(booksURL)
.then(r => r.json())
.then(console.log)

function renderBookList() {
  
}