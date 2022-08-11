import React, { useEffect, useRef } from 'react'
import { useSelector } from '@xstate/react'
import BlendModeSelector from './BlendModeSelector'
import GradientOpacitySlider from './GradientOpacitySlider'
import SampleDistanceSlider from './SampleDistanceSlider'
import ShadowToggle from './ShadowToggle'
import '../style.css'
import getSelectedImageContext from './getSelectedImageContext'

function VolumeRenderingInputs(props) {
  const { service } = props
  const volumeRow1 = useRef(null)
  const volumeRow2 = useRef(null)
  const actorContext = useSelector(service, (state) =>
    getSelectedImageContext(state)
  )

  const volumeMenu = useSelector(service, (state) =>
    actorContext.colorRanges.get(actorContext.selectedComponent)
  )

  const use2D = useSelector(service, (state) => state.context.use2D)

  useEffect(() => {
    service.machine.context.images.volumeRow1 = volumeRow1.current
    service.machine.context.images.volumeRow2 = volumeRow2.current
  }, [service.machine.context.images])

  return (
    volumeMenu !== undefined &&
    !use2D && (
      <div>
        <div
          ref={volumeRow1}
          className={`uiRow ${
            actorContext.blendMode !== 'Composite' && 'hidden'
          }`}
          style={{ whiteSpace: 'nowrap' }}
        >
          <ShadowToggle {...props} />
          <GradientOpacitySlider {...props} />
        </div>
        <div ref={volumeRow2} className="uiRow">
          <SampleDistanceSlider {...props} />
          <BlendModeSelector {...props} />
        </div>
      </div>
    )
  )
}

export default VolumeRenderingInputs
