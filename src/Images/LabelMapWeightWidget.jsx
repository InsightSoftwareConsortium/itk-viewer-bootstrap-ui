import React, { useEffect, useRef } from 'react'
import { useSelector } from '@xstate/react'
import Form from 'react-bootstrap/Form'
import MapWeightSelector from './MapWeightSelector'
import '../style.css'

function LabelMapWeightWidget(props) {
  const { service } = props
  const labelImageWeightUIGroup = useRef(null)
  const weightSlider = useRef(null)
  const send = service.send

  const name = useSelector(
    service,
    (state) => state.context.images.selectedName
  )
  const actorContext = useSelector(service, (state) =>
    state.context.images.actorContext.get(state.context.images.selectedName)
  )
  const actorContextlabelImageWeights = useSelector(
    service,
    (state) =>
      state.context.images.actorContext.get(state.context.images.selectedName)
        .labelImageWeights
  )
  const actorContextSelectedLabel = useSelector(
    service,
    (state) =>
      state.context.images.actorContext.get(state.context.images.selectedName)
        .selectedLabel
  )

  useEffect(() => {
    service.machine.context.images.labelImageWeightUIGroup =
      labelImageWeightUIGroup.current
    service.machine.context.images.labelImageWeightSlider = weightSlider.current
    actorContext.labelImageToggleWeight = 1.0
  }, [])

  useEffect(() => {
    sliderValue()
  }, [actorContext.selectedLabel])

  const weightChanged = (val) => {
    const labelImageWeights = actorContextlabelImageWeights
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
    const labelImageWeights = actorContextlabelImageWeights
    if (actorContext.selectedLabel === 'all') {
      return actorContext.labelImageToggleWeight
    } else {
      return labelImageWeights.get(actorContextSelectedLabel)
    }
  }

  return (
    <div ref={labelImageWeightUIGroup} className="uiGroup">
      <div className="uiRow">
        <MapWeightSelector {...props} />
        <Form.Control
          type="range"
          custom
          ref={weightSlider}
          className="slider"
          min={0}
          max={1}
          value={sliderValue()}
          step={0.05}
          onChange={(_e) => {
            weightChanged(_e.target.value)
          }}
          style={{ marginLeft: '5px', marginBottom: '5px' }}
        />
      </div>
    </div>
  )
}

export default LabelMapWeightWidget
