import React from 'react'
import ReactDOM from 'react-dom'
import './style.css'
import Panel from './Panel'
import MainInterface from './Main/MainInterface'
import LayersInterface from './Layers/LayersInterface'
import ImagesInterface from './Images/ImagesInterface'
import WidgetsInterface from './Widgets/WidgetsInterface'

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

  ReactDOM.render(
    <React.StrictMode>
      <Panel service={ context.service }>
        <MainInterface />
        <LayersInterface />
        <WidgetsInterface />
        <ImagesInterface />
      </Panel>
    </React.StrictMode>,
    context.uiContainer
  )
}

export default createInterface
