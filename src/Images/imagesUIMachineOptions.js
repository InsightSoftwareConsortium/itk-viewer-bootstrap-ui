import ImagesInterface from './ImagesInterface'
import updateRenderedImageInterface from './updateRenderedImageInterface'
import selectImageComponent from './selectImageComponent'
import { applyPiecewiseFunctionPointsToEditor } from './transferFunctionWidgetUtils'
import applyWindowLevelReset from "./applyWindowLevelReset";

const imagesUIMachineOptions = {
  actions: {
    ImagesInterface,
    updateRenderedImageInterface,
    applyPiecewiseFunctionPointsToEditor,
    selectImageComponent,
    applyWindowLevelReset
  }
}

export default imagesUIMachineOptions
