document.addEventListener("DOMContentLoaded", () => {

  let books = []
  //let users = []
  const bookList = document.querySelector('#list')
  const showBook = document.querySelector('#show-panel')
  const li = document.createElement('li')
  let userMykola = {'id':11, 'username':'Mykola'}

  function fetchBooks() {
    fetch('http://localhost:3000/books')
      .then(resp => resp.json())
      .then(data => {
        books = data
        renderBookNames(books)
      })
  }//fetch books ends

  function renderBookNames(books) {
    bookList.innerHTML = books.map(renderBookName).join('')
  }

  function renderBookName(book) {
    return `
      <li class='book-title'>${book.title}</li>
      `
  }

  // function fetchUsers() {
  //   fetch('http://localhost:3000/users')
  //     .then(resp => resp.json())
  //     .then(data => {
  //       users = data
  //     })
  // }//fetch users ends

  
  function renderBook(book) {
    return `
    <img src='${book.img_url}'>
    <h2><strong>${book.title}</strong></h2>
    <h3><strong>${book.subtitle}</strong></h3>
    <h4><strong>${book.author}</strong></h4>
    <p>${book.description}</p>
    <ul>
    ${renderUsers(book.users)}
    </ul>
    <button name='like-button' id='${book.id}'>LIKE</button>
    `
  }
  
  function renderUsers(bookUsers) {
    const newArray = bookUsers.map(user => {
      return `<li>${user.username}</li>`
    }).join('')
    
    return newArray
  }
  
  const likeButton = document.querySelector('#like-button')
  
  document.addEventListener('click', (e) => {
    if (e.target.className === 'book-title') {
      const foundBook = books.find(book => book.title === e.target.innerText)
      showBook.innerHTML = renderBook(foundBook)
    } else if (e.target.name === 'like-button') {
      const foundIdBook = books.find(book => book.id === parseInt(e.target.id))
      if(!foundIdBook.users.find(user => user.id === userMykola.id)) {
        foundIdBook.users.push(userMykola)
        updateLikes(foundIdBook)
        console.log(likeButton)
        
      }
      
      //console.log(foundIdBook.users.push(userMykola))
      //updateLikes(foundIdBook)
    }
  })//click event ends

  function updateLikes(bookToUpdate) {
    fetch(`http://localhost:3000/books/${bookToUpdate.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        users: bookToUpdate.users
      }),
    })
      .then(resp => resp.json())
      .then(data => {
        showBook.innerHTML = renderBook(data)})
  }//fetch patch ends

  //fetchUsers()
  fetchBooks()

});


// document.addEventListener('DOMContentLoaded', function () {
//   let books = [];
//   const showPanel = document.getElementById('show-panel');
//   const booksURL = 'http://localhost:3000/books';
//   const bookList = document.querySelector('#list');
//   // bookList.style.cursor = “pointer”;
//   function fetchBooks() {
//     fetch(booksURL)
//       .then((response) => response.json())
//       .then((bookData) => {
//         // console.log(bookData);
//         books = bookData;
//         // console.log(books);
//         renderBooks(books);
//       });
//   }
// function renderBooks(book) {
//     let liTag = document.createElement('li');
//     liTag.textContent = book.title;
//     liTag.style.cursor = 'pointer';
//     bookList.append(liTag);
//     liTag.addEventListener('click', () => {
//       showPanel.innerHTML = '';
//       let bookTitle = document.createElement('h1');
//       bookTitle.innerText = book.title;
//       let bookSubTitle = document.createElement('h2');
//       bookSubTitle.innerText = book.subtitle;
//       let bookDescription = document.createElement('p');
//       bookDescription.innerText = `Description: ${book.description}`;
//       let bookAuthor = document.createElement('p');
//       bookAuthor.innerText = book.author;
//       const bookImage = document.createElement('img');
//       bookImage.src = book.img_url;
//       const ul = document.createElement('ul');
//       book.users.forEach((user) => {
//         const li = document.createElement('li');
//         li.textContent = user.username;
//         ul.append(li);
//       });
//       let likeButton = document.createElement('button');
//       likeButton.innerText = 'Like';
//       showPanel.append(
//         bookImage,
//         bookTitle,
//         bookSubTitle,
//         bookAuthor,
//         bookDescription,
//         ul,
//         likeButton
//       );
//     });
//   }
// }