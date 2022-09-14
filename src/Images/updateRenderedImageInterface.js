function updateRenderedImageInterface(context, event) {
  const name = event.data
  const actorContext = context.images.actorContext.get(name)
  const { transferFunctionWidget } = context.images

  if (!transferFunctionWidget) return // no widget if just label image loaded

  const points = actorContext.piecewiseFunctionPoints.get(
    actorContext.selectedComponent
  )
  if (points) {
    transferFunctionWidget.setPoints(points)
  } else {
    console.warn('No transfer function points for component')
  }
}

export default updateRenderedImageInterface
