function selectLayer(context, event) {
  const name = event.data
  const actorContext = context.layers.actorContext.get(name)

  if (!actorContext.visible) {
    context.service.send({
      type: 'TOGGLE_LAYER_VISIBILITY',
      data: name
    })
  }
}

export default selectLayer
