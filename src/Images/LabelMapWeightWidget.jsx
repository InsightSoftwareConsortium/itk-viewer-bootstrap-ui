import React, { useEffect, useRef } from 'react'
import { useSelector } from '@xstate/react'
import Form from 'react-bootstrap/Form'
import MapWeightSelector from './MapWeightSelector'
import '../style.css'
import getSelectedImageContext from './getSelectedImageContext'

function LabelMapWeightWidget({ service }) {
  const labelImageWeightUIGroup = useRef(null)
  const weightSlider = useRef(null)
  const send = service.send

  const name = useSelector(
    service,
    (state) => state.context.images.selectedName
  )

  const actorContext = useSelector(service, (state) =>
    getSelectedImageContext(state)
  )

  const labelImageWeights = useSelector(
    service,
    (state) =>
      state.context.images.actorContext.get(state.context.images.selectedName)
        .labelImageWeights
  )
  const selectedLabel = useSelector(
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
  }, [actorContext, service.machine.context.images])

  const weightChanged = (val) => {
    if (selectedLabel === 'all') {
      for (const label of labelImageWeights.keys()) {
        labelImageWeights.set(label, val)
      }
      actorContext.labelImageToggleWeight = val
    } else {
      labelImageWeights.set(selectedLabel, val)
    }
    send({
      type: 'LABEL_IMAGE_WEIGHTS_CHANGED',
      data: { name, labelImageWeights }
    })
  }

  const selectedLabelImageWeight =
    actorContext.selectedLabel === 'all'
      ? actorContext.labelImageToggleWeight
      : labelImageWeights.get(selectedLabel) ?? 1

  return (
    <div ref={labelImageWeightUIGroup} className="uiGroup">
      <div className="uiRow">
        <MapWeightSelector service={service} />
        <Form.Control
          type="range"
          custom
          ref={weightSlider}
          className="slider"
          min={0}
          max={1}
          value={selectedLabelImageWeight}
          step={0.05}
          onChange={(_e) => {
            weightChanged(Number(_e.target.value))
          }}
          style={{ marginLeft: '5px', marginBottom: '5px' }}
        />
      </div>
    </div>
  )
}

export default LabelMapWeightWidget
