import ImagesInterface from './ImagesInterface'
import updateRenderedImageInterface from './updateRenderedImageInterface'
import selectImageComponent from './selectImageComponent'
import { applyPiecewiseFunctionPointsToEditor } from './transferFunctionWidgetUtils'

const imagesUIMachineOptions = {
  actions: {
    ImagesInterface,
    updateRenderedImageInterface,
    applyPiecewiseFunctionPointsToEditor,
    selectImageComponent
  }
}

export default imagesUIMachineOptions
