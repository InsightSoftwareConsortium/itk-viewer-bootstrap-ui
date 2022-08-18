import applyColorMap from './applyColorMap'
import applyHistogram from './applyHistogram'

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

  if (actorContext.colorMaps.has(component)) {
    applyColorMap(context, {
      data: {
        name,
        component,
        colorMap: actorContext.colorMaps.get(component)
      }
    })
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
