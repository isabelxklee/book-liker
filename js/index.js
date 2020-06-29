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
  let listItem = document.createElement("li")
  listItem.innerText = book.title
  bookList.append(listItem)

  listItem.addEventListener("click", (event) => {
    bookInfo.innerHTML = ""
    showBookInfo(book, event)
  })
}

function showBookInfo(book, event) {
  let title = document.createElement("h2")
  title.innerText = book.title

  let cover = document.createElement("img")
  cover.src = book.img_url

  let description = document.createElement("p")
  description.innerText = book.description

  let userList = document.createElement("ul")

  book.users.forEach((user) => {
    let userListItem = document.createElement("li")
    userListItem.innerText = user.username
    userList.append(userListItem)
  })

  bookInfo.append(title, cover, description, userList)
}