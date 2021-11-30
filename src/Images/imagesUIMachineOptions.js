import applyColorRange from './applyColorRange'
import applyColorMap from './applyColorMap'
import applyPiecewiseFunctionGaussians from './applyPiecewiseFunctionGaussians'
import applyHistogram from './applyHistogram'
import ImagesInterface from './ImagesInterface'
import updateImageInterface from './updateImageInterface'
import updateRenderedImageInterface from './updateRenderedImageInterface'

const imagesUIMachineOptions = {
  actions: {
    ImagesInterface,
    updateImageInterface,
    updateRenderedImageInterface,

    applyColorRange,
    applyColorMap,
    applyPiecewiseFunctionGaussians,

    applyHistogram
  }
}

export default imagesUIMachineOptions
