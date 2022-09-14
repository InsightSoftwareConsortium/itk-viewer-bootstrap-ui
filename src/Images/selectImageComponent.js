function selectImageComponent(context, event) {
  const name = event.data.name
  const actorContext = context.images.actorContext.get(name)
  const component = event.data.component

  const transferFunctionWidget = context.images.transferFunctionWidget

  const piecewiseFunctionPoints =
    actorContext.piecewiseFunctionPoints.get(component)
  if (transferFunctionWidget && piecewiseFunctionPoints) {
    transferFunctionWidget.setPoints(piecewiseFunctionPoints)
  }

  const histogram = actorContext.histograms.get(component)
  if (!histogram) {
    context.service.send({
      type: 'UPDATE_IMAGE_HISTOGRAM',
      data: { name, component }
    })
  }
}

export default selectImageComponent
