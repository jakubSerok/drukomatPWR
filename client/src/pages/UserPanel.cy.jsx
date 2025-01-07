import React from 'react'
import UserPanel from './UserPanel'

describe('<UserPanel />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<UserPanel />)
  })
})