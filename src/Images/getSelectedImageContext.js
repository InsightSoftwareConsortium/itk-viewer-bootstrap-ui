function getSelectedImageContext(state) {
  return state.context.images.actorContext.get(
    state.context.images.selectedName
  )
}

export default getSelectedImageContext
