import applyColorRange from './applyColorRange'
import applyColorMap from './applyColorMap'
import applyPiecewiseFunctionGaussians from './applyPiecewiseFunctionGaussians'
import applyHistogram from './applyHistogram'
import ImagesInterface from './ImagesInterface'
import updateImageInterface from './updateImageInterface'
import updateRenderedImageInterface from './updateRenderedImageInterface'
import selectImageComponent from './selectImageComponent'
import { applyPiecewiseFunctionPointsToEditor } from './transferFunctionWidgetUtils'

const imagesUIMachineOptions = {
  actions: {
    ImagesInterface,
    updateImageInterface,
    updateRenderedImageInterface,

    applyColorRange,
    applyColorMap,
    applyPiecewiseFunctionGaussians,

    applyHistogram,
    applyPiecewiseFunctionPointsToEditor,
    selectImageComponent
  }
}

export default imagesUIMachineOptions
