import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommend from './components/Recommend'
import { useApolloClient } from '@apollo/client'
import { ALL_BOOKS } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState('')
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  
  useEffect(() => {
    const token = localStorage.getItem('libraryapp-user-token')
    if ( token ) {
      setToken(token)
    }
  }, [])
  
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(p => p.title).includes(object.title)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })

    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }   
  }

  if (!token) {
    return (
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('login')}>login</button>
        </div>
  
        <Notify error={errorMessage}/>
  
        <Authors
          show={page === 'authors'}
          setErrorMessage={setErrorMessage}
        />
  
        <Books
          show={page === 'books'}
          updateCacheWith={updateCacheWith}
        />
  
        <Login
          show={page === 'login'}
          setErrorMessage={setErrorMessage}
          setToken={setToken}
        />
      </div>
    )
  } else {
    return (
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('add')}>add book</button>
          <button onClick={() => setPage('recommend')}>recommend</button>
          <button onClick={() => logout()}>logout</button>
        </div>
  
        <Notify error={errorMessage}/>
  
        <Authors
          show={page === 'authors'}
          setErrorMessage={setErrorMessage}
        />
  
        <Books
          show={page === 'books'}
          updateCacheWith={updateCacheWith}
        />
  
        <NewBook
          show={page === 'add'}
          setErrorMessage={setErrorMessage}
        />

        <Recommend
          show={page === 'recommend'}
          setErrorMessage={setErrorMessage}
        />
      </div>
    )
  }  
}

const Notify = ({ error }) => {
  if ( !error ) {
    return null
  }
  return (
    <div style={{color: 'red'}}>
      {error}
    </div>
  )
}

export default App