
import Rails from "@rails/ujs"
import * as ActiveStorage from "@rails/activestorage"
import React from 'react'
import ReactDOM from 'react-dom'
import App from './app/App';
import "channels"

Rails.start()
ActiveStorage.start()

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.body.appendChild(document.createElement('div')),
  )
})