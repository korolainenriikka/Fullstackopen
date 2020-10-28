import { gql } from '@apollo/client'

const BOOK_DETAILS = gql`
  fragment bookDetails on Book {
    title,
    author {name},
    published,
    genres
  }
`

export const ALL_PERSONS = gql`
  query {
    allAuthors {
      name,
      born,
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      ...bookDetails
    }
  }
  ${BOOK_DETAILS}
  
`

export const ADD_BOOK = gql`
  mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!){
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ){
      title,
    }
  }
`

export const EDIT_BIRTHYEAR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name,  setBornTo: $setBornTo){
      name,
      born
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const ME = gql`
  query {
    me {
      username,
      favoriteGenre
    }
  }
`

export const GET_BOOKS_OF_GENRE = gql`
  query allBooks($genre: String!) {
    allBooks(genre: $genre) {
      ...bookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...bookDetails
    }
  }
  ${BOOK_DETAILS}
`