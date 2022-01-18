import React, { useEffect, useRef } from 'react'
import { useActor } from '@xstate/react'
import ColorRangeInput from './ColorRangeInput'
import ComponentSelector from './ComponentSelector'
import LabelImageColorWidget from './LabelImageColorWidget'
import LabelMapWeightWidget from './LabelMapWeightWidget'
import TransferFunctionWidget from './TransferFunctionWidget'
import VolumeRenderingInputs from './VolumeRenderingInputs'
import '../style.css'

function ImagesInterface(props) {
  const { service } = props
  const [state] = useActor(service)
  const name = state.context.images.selectedName
  const actorContext = state.context.images.actorContext.get(name)
  const layersContext = state.context.layers.actorContext.get(name)

  const imagesUIGroup = useRef(null)
  useEffect(() => {
    state.context.images.imagesUIGroup = imagesUIGroup.current
    state.context.uiGroups.set('images', imagesUIGroup.current)
  }, [])

  const visible = () => {
    if (layersContext) {
      return layersContext.visible
    }
    return true
  }

  const showLabelWidgets = () => {
    const type = layersContext.type
    if (
      (type === 'image' && actorContext.labelImageName) ||
      type === 'labelImage'
    ) {
      return true
    }
    return false
  }

  return (
    <div className={visible() ? '' : 'hidden'}>
      {actorContext && (
        <div>
          <div
            ref={imagesUIGroup}
            className="uiGroup uiImages"
          >
            <ColorRangeInput {...props} />
            <ComponentSelector {...props} />
            <TransferFunctionWidget {...props} />
            <VolumeRenderingInputs {...props} />
          </div>
          {showLabelWidgets() && (
            <div>
              <LabelImageColorWidget {...props} />
              <LabelMapWeightWidget {...props} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ImagesInterface
