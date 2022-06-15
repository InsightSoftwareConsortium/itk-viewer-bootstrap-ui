import React, { useEffect, useRef } from 'react'
import { useActor } from '@xstate/react'
import BlendModeSelector from './BlendModeSelector'
import GradientOpacitySlider from './GradientOpacitySlider'
import SampleDistanceSlider from './SampleDistanceSlider'
import ShadowToggle from './ShadowToggle'
import '../style.css'

function VolumeRenderingInputs(props) {
  const { service } = props
  const [state] = useActor(service)
  const volumeRow1 = useRef(null)
  const volumeRow2 = useRef(null)
  const name = state.context.images.selectedName
  const actorContext = state.context.images.actorContext.get(name)

  useEffect(() => {
    state.context.images.volumeRow1 = volumeRow1.current
    state.context.images.volumeRow2 = volumeRow2.current
  }, [])

  return (
    actorContext.colorRanges.get(actorContext.selectedComponent) !==
      undefined &&
    !state.context.use2D && (
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
