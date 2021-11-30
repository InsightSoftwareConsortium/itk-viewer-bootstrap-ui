import vtkLookupTableProxy from '@kitware/vtk.js/Proxy/Core/LookupTableProxy'

function applyColorMap(context, event) {
  const name = event.data.name
  const component = event.data.component
  const actorContext = context.images.actorContext.get(name)
  const colorMap = event.data.colorMap

  if (
    name !== context.images.selectedName ||
    component !== actorContext.selectedComponent
  ) {
    return
  }

  if (!!!context.images.lookupTableProxies) {
    return
  }

  const lookupTableProxy = context.images.lookupTableProxies.get(component)
  const currentColorMap = lookupTableProxy.getPresetName()
  if (currentColorMap !== colorMap) {
    lookupTableProxy.setPresetName(colorMap)
    lookupTableProxy.setMode(vtkLookupTableProxy.Mode.Preset)
    const colorTransferFunction = lookupTableProxy.getLookupTable()
    if (actorContext.colorRanges.has(component)) {
      const range = actorContext.colorRanges.get(component)
      colorTransferFunction.setMappingRange(range[0], range[1])
      colorTransferFunction.updateRange()
    }
  }
  const transferFunctionWidget = context.images.transferFunctionWidget
  if (transferFunctionWidget) {
    transferFunctionWidget.setColorTransferFunction(
      lookupTableProxy.getLookupTable()
    )
    transferFunctionWidget.render()
  }
}

export default applyColorMap
