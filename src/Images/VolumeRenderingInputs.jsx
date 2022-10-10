import React from 'react'
import { useSelector } from '@xstate/react'
import BlendModeSelector from './BlendModeSelector'
import GradientOpacitySlider from './GradientOpacitySlider'
import SampleDistanceSlider from './SampleDistanceSlider'
import ShadowToggle from './ShadowToggle'
import CinematicParameters from './CinematicParameters'
import '../style.css'
import getSelectedImageContext from './getSelectedImageContext'

function VolumeRenderingInputs(props) {
  const { service, advancedInputs } = props

  const volumeMenu = useSelector(service, (state) => {
    const actorContext = getSelectedImageContext(state)
    return actorContext.colorRanges.get(actorContext.selectedComponent)
  })

  const use2D = useSelector(service, (state) => state.context.use2D)

  const advancedInputContent = (
    <div className="uiRow">
      <SampleDistanceSlider {...props} />
      <BlendModeSelector {...props} />
    </div>
  )

  return (
    volumeMenu !== undefined &&
    !use2D && (
      <div>
        <div className="uiRow" style={{ whiteSpace: 'nowrap' }}>
          <ShadowToggle {...props} />
          <GradientOpacitySlider {...props} />
        </div>
        {advancedInputs && advancedInputContent}
        <div className="uiRow">
          <CinematicParameters {...props} />
        </div>
      </div>
    )
  )
}

export default VolumeRenderingInputs
