import { assign } from 'xstate'

const layersUIMachineOptions = {
  layerUIActor: {
    actions: {
      startDataUpdate: assign({
        actorContext: ({ actorContext }) => {
          actorContext.isDataUpdating = true
          return actorContext
        }
      }),
      finishDataUpdate: assign({
        actorContext: ({ actorContext }) => {
          actorContext.isDataUpdating = false
          return actorContext
        }
      })
    }
  }
}

export default layersUIMachineOptions
