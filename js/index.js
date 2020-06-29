const booksURL = `http://localhost:3000/books`
const bookList = document.querySelector("#list")
const bookInfo = document.querySelector("#show-panel")

fetch(booksURL)
.then(r => r.json())
.then((books) => {
  books.forEach((book) => {
    renderBookList(book)
  })
})

function renderBookList(book) {
  let title = book.title
  let description = book.description 
  let cover = book.img_url
  let users = book.users

  let listItem = document.createElement("li")
  listItem.innerText = title
  bookList.append(listItem)

  listItem.addEventListener("click", (event) => {
    
  })
}