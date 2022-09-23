import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './style.css'

function createInterface(context) {
  context.viewContainers = new Map()
  const viewContainer = document.createElement('div')
  viewContainer.setAttribute('class', 'viewContainer')
  context.viewContainers.set('volume', viewContainer)
  viewContainer.appendChild(context.renderingViewContainers.get('volume'))
  context.rootContainer.appendChild(viewContainer)

  if (!context.uiContainer) {
    const uiContainer = document.createElement('div')
    uiContainer.setAttribute('class', 'uiContainer')
    context.uiContainer = uiContainer
  }

  context.rootContainer.appendChild(context.uiContainer)
  if (!context.uiGroups) {
    // String to UI group element map
    context.uiGroups = new Map()
  }

  ReactDOM.render(<App service={context.service} />, context.uiContainer)
}

export default createInterface
