import React, { useState, useEffect } from 'react'
import BookTable from './BookTable'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ME, GET_BOOKS_OF_GENRE } from '../queries'

const Recommend = (props) => {
  const [booksOfGenre, setBooksOfGenre] = useState([])

  const [getBooksOfGenre, resultBooks] = useLazyQuery(GET_BOOKS_OF_GENRE)
  const resultMe = useQuery(ME)

  useEffect(() => {
    if (resultMe.data && resultMe.data.me) {
      const fave = resultMe.data.me.favoriteGenre
      getBooksOfGenre({ variables: { genre: fave } })
    }
  },[resultMe.data, getBooksOfGenre])

  useEffect(() => {
    if (resultBooks.data) {
      setBooksOfGenre(resultBooks.data.allBooks)
    }
  }, [resultBooks.data, getBooksOfGenre])

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h1>recommendations</h1>
      <p>books in your favorite genre </p>
      <BookTable booksToList={booksOfGenre} />
    </div>
  )
}

export default Recommend