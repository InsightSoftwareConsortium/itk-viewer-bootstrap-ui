import React, { useEffect, useRef } from 'react'
import { useSelector } from '@xstate/react'
import Form from 'react-bootstrap/Form'
import '../style.css'

function MapWeightSelector(props) {
  const { service } = props
  const labelImageWeightUIGroup = useRef(null)
  const labelSelector = useRef(null)
  const send = service.send

  let labelMapWeights = [{ name: 'All', value: 'all' }]
  const name = useSelector(
    service,
    (state) => state.context.images.selectedName
  )
  const actorContext = useSelector(
    service,
    (state) => state.context.images.actorContext
  )
  const actorContextName = useSelector(service, (state) =>
    state.context.images.actorContext.get(state.context.images.selectedName)
  )
  const labelNames = useSelector(
    service,
    (state) =>
      state.context.images.actorContext.get(state.context.images.selectedName)
        .labelNames
  )
  labelNames.forEach((value, key) => {
    labelMapWeights.push({
      name: value,
      value: key
    })
  })

  useEffect(() => {
    service.machine.context.images.labelImageWeightUIGroup =
      labelImageWeightUIGroup.current
    service.machine.context.images.labelSelector = labelSelector.current
  }, [])

  const currentMapWeight = () => {
    if (actorContext) {
      const actorContext = actorContextName
      return actorContext.selectedLabel
    }
    return ''
  }

  const handleChange = (label) => {
    console.log(label)
    send({
      type: 'LABEL_IMAGE_SELECTED_LABEL_CHANGED',
      data: { name, selectedLabel: label }
    })
  }

  return (
    <div ref={labelImageWeightUIGroup} className="uiGroup">
      <div className="uiRow">
        <Form.Control
          as="select"
          ref={labelSelector}
          onChange={(e) => {
            handleChange(e.target.value)
          }}
        >
          {labelMapWeights.map((weight, idx) => (
            <option key={idx} value={currentMapWeight()}>
              {weight.name}
            </option>
          ))}
        </Form.Control>
      </div>
    </div>
  )
}

export default MapWeightSelector
