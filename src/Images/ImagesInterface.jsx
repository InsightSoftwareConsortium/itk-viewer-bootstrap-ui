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
  const name = useSelector(
    service,
    (state) => state.context.images.selectedName
  )

  const actorContext = useSelector(service, (state) =>
    state.context.images.actorContext.get(name)
  )

  const labelImageName = useSelector(
    service,
    (state) => state.context.images.actorContext.get(name)?.labelImageName
  )

  const layersContext = useSelector(service, (state) =>
    state.context.layers.actorContext.get(name)
  )

  const imagesUIGroup = useRef(null)
  useEffect(() => {
    service.machine.context.images.imagesUIGroup = imagesUIGroup.current
  }, [service.machine.context.images])

  const visible = () => {
    if (layersContext) {
      return layersContext.visible
    }
    return true
  }

  const showLabelWidgets = () => {
    const type = layersContext.type
    if ((type === 'image' && labelImageName) || type === 'labelImage') {
      return true
    }
    return false
  }

  const isLabelOnly = () => {
    const type = layersContext.type
    if (type === 'labelImage') {
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
            {!isLabelOnly() && (
              <div>
                <TransferFunctionWidget {...props} />
                <VolumeRenderingInputs {...props} />
              </div>
            )}
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
