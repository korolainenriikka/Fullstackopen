describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
    cy.createUser({ name: 'test', username: 'testusername', password: 'testpassword'})
  })

  it('Login from is shown', function() {
    cy.contains('log in').click()
    cy.contains('log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('testusername')
      cy.get('#password').type('testpassword')
      cy.get('#login-button').click()
      cy.contains('test logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('skrrt')
      cy.get('#password').type('dabdab')
      cy.get('#login-button').click()
      cy.contains('wrong username or password :(')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'testusername', password: 'testpassword' })
    })

    it('A blog can be created', function() {
      cy.contains('new note').click()
      cy.get('#title').type('test blog')
      cy.get('#author').type('test author')
      cy.get('#url').type('www.test.com')
      cy.get('#create-button').click()
      cy.contains('test blog test author')
    })

    describe.only('With three blogs created', function() {
      beforeEach(function() {
        cy.createBlog({ 
          title: 'first blog', 
          author: 'testboss', 
          url: 'www.test.net' 
        })
        cy.createBlog({ 
          title: 'second blog', 
          author: 'testboss', 
          url: 'www.test.net' 
        })
        cy.createBlog({ 
          title: 'third blog', 
          author: 'testboss', 
          url: 'www.test.net' 
        })
      })

      it('a like can be added', function(){
        cy.contains('third').as('thirdBlog').contains('view').click()
        cy.get('@thirdBlog').parent().contains('like').click()
        cy.get('@thirdBlog').parent().contains('likes 1')
      })

      it('a blog can be deleted', function(){
        cy.contains('third').as('thirdBlog').contains('view').click()
        cy.get('@thirdBlog').parent().contains('remove').click()
        cy.get('@thirdBlog').should('not.exist')
      })

      it.only('blogs organized by like count', function(){
        cy.contains('second').as('secondBlog').contains('view').click()
        cy.get('@secondBlog').parent().contains('like').click()
        cy.get('@secondBlog').parent().contains('hide').click()
        cy.contains('view').parent().contains('second')

        cy.contains('third').as('thirdBlog').contains('view').click()
        cy.get('@thirdBlog').parent().contains('like').click()
        cy.get('@thirdBlog').parent().contains('like').click()
        cy.get('@thirdBlog').parent().contains('hide').click()
        cy.contains('view').parent().contains('third')
      })
    })
  })

})