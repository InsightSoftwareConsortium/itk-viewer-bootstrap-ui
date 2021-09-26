import React from 'react'
import ReactDOM from 'react-dom'
import './style.css'
import Panel from './Panel'

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

  ReactDOM.render(
    <React.StrictMode>
      <Panel service={ context.service } />
    </React.StrictMode>,
    context.uiContainer
  )
}

export default createInterface
