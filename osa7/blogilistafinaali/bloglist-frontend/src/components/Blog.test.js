import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import { prettyDOM } from '@testing-library/dom'

describe('<Blog />', () => {
  let component

  const blog = {
    title: 'We testin here',
    author: 'Test bro',
    url: 'test.net'
  }

  const mockLiker = jest.fn()
  const mockDeleter = jest.fn()

  beforeEach(() => {
    component = render(
      <Blog
        blog={blog}
        addLike={mockLiker}
        deleteBlog={mockDeleter}
      />
    )
  })

  test('initially shows title and author but no url or likes', () => {
    const div = component.container.querySelector('.details')
    expect(component.container).toHaveTextContent('We testin here')
    expect(component.container).toHaveTextContent('Test bro')
    expect(div).toHaveStyle('display:none')
  })

  test('all attributes show when button clicked', () => {
    const button = component.container.querySelector('button')
    fireEvent.click(button)
    const div = component.container.querySelector('.details')
    expect(div).not.toHaveStyle('display:none')
  })

  test('add like event handler called twice when like button pressed twice', () => {
    const showButton = component.container.querySelector('button')
    fireEvent.click(showButton)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockLiker.mock.calls).toHaveLength(2)
  })
})

describe('<BlogForm />', () => {

  test('submit handler called with right props when blog created', () => {
    const createBlog = jest.fn()

    const component = render(
      <BlogForm createBlog={createBlog}/>
    )

    const title = component.container.querySelector('input')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')

    console.log(prettyDOM(title))

    const form = component.container.querySelector('form')

    fireEvent.change(title, {
      target: { value: 'a new blog created in test' }
    })

    fireEvent.change(author, {
      target: { value: 'the test creator' }
    })

    fireEvent.change(url, {
      target: { value: 'testman.net' }
    })

    fireEvent.submit(form)

    expect(createBlog.mock.calls[0][0].title).toBe('a new blog created in test')
    expect(createBlog.mock.calls[0][0].author).toBe('the test creator')
    expect(createBlog.mock.calls[0][0].url).toBe('testman.net')
  })
})
