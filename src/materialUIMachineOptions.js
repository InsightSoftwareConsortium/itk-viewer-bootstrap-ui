import mainUIMachineOptions from './Main/mainUIMachineOptions.js'
import layersUIMachineOptions from './Layers/layersUIMachineOptions.js'
import imagesUIMachineOptions from './Images/imagesUIMachineOptions.js'
import widgetsUIMachineOptions from './Widgets/widgetsUIMachineOptions.js'

import createInterface from './createInterface.jsx'

const materialUIMachineOptions = {
  main: mainUIMachineOptions,

  layers: layersUIMachineOptions,

  images: imagesUIMachineOptions,

  widgets: widgetsUIMachineOptions,

  actions: {
    createInterface,
  },
}

export default materialUIMachineOptions
