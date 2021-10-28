import applyColorRange from './applyColorRange'
import applyColorMap from './applyColorMap'
import applyPiecewiseFunctionGaussians from './applyPiecewiseFunctionGaussians'
import applyHistogram from './applyHistogram'
import ImagesInterface from './ImagesInterface'

const imagesUIMachineOptions = {
  actions: {
    ImagesInterface,

    applyColorRange,
    applyColorMap,
    applyPiecewiseFunctionGaussians,

    applyHistogram,
  },
}

export default imagesUIMachineOptions
