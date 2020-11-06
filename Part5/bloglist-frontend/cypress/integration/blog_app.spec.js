describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Matti Luukkainen logged-in')
      cy.contains('logout')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrongpassword')
      cy.get('#login-button').click()

      cy.get('.error').contains('wrong username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('Matti L.')
      cy.get('#url').type('www.mattilcypressblogs.com')
      cy.get('#create-button').click()

      cy.contains('a blog created by cypress')
      cy.contains('www.mattilcypressblogs.com')
      cy.get('.added').contains("a new blog 'a blog created by cypress' by Matti L. added")
      
      cy.contains('create new blog').click()
      cy.get('#title').type('second blog created')
      cy.get('#author').type('Matti L.')
      cy.get('#url').type('www.mattilcypressblogs.com')
      cy.get('#create-button').click()

      cy.contains('second blog created')
      cy.contains('www.mattilcypressblogs.com')
      cy.get('.added').contains("a new blog 'second blog created' by Matti L. added")
    })

    it('A blog can be liked', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('Matti L.')
      cy.get('#url').type('www.mattilcypressblogs.com')
      cy.get('#create-button').click()
      cy.contains('view').click()

      cy.get('#like-button').click()
      cy.get('#likes').contains(1)

      cy.get('#like-button').click()
      cy.get('#likes').contains(2)
    })

    it('A blog can be removed', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('Matti L.')
      cy.get('#url').type('www.mattilcypressblogs.com')
      cy.get('#create-button').click()
      cy.contains('view').click()

      cy.contains('a blog created by cypress')
      cy.get('#remove-button').click()
      cy.get('html').should('not.have.value', 'a blog created by cypress')
      
    })
  })
})
