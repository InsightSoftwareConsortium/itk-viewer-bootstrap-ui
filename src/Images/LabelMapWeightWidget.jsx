import React, { useEffect, useRef } from 'react'
import { useActor } from '@xstate/react'
import { Slider } from '@mui/material'
import MapWeightSelector from './MapWeightSelector'
import '../style.css'

function LabelMapWeightWidget(props) {
  const { service } = props
  const labelImageWeightUIGroup = useRef(null)
  const weightSlider = useRef(null)
  const [state, send] = useActor(service)

  const name = state.context.images.selectedName
  const actorContext = state.context.images.actorContext.get(name)

  useEffect(() => {
    state.context.images.labelImageWeightUIGroup =
      labelImageWeightUIGroup.current
    state.context.images.labelImageWeightSlider = weightSlider.current
    actorContext.labelImageToggleWeight = 1.0
  }, [])

  useEffect(() => {
    sliderValue()
  }, [actorContext.selectedLabel])

  const weightChanged = (val) => {
    const labelImageWeights = actorContext.labelImageWeights
    if (actorContext.selectedLabel === 'all') {
      for (const label of labelImageWeights.keys()) {
        labelImageWeights.set(label, val)
      }
      actorContext.labelImageToggleWeight = val
    } else {
      labelImageWeights.set(actorContext.selectedLabel, val)
    }
    send({
      type: 'LABEL_IMAGE_WEIGHTS_CHANGED',
      data: { name, labelImageWeights }
    })
  }

  const sliderValue = () => {
    const labelImageWeights = actorContext.labelImageWeights
    if (actorContext.selectedLabel === 'all') {
      return actorContext.labelImageToggleWeight
    } else {
      return labelImageWeights.get(actorContext.selectedLabel)
    }
  }

  return (
    <div ref={labelImageWeightUIGroup} className="uiGroup">
      <div className="uiRow">
        <MapWeightSelector {...props} />
        <Slider
          ref={weightSlider}
          className="slider"
          min={0}
          max={1}
          value={sliderValue()}
          step={0.05}
          onChange={(_e, val) => {
            weightChanged(val)
          }}
          style={{ marginLeft: '5px' }}
        />
      </div>
    </div>
  )
}

export default LabelMapWeightWidget
