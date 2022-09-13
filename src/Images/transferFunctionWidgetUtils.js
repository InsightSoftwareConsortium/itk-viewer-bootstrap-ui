import { createTransferFunctionEditor } from './createTransferFunctionEditor'

export const setup = (context, container) => {
  const transferFunctionWidget = createTransferFunctionEditor(
    context,
    container
  )

  context.images.transferFunctionWidget = transferFunctionWidget

  return transferFunctionWidget
}

export const applyPiecewiseFunctionPointsToEditor = (context, event) => {
  const { transferFunctionWidget, actorContext } = context.images
  if (!transferFunctionWidget) {
    console.warn('no transferFunctionWidget')
    return
  }
  const { points, component, name } = event.data
  const { selectedComponent } = actorContext.get(name)
  if (component === selectedComponent) {
    transferFunctionWidget.setPoints(points)
  }
}
