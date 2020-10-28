import { useQuery, useSubscription } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { ALL_BOOKS, BOOK_ADDED } from '../queries'
import BookTable from './BookTable'

const Books = (props) => {
  const [books, setBooks] = useState([])
  const [genres, setGenres] = useState([])

  const [genreToShow, setGenreToShow] = useState(null)
  const [booksToShow, setBooksToShow] = useState([])

  const result = useQuery(ALL_BOOKS)

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`${addedBook.title} added!`)
      props.updateCacheWith(addedBook)
    }
  })

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
      setBooksToShow(result.data.allBooks)
      const allGenres = result.data.allBooks.reduce((genres, book) => {
        return genres.concat(book.genres)
      },[])
      const uniqueSet = new Set(allGenres)
      setGenres([...uniqueSet])    
    }
  },[result.data,books])

  useEffect(() => {
    if (genreToShow !== null) {
      setBooksToShow(books.filter(b => b.genres.find(g => g === genreToShow)))
    }
  }, [genreToShow, books])

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
      <p>In genre <b>{genreToShow}</b></p>
      <BookTable booksToList={booksToShow}/>
      <div>
        {genres.map( g => <button key={genres.indexOf(g)} onClick = {() => setGenreToShow(g)}>
          {g}
        </button>)}
      </div>
    </div>
  )
}

export default Books