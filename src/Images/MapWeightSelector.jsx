import React, { useState } from 'react'
import { useSelector } from '@xstate/react'
import Form from 'react-bootstrap/Form'
import '../style.css'

function MapWeightSelector(props) {
  const { service } = props
  const send = service.send
  let labelMapWeights = [{ name: 'All', value: 'all' }]
  const name = useSelector(
    service,
    (state) => state.context.images.selectedName
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

  const [weightValue, setWeightValue] = useState(labelMapWeights[0].name)

  const handleChange = (event) => {
    setWeightValue(event.target.value)
    send({
      type: 'LABEL_IMAGE_SELECTED_LABEL_CHANGED',
      data: { name, selectedLabel: weightValue }
    })
  }

  return (
    <div className="uiGroup">
      <div className="uiRow">
        <Form.Control
          as="select"
          value={weightValue}
          onChange={(e) => {
            handleChange(e)
          }}
        >
          {labelMapWeights.map((weight, idx) => (
            <option key={idx} value={weight.value}>
              {weight.name}
            </option>
          ))}
        </Form.Control>
      </div>
    </div>
  )
}

export default MapWeightSelector
