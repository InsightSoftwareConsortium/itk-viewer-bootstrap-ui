import LayerInterface from './LayerInterface'
import LayersInterface from './LayersInterface'
import selectLayer from './selectLayer'

const layersUIMachineOptions = {
  layerUIActor: {
    LayerInterface,

    selectLayer
  },
  actions: {
    LayersInterface
  }
}

export default layersUIMachineOptions
