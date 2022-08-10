import mainUIMachineOptions from './Main/mainUIMachineOptions.js'
import layersUIMachineOptions from './Layers/layersUIMachineOptions.js'
import imagesUIMachineOptions from './Images/imagesUIMachineOptions.js'
import widgetsUIMachineOptions from './Widgets/widgetsUIMachineOptions.js'

import toggleDarkMode from './toggleDarkMode'
import createInterface from './createInterface.jsx'
import toggleUICollapsed from './toggleUICollapsed.jsx'

import './App.scss'

const bootstrapUIMachineOptions = {
  main: mainUIMachineOptions,

  layers: layersUIMachineOptions,

  images: imagesUIMachineOptions,

  widgets: widgetsUIMachineOptions,

  actions: {
    toggleDarkMode,

    createInterface,

    toggleUICollapsed
  }
}

export default bootstrapUIMachineOptions
