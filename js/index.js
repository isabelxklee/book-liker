const booksURL = `http://localhost:3000/books`
const usersURL = `http://localhost:3000/users`
const bookList = document.querySelector("#list")
const bookInfo = document.querySelector("#show-panel")
let usersArr = []

fetch(booksURL)
.then(r => r.json())
.then((books) => {
  books.forEach((book) => {
    renderBookList(book)
  })
})

fetch(usersURL)
.then(r => r.json())
.then((users) => {
  usersArr = users
})

function renderBookList(book) {
  let listItem = document.createElement("li")
  listItem.innerText = book.title
  bookList.append(listItem)

  listItem.addEventListener("click", () => {
    bookInfo.innerHTML = ""
    showBookInfo(book)
  })
}

function showBookInfo(book) {
  let title = document.createElement("h2")
  title.innerText = book.title

  let cover = document.createElement("img")
  cover.src = book.img_url

  let description = document.createElement("p")
  description.innerText = book.description

  let userListTitle = document.createElement("h3")
  userListTitle.innerText = "Likes"

  let userList = document.createElement("ul")
  userList.id = "user-list"

  let likeButton = document.createElement("button")
  likeButton.innerText = "<3 Like"
  likeButton.id = "like-button"

  book.users.forEach((user) => {
    let userListItem = document.createElement("li")
    userListItem.innerText = user.username
    userListItem.id = user.username
    userList.append(userListItem)
  })

  bookInfo.append(title, cover, description, userListTitle, userList, likeButton)

  likeBook(book)
}

function likeBook(book) {
  let likeButton = document.querySelector("#like-button")
  let newUser = usersArr[0]
  let updatedList = [...book.users, newUser]

  likeButton.addEventListener("click", () => {
    let existingUser = false 

    book.users.forEach((user) => {
      user.id === 1 ? existingUser = true : null
    })
    
    if (existingUser === false) {
      fetch(`http://localhost:3000/books/${book.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          users: updatedList
        })
      })
      .then(r => r.json())
      .then((updatedBook) => {
        console.log(updatedBook)
        addUser(newUser)
      })
    } else {
      fetch(`http://localhost:3000/books/${book.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          users: book.users.pop()
        })
      })
      .then(r => r.json())
      .then((updatedBook) => {
        console.log(updatedBook)
        removeUser(newUser)
      })
    }
  })
}

function addUser(newUser) {
  let userListItem = document.createElement("li")
  userListItem.innerText = newUser.username
  userListItem.id = newUser.username

  let userList = document.querySelector("#user-list")
  userList.append(userListItem)
}

function removeUser(newUser) {
  let userList = document.querySelector("#user-list")
  let removedUser = document.querySelector(`li#${newUser.username}`)
  userList.removeChild(removedUser)
}