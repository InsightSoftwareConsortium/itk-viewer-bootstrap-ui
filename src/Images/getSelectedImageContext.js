export const getSelectedImageContext = (state) =>
  state.context.images.actorContext.get(state.context.images.selectedName)

export default getSelectedImageContext
