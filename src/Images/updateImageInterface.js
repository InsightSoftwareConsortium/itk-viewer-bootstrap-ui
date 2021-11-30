import applyColorMap from './applyColorMap'
import applyPiecewiseFunctionGaussians from './applyPiecewiseFunctionGaussians'

function updateImageInterface(context) {
  const name = context.images.selectedName
  const actorContext = context.images.actorContext.get(name)
  const image = actorContext.image
  const component = actorContext.selectedComponent

  if (image) {
    if (actorContext.colorMaps.has(component)) {
      const colorMap = actorContext.colorMaps.get(component)
      applyColorMap(context, {
        data: {
          name,
          component,
          colorMap
        }
      })
    }

    if (actorContext.piecewiseFunctionGaussians.has(component)) {
      const gaussians = actorContext.piecewiseFunctionGaussians.get(component)
      applyPiecewiseFunctionGaussians(context, {
        data: {
          name,
          component,
          gaussians
        }
      })
    }
  }
}

export default updateImageInterface
