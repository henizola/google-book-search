import React, { useState } from "react";
import "./App.css";

function App() {
  const [book, setBook] = useState("");
  const [data, setData] = useState([]);
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${book}&key=AIzaSyCP2TmPqfgmUhwzoABCRaONpHRBoe9rCKQ&maxResults=40`
    )
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        } else if (response.status === 400) {
          throw Error("400");
        }
        return response.json();
      })
      .then(function (obj) {
        console.log(obj);
        setData(obj.items);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(event) => setBook(event.target.value)}
        ></input>
        <button type="submit">Search</button>
      </form>
      <div className="data">
        {data.map((book) => (
          <a
            target="_blank"
            href={book.volumeInfo.previewLink}
            rel="noopener noreferrer"
          >
            <img
              src={book.volumeInfo.imageLinks.smallThumbnail}
              alt="imageskjd"
            />
            <span>Author {book.volumeInfo.authors}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

export default App;
