function toggleUICollapsed(
  uiContainer,
  uiCollapsed,
  selectedName,
  service,
  use2D,
  planeUIGroup,
  viewMode,
  mainPlaneUIGroup,
  _event,
  actionMeta
) {
  if (!uiContainer) {
    return
  }
  if (actionMeta) {
    uiCollapsed = actionMeta.state.value.active.uiCollapsed === 'enabled'
  }

  if (!uiCollapsed && selectedName) {
    service.send({
      type: 'SELECT_LAYER',
      data: selectedName
    })
  }

  if (!use2D && !!planeUIGroup) {
    if (uiCollapsed && viewMode === 'Volume') {
      mainPlaneUIGroup.style.display = 'none'
    } else {
      mainPlaneUIGroup.style.display = 'block'
    }
  }
}

export default toggleUICollapsed
