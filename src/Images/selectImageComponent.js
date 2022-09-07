import applyColorRange from './applyColorRange'
import applyHistogram from './applyHistogram'

function selectImageComponent(context, event) {
  const name = event.data.name
  const actorContext = context.images.actorContext.get(name)
  const component = event.data.component

  const transferFunctionWidget = context.images.transferFunctionWidget

  if (actorContext.colorRanges.has(component)) {
    const range = actorContext.colorRanges.get(component)
    applyColorRange(context, {
      data: {
        name,
        component,
        range
      }
    })
  }

  const piecewiseFunctionPoints =
    actorContext.piecewiseFunctionPoints.get(component)
  if (transferFunctionWidget && piecewiseFunctionPoints) {
    transferFunctionWidget.setPoints(piecewiseFunctionPoints)
  }

  const histogram = actorContext.histograms.get(component)
  if (histogram) {
    applyHistogram(context, {
      data: {
        name,
        component,
        histogram
      }
    })
  } else {
    context.service.send({
      type: 'UPDATE_IMAGE_HISTOGRAM',
      data: { name, component }
    })
  }
}

export default selectImageComponent
