import applyHistogram from './applyHistogram'
import applyColorRange from './applyColorRange'
import ImagesInterface from './ImagesInterface'
import updateRenderedImageInterface from './updateRenderedImageInterface'
import selectImageComponent from './selectImageComponent'
import { applyPiecewiseFunctionPointsToEditor } from './transferFunctionWidgetUtils'

const imagesUIMachineOptions = {
  actions: {
    ImagesInterface,
    updateRenderedImageInterface,

    applyColorRange,

    applyHistogram,
    applyPiecewiseFunctionPointsToEditor,
    selectImageComponent
  }
}

export default imagesUIMachineOptions
