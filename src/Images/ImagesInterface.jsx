import React, { useEffect, useRef } from 'react'
import { useSelector } from '@xstate/react'
import ColorRangeInput from './ColorRangeInput'
import ComponentSelector from './ComponentSelector'
import LabelImageColorWidget from './LabelImageColorWidget'
import LabelMapWeightWidget from './LabelMapWeightWidget'
import TransferFunctionWidget from './TransferFunctionWidget'
import VolumeRenderingInputs from './VolumeRenderingInputs'
import '../style.css'

function ImagesInterface(props) {
  const { service } = props
  const updateState = useSelector(service, (state) => state.actions)
  const actorContext = useSelector(service, (state) =>
    state.context.images.actorContext.get(state.context.images.selectedName)
  )
  const layersContext = useSelector(service, (state) =>
    state.context.layers.actorContext.get(state.context.images.selectedName)
  )

  const imagesUIGroup = useRef(null)
  useEffect(() => {
    service.machine.context.images.imagesUIGroup = imagesUIGroup.current
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
          <div ref={imagesUIGroup} className="uiGroup uiImages">
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
